import { Request, Response } from 'express';
import Transform from '../../utils/transform';

export default class MemberController {
  static signup(req: Request, res: Response): any {
    res.render('member/signup', {
      title: 'Signup',
      description: 'Signup to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
    return true;
  }
  static login(req: Request, res: Response): any {
    res.render('member/login', {
      title: 'Login',
      description: 'Login to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
    return true;
  }
}
