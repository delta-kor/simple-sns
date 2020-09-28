export default class Util {
  static id<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
  }

  static input(id: string): string | null {
    const element = Util.id<HTMLInputElement>(id);
    return element ? element.value : null;
  }
}
