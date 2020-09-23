import mongoose from 'mongoose';
import Local from './local';

export default class Database {
  static async load(): Promise<void> {
    await mongoose.connect(Local.DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }
}
