import { HttpModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { Model } from 'mongoose';
import { Book } from '../model/book.model';
import { BookNetworking } from '../networking/book.networking';
import { BookStore } from '../store/book.store';
import { BookService } from './book.service';

describe('BookService', () => {
  let bookService: BookService;
  let bookStore: BookStore;
  let bookNetworking: BookNetworking;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: Model,
        },
        BookStore,
        BookNetworking,
      ],
    }).compile();

    bookService = moduleRef.get<BookService>(BookService);
    bookStore = moduleRef.get<BookStore>(BookStore);
    bookNetworking = moduleRef.get<BookNetworking>(BookNetworking);
  });

  describe('createBook', () => {
    it('should return book', async () => {
      const mockData: Book = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
      };
      const result = mockData;
      jest
        .spyOn(bookStore, 'createBook')
        .mockImplementation(() => Promise.resolve(mockData as any));

      expect(await bookService.createBook(mockData)).toBe(result);
    });

    it('should return null (throws error)', async () => {
      const mockData: Book = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
      };
      const result = null;
      jest
        .spyOn(bookStore, 'createBook')
        .mockImplementation(() => Promise.resolve(null));

      expect(await bookService.createBook(mockData)).toBe(result);
    });
  });

  describe('getBooks', () => {
    it('should return Books with views', async () => {
      const mockData: Book & { _id: string } = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      const result = [
        {
          favorite: false,
          title: '',
          description: '',
          fileBook: '',
          fileCover: '',
          authors: '',
          views: 123,
          _id: 'test',
        },
      ];
      jest
        .spyOn(bookStore, 'getBooks')
        .mockImplementation(() => Promise.resolve([mockData] as any));

      jest
        .spyOn(bookNetworking, 'getBooksViews')
        .mockImplementation(() => Promise.resolve({ test: 123 }));

      expect(await bookService.getBooks()).toStrictEqual(result);
    });

    it('should return Books with views = 0', async () => {
      const mockData: Book & { _id: string } = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      const result = [
        {
          favorite: false,
          title: '',
          description: '',
          fileBook: '',
          fileCover: '',
          authors: '',
          views: 0,
          _id: 'test',
        },
      ];
      jest
        .spyOn(bookStore, 'getBooks')
        .mockImplementation(() => Promise.resolve([mockData] as any));

      jest
        .spyOn(bookNetworking, 'getBooksViews')
        .mockImplementation(() => Promise.resolve({ qwerty: 123 }));

      expect(await bookService.getBooks()).toStrictEqual(result);
    });

    it('should return null', async () => {
      const result = null;
      jest
        .spyOn(bookStore, 'getBooks')
        .mockImplementation(() => Promise.resolve(undefined as any));

      jest
        .spyOn(bookNetworking, 'getBooksViews')
        .mockImplementation(() => Promise.resolve({ qwerty: 123 }));

      expect(await bookService.getBooks()).toStrictEqual(result);
    });
  });

  describe('getBookById', () => {
    it('should return Book with updated views', async () => {
      const mockData: Book & { _id: string; views: number } = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
        views: 123,
      };

      const result = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
        views: 124,
        _id: 'test',
      };

      jest
        .spyOn(bookStore, 'getBookById')
        .mockImplementation(() => Promise.resolve(mockData as any));

      jest
        .spyOn(bookNetworking, 'getBookByIdViews')
        .mockImplementation(() => Promise.resolve({ views: 124 }));

      expect(await bookService.getBookById('test')).toStrictEqual(result);
    });

    it('should return null', async () => {
      const mockData: Book & { _id: string } = {
        favorite: false,
        title: '',
        description: '',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      const result = null;
      jest
        .spyOn(bookStore, 'getBooks')
        .mockImplementation(() => Promise.resolve([mockData] as any));

      jest
        .spyOn(bookNetworking, 'getBooksViews')
        .mockImplementation(() => Promise.resolve({ qwerty: 123 }));

      expect(await bookService.getBookById('test')).toStrictEqual(result);
    });
  });

  describe('updateBook', () => {
    it('should return updated Book', async () => {
      const mockData: Book & { _id: string } = {
        favorite: false,
        title: '',
        description: 'updated desc',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      const result = {
        favorite: false,
        title: '',
        description: 'updated desc',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      jest
        .spyOn(bookStore, 'updateBook')
        .mockImplementation(() => Promise.resolve(mockData as any));

      expect(await bookService.updateBook('test', mockData)).toStrictEqual(
        result,
      );
    });

    it('should return null', async () => {
      const mockData: Book & { _id: string } = {
        favorite: false,
        title: '',
        description: 'updated desc',
        fileBook: '',
        fileCover: '',
        authors: '',
        _id: 'test',
      };

      const result = null;

      jest
        .spyOn(bookStore, 'updateBook')
        .mockImplementation(() => Promise.resolve(null as any));

      expect(await bookService.updateBook('test', mockData)).toStrictEqual(
        result,
      );
    });
  });

  describe('deleteBook', () => {
    it('should return true', async () => {
      const mockData = 'test';

      const result = true;

      jest
        .spyOn(bookStore, 'deleteBook')
        .mockImplementation(() => Promise.resolve(true as any));

      expect(await bookService.deleteBook(mockData)).toStrictEqual(result);
    });

    it('should return false', async () => {
      const mockData = 'qqq';

      const result = false;

      jest
        .spyOn(bookStore, 'deleteBook')
        .mockImplementation(() => Promise.resolve(false as any));

      expect(await bookService.deleteBook(mockData)).toStrictEqual(result);
    });
  });
});
