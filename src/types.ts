import { Request, Express } from 'express';

export interface IBook {
  _id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileBook: string;
}

export interface IBookCreate {
  title: string;
  description?: string;
  authors: string;
  favorite?: boolean;
  fileCover?: string;
  fileBook: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  email?: string;
}

export interface IUserRequest extends Request {
  user: IUser;
  session: {
    returnTo?: string;
  };
  logout: () => void;
}

export interface IMulterRequest extends Request {
  files: Record<string, Express.Multer.File[]>;
}

export interface IMessage {
  type: string;
  text: string;
  username: string;
}

export enum IocEnum {
  BookModule = 'BOOK_MODULE',
  UserModule = 'USER_MODULE',
}
