import { Application, json, urlencoded } from 'express';
import compression from 'compression';
import lusca from 'lusca';
import helmet from 'helmet';
import { Middleware } from '../types/middleware';
import Local from '../utils/local';

export default class Http extends Middleware {
  public static mount(application: Application): void {
    application.use(
      json({
        limit: Local.MAX_UPLOAD,
      })
    );
    application.use(
      urlencoded({
        limit: Local.MAX_UPLOAD,
        parameterLimit: Local.MAX_PARAM,
      })
    );
    application.use(compression());
    application.use(
      lusca({
        xframe: 'sameorigin',
        xssProtection: true,
      })
    );
    application.use(helmet());
  }
}
