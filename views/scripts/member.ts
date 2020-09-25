import SignupManager from './page/signup';

const buttons = document.querySelectorAll<HTMLButtonElement>('button.action');

if (buttons.length) {
  buttons.forEach(button =>
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      if (type === 'signup') {
        const manager = new SignupManager();
        manager.signup();
      }
    })
  );
}
