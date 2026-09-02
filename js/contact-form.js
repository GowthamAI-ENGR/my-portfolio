/* ========================================
   CONTACT FORM — Validation + mailto + Success
   ======================================== */

(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const EMAIL_TO = 'gowtham120205@gmail.com';

  if (!form) return;

  const nameInput = document.getElementById('cf-name');
  const emailInput = document.getElementById('cf-email');
  const companyInput = document.getElementById('cf-company');
  const typeSelect = document.getElementById('cf-type');
  const messageInput = document.getElementById('cf-message');

  function setInvalid(input, message) {
    input.classList.add('field-invalid');
    let errEl = input.closest('.form-field').querySelector('.field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      input.closest('.form-field').appendChild(errEl);
    }
    errEl.textContent = message;
  }

  function clearInvalid(input) {
    input.classList.remove('field-invalid');
    const errEl = input.closest('.form-field').querySelector('.field-error');
    if (errEl) errEl.remove();
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      setInvalid(nameInput, 'Please enter your name.');
      valid = false;
    } else {
      clearInvalid(nameInput);
    }

    const emailVal = emailInput.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRe.test(emailVal)) {
      setInvalid(emailInput, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearInvalid(emailInput);
    }

    if (!typeSelect.value) {
      setInvalid(typeSelect, 'Please select a project type.');
      valid = false;
    } else {
      clearInvalid(typeSelect);
    }

    if (!messageInput.value.trim()) {
      setInvalid(messageInput, 'Please tell me about your project.');
      valid = false;
    } else {
      clearInvalid(messageInput);
    }

    return valid;
  }

  function showSuccess() {
    status.innerHTML = '';
    const check = document.createElement('span');
    check.className = 'success-check';
    check.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    status.appendChild(check);
    status.appendChild(document.createTextNode('Message sent successfully. Thanks for reaching out!'));
    status.classList.add('form-success');
    form.reset();
    setTimeout(() => {
      status.classList.remove('form-success');
      status.textContent = '';
    }, 6000);
  }

  function buildMailto() {
    const subject = encodeURIComponent(`Project enquiry from ${nameInput.value.trim()}${companyInput.value.trim() ? ' (' + companyInput.value.trim() + ')' : ''}`);
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\n` +
      `Email: ${emailInput.value.trim()}\n` +
      `Company / Organization: ${companyInput.value.trim() || 'N/A'}\n` +
      `Project Type: ${typeSelect.value}\n\n` +
      `Message:\n${messageInput.value.trim()}`
    );
    return `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.location.href = buildMailto();
    showSuccess();
  });

  [nameInput, emailInput, typeSelect, messageInput, companyInput].forEach((input) => {
    if (input) input.addEventListener('input', () => clearInvalid(input));
  });
})();