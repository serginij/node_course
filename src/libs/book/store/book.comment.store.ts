import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookComment, BookCommentDocument } from '../model/book.comment.model';

@Injectable()
export class BookCommentStore {
  constructor(
    @InjectModel(BookComment.name)
    private readonly BookCommentModel: Model<BookCommentDocument>,
  ) {}

  createBookComment = async (
    book: BookComment,
  ): Promise<BookCommentDocument | null> => {
    try {
      const BookCommentModel = new this.BookCommentModel(book);

      await BookCommentModel.save();
      return BookCommentModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getAllBookComments = async (
    bookId: string,
  ): Promise<BookComment[] | null> => {
    try {
      const comments = await this.BookCommentModel.find({ bookId })
        .select('-__v')
        .lean()
        .exec();

      return comments;
    } catch {
      return null;
    }
  };

  getBookCommentById = async (id: string) => {
    try {
      const comment = await this.BookCommentModel.findById(id)
        .select('-__v')
        .lean()
        .exec();

      return comment;
    } catch {
      return null;
    }
  };

  updateBookComment = async (id: string, comment: BookComment) => {
    try {
      return await this.BookCommentModel.findByIdAndUpdate(id, comment).exec();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  deleteBookComment = async (id: string) => {
    try {
      await this.BookCommentModel.findByIdAndDelete(id).exec();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
