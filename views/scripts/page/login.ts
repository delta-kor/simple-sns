import Communicate, { Response } from '../module/communicate';
import Util from '../util';
import { Status } from '../../../src/providers/output';

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

    if (status === Status.LOGIN_EMPTY_EMAIL) {
      return alert('Please enter email');
    }

    if (status === Status.LOGIN_EMPTY_PASSWORD) {
      return alert('Please enter password');
    }

    if (status === Status.LOGIN_USER_NOT_FOUND) {
      return alert('Email or password not found');
    }

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
