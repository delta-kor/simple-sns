import { EventEmitter } from 'events';

declare class AppEvent extends EventEmitter {
  public emit(event: 'init'): boolean;
  public emit(event: 'ready'): boolean;
  public emit(event: 'deploy', port: number): boolean;
  public emit(event: 'mount_middleware', middlewares: number): boolean;
  public emit(event: 'mount_route'): boolean;

  public on(event: 'init', listener: () => void): this;
  public on(event: 'ready', listener: () => void): this;
  public on(event: 'deploy', listener: (port: number) => void): this;
  public on(event: 'mount_middleware', listener: (middlewares: number) => void): this;
  public on(event: 'mount_route', listener: () => void): this;

  public once(event: 'init', listener: () => void): this;
  public once(event: 'ready', listener: () => void): this;
  public once(event: 'deploy', listener: (port: number) => void): this;
  public once(event: 'mount_middleware', listener: (middlewares: number) => void): this;
  public once(event: 'mount_route', listener: () => void): this;
}
