const multer = require('multer');
const { v4: uuid } = require('uuid');

const getPath = (fieldname) => {
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

const fileFilter = (req, file, cb) => {
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

module.exports = multer({
  storage,
  fileFilter,
});
