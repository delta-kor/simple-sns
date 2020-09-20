import App from './app';
import Log from './utils/log';

const app = new App(3000);

app.on('deploy', port => {
  Log.success(`Started in port ${port}`);
});

app.start();
