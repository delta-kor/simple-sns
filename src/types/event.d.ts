export interface AppEvent {
  init: () => void;
  ready: () => void;
  deploy: (port: number) => void;
  mount_middleware: (middlewares: number) => void;
  mount_route: () => void;
}
