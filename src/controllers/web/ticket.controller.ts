import { NextFunction, Request, Response } from 'express';
import Ticket from '../../providers/ticket';

export default class TicketController {
  static async book(req: Request, res: Response, next: NextFunction) {
    req.ticket = await Ticket.book();
    return next();
  }
}
