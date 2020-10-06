import { Request, Response } from 'express';

export default class MainController {
  public static index(req: Request, res: Response): any {
    if (req.isAuthenticated())
      return res.render('main/client', {
        title: 'Main | Simple-SNS',
      });
    else
      return res.render('main/guest', {
        title: 'Main | Simple-SNS',
      });
  }
}
