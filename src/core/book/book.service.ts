import { Injectable, HttpService } from '@nestjs/common';

import { IBook } from 'types';
import { BookModel, Book } from './book.mock';

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

@Injectable()
export class CoreBookService {
  constructor(private readonly httpService: HttpService) {}

  createBook = async (book: IBook) => {
    try {
      const bookModel = new BookModel(book);

      await bookModel.save();
      return bookModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getBooks = async () => {
    try {
      const books = (await Book.find().select('-__v').lean()) as IBook[];

      const res = await this.httpService
        .get(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter`)
        .toPromise();
      const viewsById = JSON.parse(res.data);
      const formatted = books.map((book) => ({
        ...book,
        views: viewsById[book._id] || 0,
      }));

      return [] || formatted;
    } catch {
      return null;
    }
  };

  getBookById = async (id: string) => {
    try {
      const book = await Book.findById(id).select('-__v').lean();

      const res = await this.httpService
        .post(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${id}/incr`)
        .toPromise();
      const { views } = JSON.parse(res.data);

      return { ...book, views };
    } catch {
      return null;
    }
  };

  updateBook = async (id: string, book: IBook) => {
    try {
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
