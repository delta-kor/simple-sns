import { Response } from 'express';

export enum Status {
  SUCCESS = 0,
  SIGNUP_INVALID_EMAIL = 100,
  SIGNUP_SHORT_PASSWORD = 101,
  SIGNUP_PASSWORD_UNMATCH = 102,
  SIGNUP_EXISTING_USER = 103,
  SIGNUP_ALREADY_LOGINED = 104,
  LOGIN_EMPTY_EMAIL = 110,
  LOGIN_EMPTY_PASSWORD = 111,
  LOGIN_USER_NOT_FOUND = 112,
  LOGIN_ALREADY_LOGINED = 113,
  SETUP_NOT_LOGINED = 120,
  SETUP_EMPTY_NICKNAME = 121,
  SETUP_TOO_LONG_NICKNAME = 122,
  CRYPTO_INVALID_BODY_TYPE = 500,
  CRYPTO_INVALID_PARAMS = 501,
  CRYPTO_INVALID_TICKET = 502,
  CRYPTO_INVALID_HMAC = 503,
  CRYPTO_INVALID_JSON = 504,
  CRYPTO_ERROR = 505,
  NOT_FOUND = 1000,
  CSRF_ERROR = 1001,
  SERVER_ERROR = 1002,
}

export default class Output {
  public static resolve(
    res: Response,
    data?: any,
    status: Status = Status.SUCCESS,
    message?: string
  ): void {
    res.json({
      resolved: true,
      data,
      status,
      message,
    });
  }

  public static reject(res: Response, status: Status, message?: string): void {
    res.status(400);
    res.json({
      resolved: false,
      status,
      message,
    });
  }
}
