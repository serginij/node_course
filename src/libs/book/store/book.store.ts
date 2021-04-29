import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocuemnt } from '../model/book.model';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class BookStore {
  constructor(
    @InjectModel(Book.name) private readonly BookModel: Model<BookDocuemnt>, // @InjectConnection() private connection: Connection,
  ) {}

  createBook = async (book: BookDto): Promise<BookDocuemnt | null> => {
    try {
      const bookModel = new this.BookModel(book);

      await bookModel.save();
      return bookModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getBooks = async () => {
    try {
      const books = await this.BookModel.find().select('-__v').lean().exec();

      return books;
    } catch {
      return null;
    }
  };

  getBookById = async (id: string) => {
    try {
      const book = await this.BookModel.findById(id)
        .select('-__v')
        .lean()
        .exec();

      return book;
    } catch {
      return null;
    }
  };

  updateBook = async (id: string, book: BookDto) => {
    try {
      return await this.BookModel.findByIdAndUpdate(id, book).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  deleteBook = async (id: string) => {
    try {
      await this.BookModel.findByIdAndDelete(id).exec();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
