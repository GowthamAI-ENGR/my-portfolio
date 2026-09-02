/* ========================================
   THEME CONTROLS — Dark / Light / System
   ======================================== */

(function () {
  const toggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'gr-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function getCurrentTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0B1120' : '#F1F5F9');
    }
  }

  function cycleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) { /* ignore */ }
    applyTheme(next);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', cycleTheme);
    applyTheme(getCurrentTheme());
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
    }
  });
})();