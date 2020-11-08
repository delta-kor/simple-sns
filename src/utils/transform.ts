export default class Transform {
  public static encode(target: string): string {
    return Buffer.from(target, 'utf-8').toString('base64');
  }

  public static decode(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
}
