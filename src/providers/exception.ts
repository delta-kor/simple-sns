import { Application, NextFunction, Request, Response } from 'express';
import Log from '../utils/log';
import Output, { Status } from './output';

export default class Exception {
  static load(application: Application): void {
    application.use((req: Request, res: Response) => {
      res.status(404);
      if (req.accepts('html'))
        return res.render('error/not_found', { title: 'Not Found', description: 'Page not found' });
      if (req.accepts('json')) return Output.reject(res, Status.NOT_FOUND, 'Not found');
      return res.type('text').send('404');
    });

    application.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
      if (err.code === 'EBADCSRFTOKEN') {
        res.status(403);
        if (req.accepts('html'))
          return res.render('error/forbidden', {
            title: 'Forbidden',
            description: 'Access forbidden',
          });
        if (req.accepts('json')) return Output.reject(res, Status.CSRF_ERROR);
        return res.type('text').send('CSRF error');
      }

      Log.error(err.stack);
      res.status(500);

      if (req.accepts('html'))
        return res.render('error/exception', { title: 'Error', description: 'Server error' });
      if (req.accepts('json')) return Output.reject(res, Status.SERVER_ERROR, 'Server error');
      return res.type('text').send('Server error');
    });
  }
}
