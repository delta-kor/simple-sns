import Util from '../util';
import Communicate from '../module/communicate';

export default class SignupManager {
  private communicate: Communicate;

  constructor() {
    this.communicate = new Communicate();
  }

  async signup(): Promise<void> {
    const email = Util.input('email');
    const password = Util.input('password');
    const confirm = Util.input('confirm');
    const response = await this.communicate.send('/api/signup', { email, password, confirm });
    console.log(response);
  }
}
