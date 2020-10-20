import crypto from 'crypto';

export default class Ticket {
  public static book(): Promise<TicketValue> {
    return new Promise<TicketValue>((resolve, reject) => {
      crypto.generateKeyPair(
        'rsa',
        {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
          },
        },
        (err, publicKey, privateKey) => {
          if (err) return reject(err);
          return resolve({
            public: publicKey.toString(),
            private: privateKey.toString(),
          });
        }
      );
    });
  }
}
