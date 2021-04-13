import { Request } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const getPath = (fieldname: string) => {
  switch (fieldname) {
    case 'fileCover':
      return 'public/image';
    default:
      return 'public/book';
  }
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, getPath(file.fieldname));
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}.${file.originalname.split('.').pop()}`);
  },
});

const bookMimes = ['text/plain', 'application/pdf'];
const imageMimes = ['image/png', 'image/jpeg'];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (...args: any) => void,
) => {
  let allowedTypes = [];

  switch (file.fieldname) {
    case 'fileCover':
      allowedTypes = [...imageMimes];
      break;
    default:
      allowedTypes = [...bookMimes];
      break;
  }

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileMiddleware = multer({
  storage,
  fileFilter,
});
