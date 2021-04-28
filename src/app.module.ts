import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

const DB_PASS = process.env.DB_PASS || 'qwerty';
const DB_NAME = process.env.DB_NAME || 'library';
const DB_URL = `mongodb+srv://user:${DB_PASS}@cluster0.hvmwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

@Module({
  imports: [UtilsModule, CoreModule, ApiModule, MongooseModule.forRoot(DB_URL)],
  providers: [AppService],
})
export class AppModule {}
