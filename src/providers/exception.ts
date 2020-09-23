import { Application, NextFunction, Request, Response } from 'express';
import Log from '../utils/log';

export default class Exception {
  static load(application: Application): void {
    application.use((req: Request, res: Response) => {
      res.status(404);
      if (req.accepts('html')) return res.render('not_found');
      if (req.accepts('json'))
        return res.json({ resolved: false, status: -1000, message: 'Not found' });
      return res.type('text').send('404');
    });
    application.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      Log.error(err.stack);
      res.status(500);
      if (req.accepts('html')) return res.render('error');
      if (req.accepts('json'))
        return res.json({ resolved: false, status: -2000, message: 'Server error' });
      return res.type('text').send('Server error');
    });
  }
}
