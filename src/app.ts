import http, { Server } from 'http';
import { EventEmitter } from 'events';
import express, { Application } from 'express';
import Kernel from './middlewares/kernel';
import ApiRouter from './routes/api';
import WebRouter from './routes/web';
import Exception from './providers/exception';
import Database from './providers/database';

export declare interface App {
  emit<E extends keyof AppEvent>(event: E, ...args: Parameters<AppEvent[E]>): boolean;
  on<E extends keyof AppEvent>(event: E, listener: AppEvent[E]): this;
  once<E extends keyof AppEvent>(event: E, listener: AppEvent[E]): this;
}

export class App extends EventEmitter {
  public port: number;
  private readonly application: Application;
  private readonly server: Server;

  constructor(port: number) {
    super();
    this.port = port;
    this.application = express();
    this.server = http.createServer(this.application);
  }

  private mountMiddlewares(): void {
    const length = Kernel.mount(this.application);
    this.emit('mount_middleware',  length);
  }

  private async loadDatabase(): Promise<void> {
    await Database.load();
    this.emit('load_database');
  }

  private mountRoutes(): void {
    this.application.use('/api', ApiRouter);
    this.application.use(WebRouter);
    Exception.load(this.application);
    this.emit('mount_route');
  }

  public async init(): Promise<void> {
    this.emit('init');
    this.mountMiddlewares();
    await this.loadDatabase();
    this.mountRoutes();
    this.emit('ready');
  }

  public start(): void {
    this.server.listen(this.port, () => this.emit('deploy', this.port));
  }
}
