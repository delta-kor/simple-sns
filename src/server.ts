import App from './app';

const app = new App(3000);

app.on('deploy', port => {
  console.log(`Started in port ${port}`);
});

app.start();
