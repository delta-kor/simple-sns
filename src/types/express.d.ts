declare global {
  namespace Express {
    interface Session {
      csrfSecret: string;
      ticket: TicketValue;
    }
  }
}

export {};
