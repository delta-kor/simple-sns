import { Application } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User, { UserDocument } from '../models/user';

export default class Passport implements Middleware {
  public static mount(application: Application): void {
    application.use(passport.initialize());
    application.use(passport.session());

    passport.serializeUser<UserDocument, string>((user, done) => {
      return done(null, user.uuid);
    });
    passport.deserializeUser<UserDocument, string>(async (id, done) => {
      const user = await User.getUserByUUID(id);
      return user ? done(null, user) : done(null);
    });

    passport.use(
      new Strategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
          const user = await User.getUserByEmail(email);
          if (!user) return done(null, false);

          const matches = user.comparePassword(password);
          return done(null, matches ? user : false);
        }
      )
    );
  }
}
