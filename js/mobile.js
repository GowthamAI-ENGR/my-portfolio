/* ========================================
   MOBILE EXPERIENCE — Bottom Nav + Active states
   ======================================== */

(function () {
  'use strict';

  const winWidthQuery = window.matchMedia('(max-width: 768px)');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!mobileLinks.length) return;

  let ticking = false;

  function updateActiveLink() {
    const scrollY = window.scrollY + window.innerHeight * 0.3;
    let currentId = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.id;
      }
    });

    if (!currentId && window.scrollY < 100) {
      currentId = 'home';
    }

    mobileLinks.forEach((link) => {
      const linked = link.getAttribute('href').replace('#', '');
      if (linked === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateActiveLink();
})();