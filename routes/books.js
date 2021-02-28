const express = require('express');
const path = require('path');
const http = require('http');

const { fileMiddleware } = require('../middleware');
const { booksStore } = require('../store');

const router = express.Router();

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;

router.get('/', (req, res) => {
  const { getBooks, setBooks } = booksStore;
  const books = getBooks();

  if (books.length === 0) {
    http.get(`http://localhost:${COUNTER_PORT}/counter`, (response) => {
      response
        .on('data', (d) => {
          const data = JSON.parse(d.toString());

          setBooks(data);

          res.render('books/list', {
            title: 'Books list',
            books: Object.values(data),
          });
        })
        .on('error', () => {
          res.redirect('/404');
        });
    });
  } else {
    res.render('books/list', {
      title: 'Books list',
      books,
    });
  }
});

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Book create',
    book: {},
  });
});

router.get('/update/:id', (req, res) => {
  const { id } = req.params;
  const { books } = booksStore;
  const book = books[id];

  if (!book) {
    res.status(404).redirect('/404');
  }

  res.render('books/update', {
    title: 'Book update',
    book,
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { books } = booksStore;

  if (!books[id]) {
    res.status(404).redirect('/404');
  }
  const book = JSON.stringify(books[id]);

  const request = http.request(
    {
      hostname: 'localhost',
      port: COUNTER_PORT,
      method: 'POST',
      path: `/counter/${id}/incr`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': book.length,
      },
    },
    (response) => {
      response
        .on('data', (d) => {
          const data = JSON.parse(d.toString());

          res.render('books/view', {
            title: 'Book view',
            book: data,
          });
        })
        .on('error', () => {
          res.redirect('/404');
        });
    },
  );

  request.write(book);
  request.end();
});

router.post('/create', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body } = req;
  const { path, filename } = file;
  const { validateBook, createBook } = booksStore;

  const book = { ...body, fileName: filename, fileBook: path };
  const { valid, errors } = validateBook(book);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    createBook(book);
    res.status(200).redirect('/books');
  }
});

router.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body } = req;
  const { id } = req.params;

  const { path, filename } = file;
  const { updateBook, validateBook, books } = booksStore;

  if (!books[id]) {
    res.status(404).redirect('/404');
  }

  const book = { ...body, fileName: filename, fileBook: path, id };
  const { valid, errors } = validateBook(book, true);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    updateBook(id, book);
    res.status(200).redirect('/books');
  }
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const { books, deleteBook } = booksStore;

  if (!books[id]) {
    res.status(404).redirect('/404');
  } else {
    deleteBook(id);
    res.status(200).redirect('/books');
  }
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
