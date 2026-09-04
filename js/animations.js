/* ========================================
   MICRO ANIMATIONS - Hero Reveal · Magnetic
   Buttons · Number Counters · Cursor Glow
   ======================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // HERO TITLE CHARACTER REVEAL
  // ========================================

  function heroCharReveal() {
    if (!prefersReducedMotion) {
      const title = document.querySelector('.hero-title');
      if (!title || title.classList.contains('char-reveal')) return;

      const nodes = Array.from(title.childNodes);
      title.textContent = '';
      title.classList.add('char-reveal');

      let index = 0;
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent.split('').forEach((ch) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.animationDelay = (index * 0.02 + 0.1) + 's';
            span.textContent = ch;
            title.appendChild(span);
            index++;
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const cls = node.className;
          node.textContent.split('').forEach((ch) => {
            const span = document.createElement('span');
            span.className = ('char ' + (cls || '')).trim();
            span.style.animationDelay = (index * 0.02 + 0.1) + 's';
            span.textContent = ch;
            title.appendChild(span);
            index++;
          });
        }
      });
    }
  }

  // ========================================
  // MAGNETIC BUTTONS (desktop pointer only)
  // ========================================

  function initMagneticButtons() {
    if (prefersReducedMotion) return;
    const magnetButtons = document.querySelectorAll('.magnetic-btn');

    magnetButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `translate(${x * 8}px, ${y * 10}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ========================================
  // NUMBER COUNTER (GitHub stats)
  // ========================================

  function animateCounters() {
    if (prefersReducedMotion) return;
    const nums = document.querySelectorAll('.stat-number[data-counter]');
    if (!nums.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const duration = 800;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach((num) => observer.observe(num));
  }

  // ========================================
  // CURSOR GLOW (desktop pointers only)
  // ========================================

  function initCursorGlow() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) return;

    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        glow.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      visible = false;
      glow.classList.remove('visible');
    });

    function loop() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glow.style.transform = `translate(${glowX - glow.offsetWidth / 2}px, ${glowY - glow.offsetHeight / 2}px)`;
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  // ========================================
  // INIT
  // ========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    heroCharReveal();
    initMagneticButtons();
    animateCounters();
    initCursorGlow();
  }
})();