import App from './app';
import Log from './utils/log';

const app = new App(3000);

app.on('init', () => {
  Log.info('Initialized app');
});

app.on('mount_middleware', (middlewares: number) => {
  Log.info(`${middlewares} middlewares mounted`);
});

app.on('deploy', port => {
  Log.success(`Started in port ${port}`);
});

app.init();
app.start();
