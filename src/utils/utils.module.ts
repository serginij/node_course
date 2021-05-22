import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  providers: [UtilsService, FirebaseService],
  exports: [UtilsService, FirebaseService],
})
export class UtilsModule {}
