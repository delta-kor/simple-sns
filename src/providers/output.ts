import { Response } from 'express';

export enum Status {
  SUCCESS = 0,
  NOT_FOUND = 1000,
  CSRF_ERROR = 1001,
  SERVER_ERROR = 1002,
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
