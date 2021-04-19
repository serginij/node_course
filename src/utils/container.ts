import 'reflect-metadata';
import { Container } from 'inversify';

import { BookModule, IBookModule, IUserModule, UserModule } from '../models';
import { IocEnum } from '../types';

export const container = new Container();

container.bind<IBookModule>(IocEnum.BookModule).to(BookModule);
container.bind<IUserModule>(IocEnum.UserModule).to(UserModule);
