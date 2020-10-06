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

    body.email = validator.normalizeEmail(body.email) || '';

    if (!validator.isEmail(body.email)) {
      return Output.reject(res, Status.SIGNUP_INVALID_EMAIL);
    }

    if (validator.isLength(body.password, { max: 8 })) {
      return Output.reject(res, Status.SIGNUP_SHORT_PASSWORD);
    }

    if (!validator.equals(body.password, body.confirm)) {
      return Output.reject(res, Status.SIGNUP_PASSWORD_UNMATCH);
    }

    return Output.resolve(res);
  }
}
