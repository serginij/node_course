import {
  createBook,
  deleteBook,
  dowloadBook,
  getAllBooks,
  getBook,
  renderBookById,
  renderNewBook,
  updateBook,
} from './books.service';

const express = require('express');

const { fileMiddleware } = require('../../middleware');

const router = express.Router();

router.get('/', getAllBooks);

router.get('/create', renderNewBook);

router.get('/update/:id', renderBookById);

router.get('/:id', getBook);

router.post(
  '/create',
  fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 },
  ]),
  createBook,
);

router.post(
  '/update/:id',
  fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 },
  ]),
  updateBook,
);

router.post('/delete/:id', deleteBook);

router.get('/:id/download', dowloadBook);

module.exports = router;
