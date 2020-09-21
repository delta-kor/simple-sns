import dotenv from 'dotenv';

dotenv.config();

const Local: LocalValue = {
  URL: process.env.URL,
  MAX_UPLOAD: process.env.MAX_UPLOAD,
  MAX_PARAM: parseInt(process.env.MAX_PARAM, 10),
};

export default Local;
