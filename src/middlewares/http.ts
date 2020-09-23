import { Application, json, urlencoded } from 'express';
import compression from 'compression';
import lusca from 'lusca';
import helmet from 'helmet';
import cors from 'cors';
import Local from '../providers/local';

export default class Http implements Middleware {
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
        extended: true,
      })
    );
    application.use(compression());
    application.use(
      lusca({
        xframe: 'sameorigin',
        xssProtection: { enabled: true, mode: 'block' },
      })
    );
    application.use(
      helmet({
        xssFilter: false,
      })
    );
    application.use(
      cors({
        origin: Local.URL,
      })
    );
  }
}
