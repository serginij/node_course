import path from 'path';
import { Request, Response } from 'express';

import { BookModule } from '../../models/books';
import { IMulterRequest, IUserRequest } from '../../types';

const Book = new BookModule();

const {
  getBooks,
  getBookById,
  updateBook: updateBookData,
  deleteBook: deleteBookById,
  createBook: createNewBook,
} = Book;

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await getBooks();

  if (books) {
    res.render('books/list', {
      title: 'Books list',
      books,
    });
  } else {
    res.redirect('/404');
  }
};

export const renderNewBook = (req: Request, res: Response) => {
  res.render('books/create', {
    title: 'Book create',
    book: { isNew: true },
  });
};

export const renderBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await getBookById(id);

  if (!book) {
    res.status(404).redirect('/404');
  }

  res.render('books/update', {
    title: 'Book update',
    book,
  });
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    const { displayName } = (req as IUserRequest).user;

    if (book) {
      res.render('books/view', {
        title: 'Book view',
        book,
        displayName,
      });
    } else {
      res.redirect('/books');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { files, body } = req as IMulterRequest;
  const { fileBook, fileCover } = files;

  try {
    const book = await createNewBook({
      ...body,
      fileBook: fileBook[0].path,
      fileCover: fileCover?.[0]?.path || '',
      favorite: body.favorite === 'on',
    });

    if (book) {
      res.status(200).redirect('/books');
    } else {
      res.status(500).json({ message: 'An error occured while creating book' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { files, params, body } = req as IMulterRequest;
  const { id } = params;
  try {
    // eslint-disable-next-line no-unused-vars
    const { fileBook, fileCover, favorite, ...data } = body;

    const bookFile: { fileBook?: string } = {};
    const cover: { fileCover?: string } = {};

    if (files) {
      const { fileBook, fileCover } = files;

      if (fileBook?.[0]) bookFile.fileBook = fileBook[0].path;
      if (fileCover?.[0]) cover.fileCover = fileCover[0].path;
    }

    const book = {
      ...data,
      ...bookFile,
      ...cover,
      favorite: favorite === 'on',
    };

    const status = await updateBookData(id, book);

    if (!status) throw 'An error occured while saving book';

    res.status(200).redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const status = await deleteBookById(id);

    if (!status) throw 'An error occured while deleting book';

    res.status(204).redirect('/books');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const dowloadBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await getBookById(id);

    if (!book) {
      res.status(404).redirect('/404');
    }
    const { fileBook } = book;

    res.download(path.join(__dirname, '..', fileBook), (err) => {
      if (err) {
        console.error(err);
        res.status(404).redirect('/404');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
