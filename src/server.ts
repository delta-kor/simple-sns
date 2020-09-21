import App from './app';
import Log from './utils/log';

const app = new App(3000);

app.on('init', () => {
  Log.info('Initializing app');
});

app.on('mount_middleware', middlewares => {
  Log.info(`${middlewares} Middlewares mounted`);
});

app.on('mount_route', () => {
  Log.info('Routes mounted');
});

app.on('ready', () => {
  Log.info('App ready');
});

app.on('deploy', port => {
  Log.success(`Started in port ${port}`);
});

app.init();
app.start();
