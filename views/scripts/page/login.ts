import Communicate, { Response } from '../module/communicate';
import Util from '../util';

class LoginManager {
  private communicate: Communicate;

  constructor() {
    this.communicate = new Communicate();
  }

  async login() {
    const email = Util.input('email');
    const password = Util.input('password');
    const response = await this.communicate.send<Response>('/api/login', {
      email,
      password,
    });

    const status = response.status;

    if (!response.resolved) {
      return alert(`Signup failed [${status}]`);
    }

    alert('Success!');
  }
}

const loginManager = new LoginManager();

Util.id<HTMLButtonElement>('login').addEventListener('click', () => {
  void loginManager.login();
});
