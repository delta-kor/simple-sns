declare global {
  namespace Express {
    interface Request {
      ticket: TicketValue;
    }

    interface Session {
      csrfSecret: string;
    }
  }
}

export {};
