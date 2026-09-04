/* ========================================
   SMART RESUME VIEWER - Modal, Zoom, Print
   ======================================== */

(function () {
  'use strict';

  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeBtn');
  const closeBindings = document.querySelectorAll('[data-resume-close]');
  const frame = document.getElementById('resumeFrame');
  const zoomInBtn = document.getElementById('resumeZoomIn');
  const zoomOutBtn = document.getElementById('resumeZoomOut');
  const zoomLevel = document.getElementById('resumeZoomLevel');
  const printBtn = document.getElementById('resumePrintBtn');

  if (!modal || !frame) return;

  let zoom = 1;
  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.resume-modal-content').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function setZoom(next) {
    zoom = Math.min(Math.max(next, 0.5), 2);
    frame.style.transform = `scale(${zoom})`;
    frame.style.width = `${(100 / zoom)}%`;
    frame.style.height = `${(100 / zoom)}%`;
    if (zoomLevel) zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
    modal.querySelector('.resume-modal-body').scrollTop = 0;
  }

  function printResume() {
    const win = window.open('assets/resume.pdf', '_blank');
    if (win) {
      win.addEventListener('load', () => {
        setTimeout(() => {
          win.print();
        }, 300);
      });
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);

  closeBindings.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === '+') setZoom(zoom + 0.1);
    if (e.key === '-') setZoom(zoom - 0.1);
  });

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(zoom + 0.1));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(zoom - 0.1));
  if (printBtn) printBtn.addEventListener('click', printResume);
})();