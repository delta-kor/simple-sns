import Util from '../util';
import Communicate, { Response } from '../module/communicate';
import { Status } from '../../../src/providers/output';

class SignupManager {
  private communicate: Communicate;

  constructor() {
    this.communicate = new Communicate();
  }

  async signup(): Promise<any> {
    const email = Util.input('email');
    const password = Util.input('password');
    const confirm = Util.input('confirm');
    const response = await this.communicate.send<Response>('/api/signup', {
      email,
      password,
      confirm,
    });

    const status = response.status;

    if (status === Status.SIGNUP_INVALID_EMAIL) {
      return alert('Invalid email');
    }

    if (status === Status.SIGNUP_SHORT_PASSWORD) {
      return alert('Password must be more than 8 characters');
    }

    if (status === Status.SIGNUP_PASSWORD_UNMATCH) {
      return alert('Password unmatched');
    }

    if (status === Status.SIGNUP_EXISTING_USER) {
      return alert('Email already exists');
    }

    if (!response.resolved) {
      return alert(`Signup failed [${status}]`);
    }

    location.href = new URLSearchParams(location.search).get('go') || '/';
  }
}

const signupManager = new SignupManager();

Util.id<HTMLButtonElement>('signup').addEventListener('click', () => {
  void signupManager.signup();
});
