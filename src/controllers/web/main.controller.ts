import { Request, Response } from 'express';

export default class MainController {
  public static index(req: Request, res: Response): any {
    return res.render('main/guest');
  }
}
