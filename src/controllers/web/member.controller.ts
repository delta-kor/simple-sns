import { Request, Response } from 'express';
import Transform from '../../utils/transform';

export default class MemberController {
  static signup(req: Request, res: Response): any {
    res.render('member/signup', { key: Transform.encode(req.ticket.public) });
    return true;
  }
  static login(req: Request, res: Response): any {
    res.render('member/login');
    return true;
  }
}
