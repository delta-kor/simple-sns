import { Application, json, urlencoded } from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import compression from 'compression';
import lusca from 'lusca';
import helmet from 'helmet';
import csurf from 'csurf';
import cors from 'cors';
import Local from '../providers/local';

const MongoStore = mongo(session);

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

    application.use(
      session({
        name: 'ssns',
        resave: true,
        secret: Local.SECRET,
        saveUninitialized: true,
        cookie: {
          maxAge: Local.SESSION_AGE,
        },
        store: new MongoStore({
          url: Local.DB,
          autoReconnect: true,
        }),
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
    application.use(csurf());
    application.use(
      cors({
        origin: Local.URL,
      })
    );
  }
}
