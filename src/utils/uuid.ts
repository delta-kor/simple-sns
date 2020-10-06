import crypto from 'crypto';

export default class UUID {
  static generate(length: number = 16): string {
    return crypto.randomBytes(length / 2).toString('hex');
  }
}
