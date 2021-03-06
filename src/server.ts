import { App } from './app';
import Log from './utils/log';

const app = new App();

app.on('init', () => {
  Log.info('Initializing app');
});

app.on('mount_middleware', middlewares => {
  Log.info(`Total ${middlewares} middlewares mounted`);
});

app.on('load_database', () => {
  Log.info('Database loaded');
});

app.on('mount_route', () => {
  Log.info('Routes mounted');
});

app.on('ready', () => {
  Log.info('App ready');
  app.start();
});

app.on('deploy', port => {
  Log.success(`Deployed server in port ${port}`);
  Log.success('Initialized app');
});

app.init();
