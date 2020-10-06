import { Request, Response } from 'express';
import validator from 'validator';
import Output, { Status } from '../../providers/output';
import User from '../../models/user';

export interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

export default class MemberController {
  public static async signup(req: Request, res: Response): Promise<any> {
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

    const created = await User.createUser(body.email, body.password);
    if (!created) return Output.reject(res, Status.SIGNUP_EXISTING_USER);

    return Output.resolve(res);
  }
}
