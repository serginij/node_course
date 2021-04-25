import { Module } from '@nestjs/common';
import { CoreBookModule } from './book/book.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreBookModule, UserModule],
})
export class CoreModule {}
