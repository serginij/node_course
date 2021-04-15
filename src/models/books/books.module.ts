import axios from 'axios';
import 'reflect-metadata';
import { injectable } from 'inversify';

import { IBook } from '../../types';
import { Book } from './books.model';

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

export interface IBookModule {
  createBook: (book: IBook) => Promise<IBook>;
  getBookById: (id: string) => Promise<IBook | null>;
  getBooks: () => Promise<(IBook & { views: number })[] | null>;
  updateBook: (id: string, book: IBook) => Promise<IBook | null>;
  deleteBook: (id: string) => Promise<boolean>;
}

@injectable()
export class BookModule implements IBookModule {
  createBook = async (book: IBook) => {
    try {
      const bookModel = new Book(book);

      await bookModel.save();
      return bookModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getBooks = async () => {
    try {
      const books: IBook[] = await Book.find().select('-__v').lean();

      const res = await axios.get(
        `http://${COUNTER_HOST}:${COUNTER_PORT}/counter`,
      );
      const viewsById = JSON.parse(res.data);
      const formatted = books.map((book) => ({
        ...book,
        views: viewsById[book._id] || 0,
      }));

      return formatted;
    } catch {
      return null;
    }
  };

  getBookById = async (id: string) => {
    try {
      const book = await Book.findById(id).select('-__v').lean();

      const res = await axios.post(
        `http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`,
      );
      const { views } = JSON.parse(res.data);

      return { ...book, views };
    } catch {
      return null;
    }
  };

  updateBook = async (id: string, book: IBook) => {
    try {
      // eslint-disable-next-line no-unused-vars

      return await Book.findByIdAndUpdate(id, book);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  deleteBook = async (id: string) => {
    try {
      await Book.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
