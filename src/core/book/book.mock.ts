import { IBook } from 'types';

// TODO: replact with mongo module
interface IBookQuery {
  select: (filter: string) => { lean: () => IBook | IBook[] };
}

class BookQuery implements IBookQuery {
  select = () => {
    return { lean: () => [] };
  };
}

interface IBookModel {
  save: () => Promise<any>;
  find: (props?: any) => IBookQuery;
  findById: (props: any) => IBookQuery;
  findByIdAndUpdate: (props: any, data: any) => Promise<boolean>;
  findByIdAndDelete: (props: any) => Promise<boolean>;
}

export class BookModel implements IBookModel {
  private book: IBook;
  constructor(book?: IBook) {
    if (book) {
      this.book = book;
    }
  }

  save = async () => {
    return true;
  };

  find = () => {
    return new BookQuery();
  };

  findById = () => {
    return new BookQuery();
  };

  findByIdAndUpdate = async () => {
    return true;
  };

  findByIdAndDelete = async () => {
    return true;
  };
}

export const Book: IBookModel = new BookModel();
