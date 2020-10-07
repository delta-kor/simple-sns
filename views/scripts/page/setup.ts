import Communicate, { Response } from '../module/communicate';
import Util from '../util';

class SetupManager {
  private communicate: Communicate;

  constructor() {
    this.communicate = new Communicate();
  }

  async setup(): Promise<any> {
    const nickname = Util.input('nickname');
    const response = await this.communicate.send<Response>('/api/setup', {
      nickname,
    });

    const status = response.status;

    if (!response.resolved) {
      return alert(`Setup failed [${status}]`);
    }

    location.href = new URLSearchParams(location.search).get('go') || '/';
  }
}

const setupManager = new SetupManager();

Util.id<HTMLButtonElement>('setup').addEventListener('click', () => {
  void setupManager.setup();
});
