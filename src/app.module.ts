import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [UtilsModule, CoreModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
