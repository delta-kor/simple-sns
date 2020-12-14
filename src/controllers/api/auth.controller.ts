import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import Output, { Status } from '../../providers/output';
import User, { UserDocument } from '../../models/user';

export interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SetupPayload {
  nickname: string;
}

export default class AuthController {
  public static async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.isAuthenticated()) return Output.reject(res, Status.SIGNUP_ALREADY_LOGINED);

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

    const user = await User.createUser(body.email, body.password);
    if (!user) return Output.reject(res, Status.SIGNUP_EXISTING_USER);

    return req.login(created, error => {
      if (error) return next(error);
      return Output.resolve(res);
    });
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.isAuthenticated()) return Output.reject(res, Status.LOGIN_ALREADY_LOGINED);

    const body: LoginPayload = req.body;

    if (validator.isEmpty(body.email))
      return Output.reject(res, Status.LOGIN_EMPTY_EMAIL);

    if (validator.isEmpty(body.password))
      return Output.reject(res, Status.LOGIN_EMPTY_PASSWORD);


    body.email = validator.normalizeEmail(body.email) || '';

    const user = await User.getUser(body.email, body.password);
    if (!user)
      return Output.reject(res, Status.LOGIN_USER_NOT_FOUND);

    return req.login(user, error => {
      if (error) return next(error);
      return Output.resolve(res);
    });
  }

  public static async setup(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (!req.isAuthenticated()) return Output.reject(res, Status.SETUP_NOT_LOGINED);

    const body: SetupPayload = req.body;

    if (validator.isEmpty(body.nickname)) {
      return Output.reject(res, Status.LOGIN_EMPTY_EMAIL);
    }

    body.nickname = body.nickname.trim();

    if (validator.isLength(body.nickname, { min: 24 })) {
      return Output.reject(res, Status.SETUP_TOO_LONG_NICKNAME);
    }

    const user = req.user as UserDocument;
    user.nickname = body.nickname;

    return user
      .save()
      .then(() => Output.resolve(res))
      .catch(e => next(e));
  }
}
