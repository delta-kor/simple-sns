import Util from '../util';
import Communicate, { Response } from '../module/communicate';
import { Status } from '../../../src/providers/output';

export default class SignupManager {
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
      alert('Invalid email');
      return false;
    }

    if (status === Status.SIGNUP_SHORT_PASSWORD) {
      alert('Password must be more than 8 characters');
      return false;
    }

    if (status === Status.SIGNUP_PASSWORD_UNMATCH) {
      alert('Password unmatched');
      return false;
    }
  }
}
