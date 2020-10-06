import { NextFunction, Request, Response } from 'express';
import Ticket from '../../providers/ticket';

export default class TicketController {
  static async book(req: Request, res: Response, next: NextFunction) {
    req.session.ticket = await Ticket.book();
    req.session.save(err => {
      if (err) return next(err);
    });
    return next();
  }
}
