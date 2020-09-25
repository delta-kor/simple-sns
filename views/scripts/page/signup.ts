import Util from '../util';

export default class SignupManager {
  constructor() {}

  signup(): void {
    const email = Util.input('email');
    const password = Util.input('password');
    const confirm = Util.input('confirm');
  }
}
