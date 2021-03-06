const express = require('express');
const path = require('path');
const http = require('http');

const { fileMiddleware } = require('../middleware');
const { booksStore } = require('../store');
const { Book } = require('../models');

const router = express.Router();

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

router.get('/', async (req, res) => {
  // const { getBooks, setBooks } = booksStore;
  // const books = getBooks();
  const books = await Book.find().select('-__v');

  res.render('books/list', {
    title: 'Books list',
    books,
  });

  // if (books.length === 0) {
  //   http.get(
  //     {
  //       host: COUNTER_HOST,
  //       port: COUNTER_PORT,
  //       path: `/counter`,
  //     },
  //     (response) => {
  //       response
  //         .on('data', (d) => {
  //           const data = JSON.parse(d.toString());
  //           setBooks(data);

  //           res.render('books/list', {
  //             title: 'Books list',
  //             books: Object.values(data),
  //           });
  //         })
  //         .on('error', () => {
  //           res.redirect('/404');
  //         });
  //     },
  //   );
  // } else {
  //   res.render('books/list', {
  //     title: 'Books list',
  //     books,
  //   });
  // }
});

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Book create',
    book: {},
  });
});

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;
  // const { books } = booksStore;
  // const book = books[id];
  const book = await Book.findById(id);

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
  const { books, updateBook } = booksStore;

  try {
    const book = await Book.findById(id).select('-__v');
    res.render('books/view', {
      title: 'Book view',
      book,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }

  // if (!books[id]) {
  //   res.status(404).redirect('/404');
  // }
  // const book = JSON.stringify(books[id]);

  // const request = http.request(
  //   {
  //     host: COUNTER_HOST,
  //     port: COUNTER_PORT,
  //     method: 'POST',
  //     path: `/counter/${id}/incr`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Content-Length': book.length,
  //     },
  //   },
  //   (response) => {
  //     response
  //       .on('data', (d) => {
  //         const data = JSON.parse(d.toString());
  //         updateBook(id, data);

  //         res.render('books/view', {
  //           title: 'Book view',
  //           book: data,
  //         });
  //       })
  //       .on('error', () => {
  //         res.redirect('/404');
  //       });
  //   },
  // );

  // request.write(book);
  // request.end();
});

router.post('/create', fileMiddleware.single('fileBook'), async (req, res) => {
  const { file, body } = req;
  // const { path, filename } = file;
  // const { validateBook, createBook } = booksStore;

  const book = new Book(body);

  // const book = { ...body, fileName: filename, fileBook: path };
  // const { valid, errors } = validateBook(book);

  try {
    await book.save();
    res.status(200).redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }

  // if (!valid) {
  //   res.status(400).json({ message: 'Invalid data format', errors });
  // } else {
  //   createBook(book);
  //   res.status(200).redirect('/books');
  // }
});

router.post(
  '/update/:id',
  fileMiddleware.single('fileBook'),
  async (req, res) => {
    const { file, body } = req;
    const { id } = req.params;

    // const { path, filename } = file;
    // const { updateBook, validateBook, books } = booksStore;

    // if (!books[id]) {
    //   res.status(404).redirect('/404');
    // }

    // const book = { ...body, fileName: filename, fileBook: path, id };
    // const { valid, errors } = validateBook(book, true);

    try {
      await Book.findByIdAndUpdate(id, body);
      res.status(200).redirect('/books');
    } catch (err) {
      console.error(err);
      res.status(500).json();
    }

    // if (!valid) {
    //   res.status(400).json({ message: 'Invalid data format', errors });
    // } else {
    //   updateBook(id, book);
    //   res.status(200).redirect('/books');
    // }
  },
);

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  // const { books, deleteBook } = booksStore;

  try {
    await Book.findByIdAndDelete(id);
    res.status(204).redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }

  // if (!books[id]) {
  //   res.status(404).redirect('/404');
  // } else {
  //   deleteBook(id);
  //   res.status(200).redirect('/books');
  // }
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const { books } = booksStore;

  const book = books[id];

  if (!book) {
    res.status(404).redirect('/404');
  }

  const { fileBook, fileName } = book;

  res.download(path.join(__dirname, '..', fileBook), fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(404).redirect('/404');
    }
  });
});

module.exports = router;
