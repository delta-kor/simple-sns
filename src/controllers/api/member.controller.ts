import { Request, Response } from 'express';

export interface SignupPayload {
  email: string;
  password: string;
  confirm: string;
}

export default class MemberController {
  static signup(req: Request, res: Response): any {}
}
