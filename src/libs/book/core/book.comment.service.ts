import { Injectable } from '@nestjs/common';
import { BookComment } from '../model/book.comment.model';
import { BookCommentStore } from '../store/book.comment.store';

@Injectable()
export class BookCommentService {
  constructor(private readonly BookCommentStore: BookCommentStore) {}

  createBookComment = (comment: BookComment): Promise<BookComment | null> => {
    return this.BookCommentStore.createBookComment(comment);
  };

  getAllBookComments = async (bookId: string) => {
    try {
      return await this.BookCommentStore.getAllBookComments(bookId);
    } catch {
      return null;
    }
  };

  getBookCommentById = async (id: string) => {
    try {
      return await this.BookCommentStore.getBookCommentById(id);
    } catch {
      return null;
    }
  };

  updateBookComment = (id: string, comment: BookComment) => {
    return this.BookCommentStore.updateBookComment(id, comment);
  };

  deleteBookComment = (id: string) => {
    return this.BookCommentStore.deleteBookComment(id);
  };
}
