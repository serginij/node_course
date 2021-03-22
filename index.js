const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const { booksRouter, userRouter, mainRouter } = require('./routes');
const { notFoundMiddleware, authMiddleware } = require('./middleware');
const { connectToDb } = require('./utils');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(authMiddleware);

app.use('/books', booksRouter);
app.use('/user', userRouter);
app.use('/', mainRouter);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectToDb();

    app.listen(PORT, '0.0.0.0', () =>
      console.log(`App available on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
