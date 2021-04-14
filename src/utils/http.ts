import http from 'http';

import { app } from './express';

export const httpServer = new http.Server(app);
