const { v4: uuid } = require('uuid');

const books = {
  dsofijksdf: {
    id: 'dsofijksdf',
    title: 'Title',
    description: 'Description',
    authors: 'noname',
    favorite: 'test',
    fileCover: 'file.png',
    fileName: 'book.epub',
  },
};

const getBooks = () => {
  return Object.values(books);
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

module.exports = {
  books,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
