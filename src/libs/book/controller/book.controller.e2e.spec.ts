import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { BookService } from '../core/book.service';
import { BookModule } from '../book.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../model/book.model';
import { BookController } from './book.controller';

describe('Book controller (e2e)', () => {
  let app: INestApplication;
  const bookService = {
    createBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
    getBooks: jest.fn(),
    getBookById: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: getModelToken(Book.name),
          useValue: Model,
        },
        BookService,
      ],
    })
      .overrideProvider(BookService)
      .useValue(bookService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(undefined as any);
  });

  it('/create (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/create')
      .expect(200)
      .expect(undefined as any);
  });

  it('/update/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/update/id')
      .expect(200)
      .expect(undefined as any);
  });

  it('/id (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/id')
      .expect(200)
      .expect(undefined as any);
  });

  it('/id/download (GET)', () => {
    return request(app.getHttpServer())
      .get('/books/id/download')
      .expect(200)
      .expect(undefined as any);
  });

  it('/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/books/create')
      .expect(200)
      .expect(undefined as any);
  });

  it('/update/id (POST)', () => {
    return request(app.getHttpServer())
      .post('/books/update/id')
      .expect(200)
      .expect(undefined as any);
  });

  it('/delete/id (POST)', () => {
    return request(app.getHttpServer())
      .post('/books/delete/id')
      .expect(200)
      .expect(undefined as any);
  });

  afterAll(async () => {
    await app.close();
  });
});
