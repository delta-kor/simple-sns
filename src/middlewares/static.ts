import { Application, static as Statics } from 'express';
import Local from '../providers/local';

export default class Static implements Middleware {
  static mount(application: Application): void {
    application.use(Statics('dist/client', { maxAge: Local.CACHE }));
  }
}
