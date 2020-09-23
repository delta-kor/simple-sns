import { Request, Response } from 'express';

export default class MainController {
  static index(req: Request, res: Response): any {
    res.render('index');
    return true;
  }
}
