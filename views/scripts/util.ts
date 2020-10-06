export default class Util {
  public static id<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
  }

  public static input(id: string): string | null {
    const element = Util.id<HTMLInputElement>(id);
    return element ? element.value : null;
  }
}
