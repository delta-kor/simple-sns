import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import Output, { Status } from '../../providers/output';

export default class CryptoController {
  static resolve(req: Request, res: Response, next: NextFunction): any {
    const body = req.body;
    if (typeof body !== 'object') {
      Output.reject(res, Status.CRYPTO_INVALID_BODY_TYPE);
      return false;
    }

    let { iv, key, cipher, hash } = body;
    if (!iv || !key || !cipher || !hash) {
      Output.reject(res, Status.CRYPTO_INVALID_PARAMS);
      return false;
    }

    iv = Buffer.from(iv, 'base64');
    key = Buffer.from(key, 'base64');

    const ticket = req.session.ticket;
    if (!ticket) {
      Output.reject(res, Status.CRYPTO_INVALID_TICKET);
      return false;
    }

    const encryptionKey = crypto.privateDecrypt(ticket.private, key);
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let payload = decipher.update(cipher, 'base64', 'utf8');
    payload += decipher.final('utf8');

    const hmac = crypto.createHmac('sha256', encryptionKey);
    hmac.update(payload);
    const verifyHash = hmac.digest('base64');

    if (hash !== verifyHash) {
      Output.reject(res, Status.CRYPTO_INVALID_HMAC);
      return false;
    }

    let data;

    try {
      data = JSON.parse(payload);
    } catch (e) {
      Output.reject(res, Status.CRYPTO_INVALID_JSON);
      return false;
    }

    req.body = data;

    next();
    return true;
  }
}
