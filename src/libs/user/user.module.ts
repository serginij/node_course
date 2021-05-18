import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/libs/user/strategies/jwt.strategy';
import { UtilsModule } from 'src/utils/utils.module';
import { UserController } from './controller/user.controller';
import { UserService } from './core/user.service';
import { User, UserSchema } from './model/user.model';
import { UserStore } from './store/user.store';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UtilsModule,
  ],
  providers: [JwtStrategy, UserService, UserStore, User],
  controllers: [UserController],
})
export class UserModule {}
