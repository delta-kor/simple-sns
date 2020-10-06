import { Request, Response } from 'express';
import Transform from '../../utils/transform';

export default class MemberController {
  public static signup(req: Request, res: Response): any {
    if (req.isAuthenticated()) return res.redirect('/');
    return res.render('member/signup', {
      title: 'Signup | Simple-SNS',
      description: 'Signup to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
  }

  public static login(req: Request, res: Response): any {
    if (req.isAuthenticated()) return res.redirect('/');
    return res.render('member/login', {
      title: 'Login | Simple-SNS',
      description: 'Login to simple-sns',
      key: Transform.encode(req.session.ticket.public),
      csrf: req.csrfToken(),
    });
  }
}
