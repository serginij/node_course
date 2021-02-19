const express = require('express');
const path = require('path');

const store = require('../store');
const { fileMiddleware } = require('../middleware');
const { booksStore } = require('../store');

const router = express.Router();

router.get('/', (req, res) => {
  const { booksStore } = store;
  const books = booksStore.getBooks();

  res.status(200).json(books);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { booksStore } = store;
  const book = booksStore.books[id];

  if (!book) {
    res.status(404).json({ message: 'book not found' });
  }

  res.status(200).json(book);
});

router.post('/', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body } = req;
  const { path, filename } = file;
  const { createBook, validateBook } = booksStore;

  const book = { ...body, fileName: filename, fileBook: path };
  const { valid, errors } = validateBook(book);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    const data = createBook(book);

    res.status(201).json(data);
  }
});

router.put('/:id', fileMiddleware.single('fileBook'), (req, res) => {
  const { file, body } = req;
  const { id } = req.params;

  const { path, filename } = file;
  const { updateBook, validateBook, books } = booksStore;

  if (!books[id]) {
    res.status(404).send('404 | book not found');
  }

  const book = { ...body, fileName: filename, fileBook: path, id };
  const { valid, errors } = validateBook(book, true);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    const data = updateBook(id, book);
    res.status(200).json(data);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const { booksStore } = store;

  if (!booksStore.books[id]) {
    res.status(404).json({ message: 'book not found' });
  } else {
    booksStore.deleteBook(id);
    res.status(200).json({ message: 'ok' });
  }
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const { books } = booksStore;

  const book = books[id];

  if (!book) {
    res.status(404).json({ message: 'book not found' });
  }

  const { fileBook, fileName } = book;

  res.download(path.join(__dirname, '..', fileBook), fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json('file not found');
    }
  });
});

module.exports = router;
