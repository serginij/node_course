const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { booksRouter, userRouter, mainRouter } = require('./routes');
const { notFoundMiddleware, verifyUserMiddleware } = require('./middleware');

const app = express();

const passportOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

const PORT = process.env.PORT || 3000;
const DB_PASS = process.env.DB_PASS || 'qwerty';
const DB_NAME = process.env.DB_NAME || 'library';
const DB_URL = `mongodb+srv://user:${DB_PASS}@cluster0.hvmwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

passport.use('local', new LocalStrategy(passportOptions, verifyUserMiddleware));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/books', booksRouter);
app.use('/user', userRouter);
app.use('/', mainRouter);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, '0.0.0.0', () =>
      console.log(`App available on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
