(() => {
  const body = document.body;
  const menuButton = document.querySelector('.menu-btn');
  const nav = document.querySelector('.site-header nav');

  if (!menuButton || !nav) return;

  const setMenuState = (isOpen) => {
    body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    menuButton.textContent = isOpen ? '×' : '☰';
  };

  menuButton.removeAttribute('onclick');
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.addEventListener('click', () => {
    setMenuState(!body.classList.contains('menu-open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) setMenuState(false);
  });
})();
