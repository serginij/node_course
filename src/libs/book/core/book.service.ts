import { Injectable } from '@nestjs/common';
import { Book } from '../model/book.model';
import { BookNetworking } from '../networking/book.networking';
import { BookFirebaseStore } from '../store/book.firebase.store';

@Injectable()
export class BookService {
  constructor(
    private readonly BookStore: BookFirebaseStore,
    private readonly BookNetworking: BookNetworking,
  ) {}

  createBook = (book: Book): Promise<string | null> => {
    return this.BookStore.createBook(book);
  };

  getBooks = async () => {
    try {
      const books = await this.BookStore.getBooks();
      if (!books) throw new Error();

      const viewsById = await this.BookNetworking.getBooksViews();
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
      const book = await this.BookStore.getBookById(id);
      const { views } = await this.BookNetworking.getBookByIdViews(id);

      return { ...book, views };
    } catch {
      return null;
    }
  };

  updateBook = (id: string, book: Book) => {
    return this.BookStore.updateBook(id, book);
  };

  deleteBook = (id: string) => {
    return this.BookStore.deleteBook(id);
  };
}
