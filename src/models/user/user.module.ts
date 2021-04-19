import axios from 'axios';
import 'reflect-metadata';
import { injectable } from 'inversify';

import { IUser } from '../../types';
import { User } from './user.model';

export interface IUserModule {
  createUser: (user: IUser) => Promise<IUser>;
  getUserById: (id: string) => Promise<IUser | null>;
  getUserByUsername: (username: string) => Promise<IUser | null>;
}

@injectable()
export class UserModule implements IUserModule {
  createUser = async (user: IUser) => {
    try {
      const userModel = new User(user);

      await userModel.save();
      return userModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getUserById = async (id: string) => {
    try {
      const user = await User.findById(id).select('-__v').lean();

      if (!user) return null;

      return user;
    } catch {
      return null;
    }
  };

  getUserByUsername = async (username: string) => {
    try {
      const user = await User.findOne({ username }).select('-__v').lean();

      if (!user) return null;

      return user;
    } catch {
      return null;
    }
  };
}
