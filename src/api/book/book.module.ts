import { Module } from '@nestjs/common';
import { CoreBookModule } from 'core/book/book.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [CoreBookModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
