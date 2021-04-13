import { Response, NextFunction } from 'express';
import { IUserRequest } from '../types';

export const authMiddleware = (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) => {
  if (
    (!req.isAuthenticated || !req.isAuthenticated()) &&
    !['/user/login', '/user/signup'].includes(req.path)
  ) {
    if (!req.path.includes('favicon.ico')) {
      req.session.returnTo = req.originalUrl || req.url;
    }

    return res.redirect('/user/login');
  }

  next();
};
