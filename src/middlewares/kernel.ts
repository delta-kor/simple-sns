import { Application } from 'express';
import Http from './http';
import View from './view';
import Static from './static';

export default class Kernel implements Middleware {
  public static mount(application: Application): number {
    const middlewares: typeof Middleware[] = [Http, View, Static];
    middlewares.forEach(middleware => middleware.mount(application));
    return middlewares.length;
  }
}
