import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../core/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async signup(@Body() data: CreateUserDto) {
    const user = await this.userService.createUser(data);

    if (user) return user;
    else throw new InternalServerErrorException();
  }
}
