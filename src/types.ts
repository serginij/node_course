import { Request } from 'express';

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
  isAuthenticated?: () => boolean;
}

export interface IMulterRequest extends Request {
  files: Record<string, Express.Multer.File[]>;
}
