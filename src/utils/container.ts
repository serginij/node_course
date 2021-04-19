import 'reflect-metadata';
import { Container, decorate, injectable } from 'inversify';

import { BookModule, IBookModule } from '../models';
import { IocEnum } from '../types';

export const container = new Container();

container.bind<IBookModule>(IocEnum.BookModule).to(BookModule);
