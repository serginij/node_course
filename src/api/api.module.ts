import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [BookModule, MainModule],
  exports: [BookModule, MainModule],
})
export class ApiModule {}
