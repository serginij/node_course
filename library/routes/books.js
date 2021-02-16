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

router.post('/', (req, res) => {
  const book = req.body;
  const { booksStore } = store;

  const { valid, errors } = booksStore.validateBook(book);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    const data = booksStore.createBook(book);

    res.status(201).json(data);
  }
});

router.put('/:id', (req, res) => {
  const book = req.body;
  const { id } = req.params;
  const { booksStore } = store;

  const { valid, errors } = booksStore.validateBook({ ...book, id }, true);

  if (!valid) {
    res.status(400).json({ message: 'Invalid data format', errors });
  } else {
    const data = booksStore.updateBook(id, book);
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

router.post('/:id/upload-text', fileMiddleware.single(), (req, res) => {
  if (req.file) {
    const { path, filename } = req.file;
    const { id } = req.params;
    console.log(path, req.file);
    const { updateBook, books } = booksStore;

    const book = books[id];

    if (!book) {
      res.status(404).json({ message: 'book not found' });
    }

    updateBook(id, { ...book, fileBook: path, fileName: filename });

    res.status(201).json(path);
  } else {
    res.status(400).json({ message: 'No file provided' });
  }
});

router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  console.log(path, req.file);
  const { books } = booksStore;

  const book = books[id];

  if (!book) {
    res.status(404).json({ message: 'book not found' });
  }

  const { fileBook, fileName } = book;

  console.log(path.join(__dirname, '..', fileBook));

  res.download(path.join(__dirname, '..', fileBook), fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(404).json('file not found');
    }
  });
});

module.exports = router;
