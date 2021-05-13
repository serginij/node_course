import { Request, Response } from 'express';

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.render('error/404', { title: '404 | not found' });
};
