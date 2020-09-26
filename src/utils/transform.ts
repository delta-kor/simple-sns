export default class Transform {
  static encode(string: string): string {
    return Buffer.from(string, 'utf-8').toString('base64');
  }
  static decode(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
}
