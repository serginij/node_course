import 'reflect-metadata';
import { Container } from 'inversify';
import { BookModule } from '../models';

export const container = new Container();

container.bind(BookModule).toSelf();
