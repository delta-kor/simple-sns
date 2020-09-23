declare interface AppEvent {
  init: () => void;
  ready: () => void;
  deploy: (port: number) => void;
  mount_middleware: (middlewares: number) => void;
  load_database: () => void;
  mount_route: () => void;
}
