import { Request, Response } from 'express';
import { UserDocument } from '../../models/user';

export default class MainController {
  public static index(req: Request, res: Response): any {
    if (req.isAuthenticated()) {
      const user = req.user as UserDocument;
      if (user.isSetupCompleted)
        return res.render('main/client', {
          title: 'Main | Simple-SNS',
          user: req.user,
        });
      else return res.redirect(`/setup?go=${encodeURIComponent(req.originalUrl)}`);
    } else
      return res.render('main/guest', {
        title: 'Main | Simple-SNS',
      });
  }
}
