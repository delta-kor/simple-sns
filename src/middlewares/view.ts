import { Application } from 'express';

export default class View implements Middleware {
  static mount(application: Application): void {
    application.set('views', 'views/pages');
    application.set('view engine', 'pug');
  }
}
