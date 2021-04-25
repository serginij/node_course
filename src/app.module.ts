import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UtilsModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
