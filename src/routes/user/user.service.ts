import { Request, Response } from 'express';

import { IocEnum, IUserRequest } from '../../types';
import { container, encryptPassword } from '../../utils';
import { IUserModule } from '../../models';

const User = container.get<IUserModule>(IocEnum.UserModule);

const { createUser } = User;

export const renderLogin = (req: Request, res: Response) => {
  res.render('user/login');
};

export const renderSignup = (req: Request, res: Response) => {
  res.render('user/signup');
};

export const renderProfile = (req: Request, res: Response) => {
  res.render('profile', { user: (req as IUserRequest).user });
};

export const getProfile = (req: Request, res: Response) => {
  res.render('user/profile', { user: (req as IUserRequest).user });
};

export const logoutUser = (req: Request, res: Response) => {
  (req as IUserRequest).logout();
  res.redirect('/');
};

export const redirectOnLogin = (req: Request, res: Response) => {
  res.redirect((req as IUserRequest).session.returnTo || '/user/me');
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { password, ...userData } = req.body;
    const encryptedPassword = await encryptPassword(password);

    await createUser({ ...userData, password: encryptedPassword });

    res.redirect('/user/login');
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};
