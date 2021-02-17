const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/api/user/login', (req, res) => {
  const { userStore } = store;
  const data = userStore.login();

  res.status(201).json(data);
});

app.get('/api/books', (req, res) => {
  const { booksStore } = store;
  const books = booksStore.getBooks();

  res.status(200).json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { booksStore } = store;
  const book = booksStore.books[id];

  if (!book) {
    res.status(404).json({ message: 'book not found' });
  }

  res.status(200).json(book);
});

app.post('/api/books', (req, res) => {
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

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { booksStore } = store;

  if (!booksStore.books[id]) {
    res.status(404).json({ message: 'book not found' });
  } else {
    booksStore.deleteBook(id);
    res.status(200).json({ message: 'ok' });
  }
});

app.listen(PORT, () => {
  console.log('App available on http://localhost:3000');
});
