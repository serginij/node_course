import express from 'express';

import { renderMain } from './main.service';

const router = express.Router();

router.get('/', renderMain);

export const mainRouter = router;
