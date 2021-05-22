import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { User } from '../model/user.model';
import { UserStore } from '../store/user.store';

@Injectable()
export class UserService {
  constructor(
    private readonly UserStore: UserStore,
    private readonly UtilsService: UtilsService,
  ) {}

  createUser = async (user: User) => {
    const { password, ...userData } = user;

    const encryptedPassword = await this.UtilsService.encryptPassword(password);

    return await this.UserStore.createUser({
      ...userData,
      password: encryptedPassword,
    });
  };

  validateUser = async (email: string, pass: string) => {
    const user = await this.UserStore.getUserByEmail(email);

    if (user) {
      const { password, ...result } = user;
      const isEquals = await this.UtilsService.decryptPassword(pass, password);

      if (isEquals) return result;
    }
    return null;
  };

  getUserById = async (id: string) => {
    const user = await this.UserStore.getUserById(id);

    if (user) {
      const { password, ...data } = user;

      return data;
    }

    return null;
  };
}
