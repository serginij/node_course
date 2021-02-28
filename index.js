const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { booksRouter, userRouter, mainRouter } = require('./routes');
const { notFoundMiddleware } = require('./middleware');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use('/books', booksRouter);
app.use('/api/user', userRouter);
app.use('/', mainRouter);

app.use(notFoundMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App available on http://localhost:${PORT}`);
});
