import { Application } from 'express';
import { Middleware } from '../types/middleware';
import Http from './http';

export default class Kernel extends Middleware {
  public static mount(application: Application): number {
    const middlewares: typeof Middleware[] = [Http];
    middlewares.forEach(middleware => middleware.mount(application));
    return middlewares.length;
  }
}
