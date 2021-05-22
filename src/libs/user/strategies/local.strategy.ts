import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/libs/user/core/user.service';
import { Strategy } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(email: string, pass: string) {
    const user = await this.userService.validateUser(email, pass);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
