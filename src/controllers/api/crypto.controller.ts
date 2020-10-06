import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import Output, { Status } from '../../providers/output';

export default class CryptoController {
  public static resolve(req: Request, res: Response, next: NextFunction): any {
    const body = req.body;
    if (typeof body !== 'object') {
      return Output.reject(res, Status.CRYPTO_INVALID_BODY_TYPE);
    }

    let { iv, key, cipher, hash } = body;
    if (!iv || !key || !cipher || !hash) {
      return Output.reject(res, Status.CRYPTO_INVALID_PARAMS);
    }

    iv = Buffer.from(iv, 'base64');
    key = Buffer.from(key, 'base64');

    const ticket = req.session.ticket;
    if (!ticket) {
      return Output.reject(res, Status.CRYPTO_INVALID_TICKET);
    }

    const encryptionKey = crypto.privateDecrypt(ticket.private, key);
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let payload = decipher.update(cipher, 'base64', 'utf8');
    payload += decipher.final('utf8');

    const hmac = crypto.createHmac('sha256', encryptionKey);
    hmac.update(payload);
    const verifyHash = hmac.digest('base64');

    if (hash !== verifyHash) {
      return Output.reject(res, Status.CRYPTO_INVALID_HMAC);
    }

    let data;

    try {
      data = JSON.parse(payload);
    } catch (e) {
      return Output.reject(res, Status.CRYPTO_INVALID_JSON);
    }

    req.body = data;

    return next();
  }
}
