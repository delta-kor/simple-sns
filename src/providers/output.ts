import { Response } from 'express';

export enum Status {
  SUCCESS = 0,
  NOT_FOUND = 1000,
  CSRF_ERROR = 1001,
  SERVER_ERROR = 1002,
  CRYPTO_INVALID_BODY_TYPE = -500,
  CRYPTO_INVALID_PARAMS = -501,
  CRYPTO_INVALID_TICKET = -502,
  CRYPTO_INVALID_HMAC = -503,
  CRYPTO_INVALID_JSON = -504,
}

export default class Output {
  static resolve(
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

  static reject(res: Response, status: Status, message?: string): void {
    res.json({
      resolved: false,
      status,
      message,
    });
  }
}
