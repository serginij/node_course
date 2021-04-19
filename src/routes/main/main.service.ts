import { Request, Response } from 'express';

export const renderMain = (req: Request, res: Response) => {
  res.render('index', {
    title: 'Main page',
  });
};
