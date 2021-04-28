import { Module, HttpModule } from '@nestjs/common';

import { CoreBookService } from './book.service';

@Module({
  imports: [HttpModule],
  providers: [CoreBookService],
  exports: [CoreBookService],
})
export class CoreBookModule {}
