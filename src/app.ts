import http, { Server } from 'http';
import express, { Application } from 'express';
import { AppEvent } from './types/event';

export default class App extends AppEvent {
  public port: number;
  private readonly application: Application;
  private readonly server: Server;

  constructor(port: number) {
    super();
    this.port = port;
    this.application = express();
    this.server = http.createServer(this.application);
  }

  start(): void {
    this.server.listen(this.port, () => this.emit('deploy', this.port));
  }
}
