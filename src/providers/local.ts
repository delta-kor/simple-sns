import dotenv from 'dotenv';

dotenv.config();

const Local: LocalValue = {
  URL: process.env.URL,
  MAX_UPLOAD: process.env.MAX_UPLOAD,
  MAX_PARAM: parseInt(process.env.MAX_PARAM, 10),
  CACHE: parseInt(process.env.CACHE, 10),
  DB: process.env.DB,
  SECRET: process.env.SECRET,
  SESSION_AGE: parseInt(process.env.SESSION_AGE, 10),
};

export default Local;
