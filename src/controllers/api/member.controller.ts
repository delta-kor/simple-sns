import { Request, Response } from 'express';
import validator from 'validator';
import Output, { Status } from '../../providers/output';

export interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

export default class MemberController {
  static signup(req: Request, res: Response): any {
    const body: SignupPayload = req.body;

    if (!validator.isEmail(body.email)) {
      Output.reject(res, Status.SIGNUP_INVALID_EMAIL);
      return false;
    }

    if (body.password.length < 8) {
      Output.reject(res, Status.SIGNUP_SHORT_PASSWORD);
      return false;
    }

    if (!validator.equals(body.password, body.confirm)) {
      Output.reject(res, Status.SIGNUP_PASSWORD_UNMATCH);
      return false;
    }

    Output.resolve(res);
  }
}
