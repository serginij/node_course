import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.model';

import { CoreBookService } from './book.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [CoreBookService],
  exports: [CoreBookService],
})
export class CoreBookModule {}
