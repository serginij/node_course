import passport from 'passport';
import {
  IStrategyOptions,
  Strategy as LocalStrategy,
  VerifyFunction,
} from 'passport-local';

import { container, decryptPassword } from '.';
import { IUserModule } from '../models';
import { IocEnum, IUser } from '../types';

const User = container.get<IUserModule>(IocEnum.UserModule);

const { getUserById, getUserByUsername } = User;

const verifyUser: VerifyFunction = async (username, pwd, done) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false);
    }
    const { password, ...userData } = user;

    if (!(await decryptPassword(password, pwd))) {
      return done(null, false);
    }

    return done(null, userData);
  } catch (err) {
    return done(err);
  }
};

const passportOptions: IStrategyOptions = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
};

passport.use('local', new LocalStrategy(passportOptions, verifyUser));

passport.serializeUser((user: Express.User, cb: (...args: any) => void) => {
  cb(null, (user as IUser)._id);
});

passport.deserializeUser(async (id: string, cb: (...args: any) => void) => {
  try {
    const user = await getUserById(id);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

export default passport;
