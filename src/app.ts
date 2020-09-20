import http, { Server } from 'http';
import express, { Application } from 'express';
import { AppEvent } from './types/event';
import Kernel from './middlewares/kernel';

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

  public init(): void {
    this.mountMiddlewares();
    this.emit('init');
  }

  private mountMiddlewares(): void {
    const middlewares = Kernel.mount(this.application);
    this.emit('mount_middleware', middlewares);
  }

  public start(): void {
    this.server.listen(this.port, () => this.emit('deploy', this.port));
  }
}
