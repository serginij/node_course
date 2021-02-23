const express = require('express');
const path = require('path');

const store = require('../store');
const { fileMiddleware } = require('../middleware');
const { booksStore } = require('../store');
const { createBook } = require('../store/books');

const router = express.Router();

router.get('/', (req, res) => {
  const { booksStore } = store;
  const books = booksStore.getBooks();

  res.render('books/list', {
    title: 'Books list',
    books,
  });
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
  const { booksStore } = store;
  const book = booksStore.books[id];

  if (!book) {
    res.status(404).redirect('/404');
  }

  res.render('books/view', {
    title: 'Book view',
    book,
  });
});

router.post('/create', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body } = req;
  const { path, filename } = file;
  const { validateBook } = booksStore;

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
