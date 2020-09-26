import crypto from 'crypto';
import axios, { Method } from 'axios';
import Util from '../util';

interface Payload {
  iv: string;
  key: string;
  cipher: string;
  hash: string;
}

export default class Communicate {
  private readonly key: Buffer;

  constructor() {
    const key = Util.input('key');
    if (!key) throw new Error('Key is not resolved');

    this.key = Buffer.from(key, 'base64');
  }

  private encrypt(payload: any): Payload {
    if (typeof payload === 'object') payload = JSON.stringify(payload);
    payload = payload.toString();

    const encryptionKey = crypto.randomBytes(32);
    const encryptionIv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, encryptionIv);
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const keyEncrypted = crypto.publicEncrypt(this.key, encryptionKey);

    const hmac = crypto.createHmac('sha256', encryptionKey);
    hmac.update(payload);
    const hash = hmac.digest('base64');

    return {
      iv: encryptionIv.toString('base64'),
      key: keyEncrypted.toString('base64'),
      cipher: encrypted,
      hash,
    };
  }

  async send<T>(url: string, payload: any, method: Method = 'POST'): Promise<T> {
    payload = this.encrypt(payload);
    const response = await axios({
      url,
      method,
      data: payload,
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  }
}