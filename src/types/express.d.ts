declare global {
  namespace Express {
    interface Request {
      ticket: TicketValue;
    }
  }
}

export {};
