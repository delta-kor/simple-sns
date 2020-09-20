import { EventEmitter } from 'events';

export class AppEvent extends EventEmitter {
  public emit(event: 'deploy', port: number): boolean;

  public on(event: 'deploy', listener: (port: number) => void): this;

  public once(event: 'deploy', listener: (port: number) => void): this;
}
