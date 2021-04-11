const express = require('express');
const path = require('path');
const http = require('http');

const { fileMiddleware } = require('../middleware');
const { Book } = require('../models');

const router = express.Router();

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

router.get('/', async (req, res) => {
  const books = await Book.find().select('-__v').lean();

  const request = http.request(
    {
      host: COUNTER_HOST,
      port: COUNTER_PORT,
      path: `/counter`,
    },
    (response) => {
      let data = '';
      response.on('data', (chunk) => (data += chunk));
      response
        .on('end', () => {
          const viewsById = JSON.parse(data);
          const formatted = books.map((book) => ({
            ...book,
            views: viewsById[book._id] || 0,
          }));

          res.render('books/list', {
            title: 'Books list',
            books: formatted,
          });
        })
        .on('error', () => {
          res.redirect('/404');
        });
    },
  );

  request.end();
});

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Book create',
    book: { isNew: true },
  });
});

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).select('-__v').lean();

  if (!book) {
    res.status(404).redirect('/404');
  }

  res.render('books/update', {
    title: 'Book update',
    book,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v').lean();
    const { displayName } = req.user;

    const request = http.request(
      {
        host: COUNTER_HOST,
        port: COUNTER_PORT,
        method: 'POST',
        path: `/counter/${id}/incr`,
      },
      (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response
          .on('end', () => {
            const { views } = JSON.parse(data);

            res.render('books/view', {
              title: 'Book view',
              book: { ...book, views },
              displayName,
            });
          })
          .on('error', () => {
            res.redirect('/books');
          });
      },
    );

    request.end();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post(
  '/create',
  fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 },
  ]),
  async (req, res) => {
    const { files, body } = req;
    const { fileBook, fileCover } = files;

    try {
      const book = new Book({
        ...body,
        fileBook: fileBook[0].path,
        fileCover: fileCover?.[0]?.path || '',
        favorite: body.favorite === 'on',
      });

      await book.save();
      res.status(200).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
);

router.post(
  '/update/:id',
  fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 },
  ]),
  async (req, res) => {
    const { files, params, body } = req;
    const { id } = params;
    try {
      // eslint-disable-next-line no-unused-vars
      const { fileBook, fileCover, favorite, ...data } = body;

      const bookFile = {};
      const cover = {};

      if (files) {
        const { fileBook, fileCover } = files;

        if (fileBook?.[0]) bookFile.fileBook = fileBook[0].path;
        if (fileCover?.[0]) cover.fileCover = fileCover[0].path;
      }

      const book = {
        ...data,
        ...bookFile,
        ...cover,
        favorite: favorite === 'on',
      };

      await Book.findByIdAndUpdate(id, book);
      res.status(200).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
);

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.status(204).redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id/download', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select('fileBook fileName').lean();
    if (!book) {
      res.status(404).redirect('/404');
    }
    const { fileBook } = book;

    res.download(path.join(__dirname, '..', fileBook), (err) => {
      if (err) {
        console.error(err);
        res.status(404).redirect('/404');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
