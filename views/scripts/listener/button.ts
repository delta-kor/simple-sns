document.querySelectorAll('.link').forEach((e: HTMLButtonElement) => {
  const href = e.getAttribute('data-href');
  if (!href) return false;
  e.addEventListener('click', () => (location.href = href));
});

document.querySelectorAll('.back').forEach((e: HTMLButtonElement) => {
  e.addEventListener('click', () => window.history.back());
});
