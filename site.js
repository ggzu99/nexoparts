// Efecto de iluminación: el fondo se ilumina levemente siguiendo el mouse
(function () {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;
  let raf = null;
  window.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      spotlight.style.setProperty('--x', e.clientX + 'px');
      spotlight.style.setProperty('--y', e.clientY + 'px');
      spotlight.style.opacity = '1';
      raf = null;
    });
  });
  window.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
})();

// Menú móvil
(function () {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }
})();
