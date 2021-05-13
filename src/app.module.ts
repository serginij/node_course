import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './libs/book/book.module';
import { UserModule } from './libs/user/user.module';
import { MainModule } from './libs/main/main.module';

const DB_PASS = process.env.DB_PASS || 'qwerty';
const DB_NAME = process.env.DB_NAME || 'library';
const DB_URL = `mongodb+srv://user:${DB_PASS}@cluster0.hvmwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forRoot(DB_URL),
    BookModule,
    UserModule,
    MainModule,
  ],
  providers: [AppService],
})
export class AppModule {}
