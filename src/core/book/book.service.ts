import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBook } from 'types';

import { Book, BookDocuemnt } from './book.model';

const COUNTER_PORT = process.env.COUNTER_PORT || 3001;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';

/*
Рутовая директория для доменов (модули: Books, Main, User)  - libs

Опционально можно сложить service, networking, store, .... рядом без создания вложенных директорий

libs/
  book/
    core/ Различные файлы, модули, чистые, без деталей (бд, роуты), должны быть Injectable, похер на окружающий мир
      book.service.ts - обработка логики, без валидации
    networking/ Сервисы, которые инкапсулируют запросы
      book.networking.ts -- Внутри набор методов, которые дергают httpModule (запросы к микросервисам, сторонним api)
    store/
      book.store.ts -- работа с базами, другими хранилищами данных
    routes (controllers)/ -- Обработчки http и не только запросов
      book.controller.ts -- Валидация, DTO
    dto/
      book.dto.ts
    interfaces/
      book.interfaces.ts
    models/
      book.model.ts
    book.module.ts
  main/
  user/
*/

@Injectable()
export class CoreBookService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Book.name) private readonly BookModel: Model<BookDocuemnt>, // @InjectConnection() private connection: Connection,
  ) {}

  createBook = async (book: IBook): Promise<BookDocuemnt | null> => {
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

      const res = await this.httpService
        .get(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter`)
        .toPromise();
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
      const book = await this.BookModel.findById(id)
        .select('-__v')
        .lean()
        .exec();

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
