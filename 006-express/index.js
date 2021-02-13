const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');
const store = require('./store');

const app = express();
app.use(cors());
app.use(formData.parse());

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

app.listen(PORT, () => {
  console.log('App available on http://localhost:3000');
});
