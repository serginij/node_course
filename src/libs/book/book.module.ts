import { Module } from '@nestjs/common';
import { BookService } from 'api/book/book.service';
import { BookController } from './controller/book.controller';
import { BookNetworking } from './networking/book.networking';
import { BookStore } from './store/book.store';

@Module({
  providers: [BookStore, BookNetworking, BookService],
  controllers: [BookController],
})
export class BookModule {}
