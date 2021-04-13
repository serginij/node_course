import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import { booksRouter, userRouter, mainRouter, chatRouter } from './routes';
import { notFoundMiddleware, authMiddleware } from './middleware';
import { connectToDb, app, httpServer } from './utils';

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

app.use(authMiddleware as any);

app.use('/books', booksRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/', mainRouter);

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectToDb();

    httpServer.listen(PORT, '0.0.0.0' as any, () =>
      console.log(`App available on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
