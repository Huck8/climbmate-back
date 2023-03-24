import multer from 'multer';

export const diskUpload = multer({
  limits: {
    fileSize: 8000000,
  },
});

export const upload = multer();
