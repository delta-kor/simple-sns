import { NextFunction, Request, Response } from 'express';
import Transform from '../../utils/transform';
import { UserDocument } from '../../models/user';

export default class MemberController {
  public static signup(req: Request, res: Response): any {
    if (req.isAuthenticated()) return res.redirect((req.query.go as string) || '/');
    return res.render('member/signup', {
      title: 'Signup | Simple-SNS',
      description: 'Signup to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
  }

  public static login(req: Request, res: Response): any {
    if (req.isAuthenticated()) return res.redirect((req.query.go as string) || '/');
    return res.render('member/login', {
      title: 'Login | Simple-SNS',
      description: 'Login to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
  }

  public static setup(req: Request, res: Response): any {
    if (!req.isAuthenticated())
      return res.redirect(`/login?go=${encodeURIComponent(req.originalUrl)}`);
    const user = req.user as UserDocument;
    if (user.isSetupCompleted) return res.redirect((req.query.go as string) || '/');
    return res.render('member/setup', {
      title: 'Setup | Simple-SNS',
      description: 'Account setup',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
  }

  public static isAuthenticated(req: Request, res: Response, next: NextFunction): any {
    if (req.isAuthenticated()) {
      const user = req.user as UserDocument;
      return user.isSetupCompleted
        ? next()
        : res.redirect(`/setup?go=${encodeURIComponent(req.originalUrl)}`);
    }
    return res.redirect(`/login?go=${encodeURIComponent(req.originalUrl)}`);
  }
}
