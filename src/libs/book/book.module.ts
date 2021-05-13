import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './controller/book.controller';
import { BookService } from './core/book.service';
import { Book, BookSchema } from './model/book.model';
import { BookNetworking } from './networking/book.networking';
import { BookStore } from './store/book.store';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    HttpModule,
  ],
  providers: [BookStore, BookNetworking, BookService, Book],
  controllers: [BookController],
})
export class BookModule {}
