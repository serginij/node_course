import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/utils/utils.module';
import { BookCommentGateway } from './controller/book.comment.gateway';
import { BookController } from './controller/book.controller';
import { BookCommentService } from './core/book.comment.service';
import { BookService } from './core/book.service';
import { BookComment, BookCommentSchema } from './model/book.comment.model';
import { Book, BookSchema } from './model/book.model';
import { BookNetworking } from './networking/book.networking';
import { BookCommentStore } from './store/book.comment.store';
import { BookFirebaseStore } from './store/book.firebase.store';
import { BookStore } from './store/book.store';

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
    HttpModule,
  ],
  providers: [
    BookStore,
    BookNetworking,
    BookService,
    Book,
    BookComment,
    BookCommentService,
    BookCommentStore,
    BookCommentGateway,
    BookFirebaseStore,
  ],
  controllers: [BookController],
})
export class BookModule {}
