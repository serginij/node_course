import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.model';

@Injectable()
export class UserStore {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}
  createUser = async (user: User): Promise<UserDocument | null> => {
    try {
      const userModel = new this.UserModel(user);

      await userModel.save();
      return userModel;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getUserById = async (id: string) => {
    try {
      const user = await this.UserModel.findById(id).select('-__v').lean();

      if (!user) return null;

      return user;
    } catch {
      return null;
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const user = await this.UserModel.findOne({ email })
        .select('-__v')
        .lean();

      if (!user) return null;

      return user;
    } catch {
      return null;
    }
  };
}
