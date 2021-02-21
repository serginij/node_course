const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { booksRouter, userRouter } = require('./routes');
const { notFoundMiddleware } = require('./middleware');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log('App available on http://localhost:3000');
});
