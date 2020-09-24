import { Request, Response } from 'express';

export default class MemberController {
  static signup(req: Request, res: Response): any {
    res.render('member/signup');
    return true;
  }
  static login(req: Request, res: Response): any {
    res.render('member/login');
    return true;
  }
}
