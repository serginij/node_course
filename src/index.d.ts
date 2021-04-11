/// <reference types="express" />
/// <reference types="multer" />
declare const cors: any;
declare const bodyParser: any;
declare const passport: any;
declare const booksRouter: any, userRouter: any, mainRouter: any, chatRouter: any;
declare const notFoundMiddleware: any, authMiddleware: any;
declare const connectToDb: any, app: any, httpServer: any;
declare const PORT: string | number;
declare const start: () => Promise<void>;
declare module "types" {
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
    }
    export interface IMulterRequest extends Request {
        files: Record<string, Express.Multer.File[]>;
    }
}
declare module "models/books/books.model" {
    export const Book: any;
}
declare module "models/books/books.module" {
    import { IBook } from "types";
    export interface IBookModule {
        createBook: (book: IBook) => Promise<IBook>;
        getBookById: (id: string) => Promise<IBook | null>;
        getBooks: () => Promise<(IBook & {
            views: number;
        })[] | null>;
        updateBook: (id: string, book: IBook) => Promise<IBook | null>;
        deleteBook: (id: string) => Promise<boolean>;
    }
    export class BookModule implements IBookModule {
        createBook: (book: IBook) => Promise<any>;
        getBooks: () => Promise<{
            views: any;
            _id: string;
            title: string;
            description: string;
            authors: string;
            favorite: boolean;
            fileCover: string;
            fileBook: string;
        }[] | null>;
        getBookById: (id: string) => Promise<any>;
        updateBook: (id: string, book: IBook) => Promise<any>;
        deleteBook: (id: string) => Promise<boolean>;
    }
}
declare module "models/books/index" {
    export { IBookModule, BookModule } from "models/books/books.module";
}
declare module "routes/books/books.service" {
    import { Request, Response } from 'express';
    import { IMulterRequest, IUserRequest } from "types";
    export const getAllBooks: (req: Request, res: Response) => Promise<void>;
    export const renderNewBook: (req: Request, res: Response) => void;
    export const renderBookById: (req: Request, res: Response) => Promise<void>;
    export const getBook: (req: IUserRequest, res: Response) => Promise<void>;
    export const createBook: (req: IMulterRequest, res: Response) => Promise<void>;
    export const updateBook: (req: IMulterRequest, res: Response) => Promise<void>;
    export const deleteBook: (req: Request, res: Response) => Promise<void>;
    export const dowloadBook: (req: Request, res: Response) => Promise<void>;
}
declare module "routes/books/books.controller" { }
