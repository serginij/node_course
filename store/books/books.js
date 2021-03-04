const { v4: uuid } = require('uuid');

const books = {};

const getBooks = () => {
  return Object.values(books);
};

const setBooks = (data) => {
  Object.assign(books, data);
};

const createBook = (book) => {
  const id = uuid();

  books[id] = { ...book, id };

  return books[id];
};

const updateBook = (id, book) => {
  books[id] = book;

  return book;
};

const deleteBook = (id) => {
  delete books[id];
};

const validateBook = (book, checkId = false) => {
  if (!book) return { valid: false, error: ['No data provided'] };

  let valid = true;
  const errors = [];
  const keys = [
    'title',
    'description',
    'authors',
    'favorite',
    'fileCover',
    'fileName',
    'fileBook',
  ];

  if (checkId) {
    keys.push('id');
  }

  keys.forEach((key) => {
    switch (key) {
      default:
        if (typeof book[key] !== 'string') {
          errors.push(key);
          valid = false;
        }
        break;
    }
  });

  return { valid, errors };
};

module.exports = {
  books,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  validateBook,
  setBooks,
};
