/* ========================================
   CONTACT FORM - Validation + Formspree
   ======================================== */

(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = form ? form.querySelector('.form-submit') : null;
  const FORMSPREE_URL = 'https://formspree.io/f/xvkorzdk';

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

  function setLoading(loading) {
    if (!submitBtn) return;
    if (loading) {
      submitBtn.classList.add('form-submit--loading');
      submitBtn.disabled = true;
      submitBtn._originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
    } else {
      submitBtn.classList.remove('form-submit--loading');
      submitBtn.disabled = false;
      if (submitBtn._originalText) {
        submitBtn.innerHTML = submitBtn._originalText;
      }
    }
  }

  function showMessage(type, text) {
    status.innerHTML = '';
    status.classList.remove('form-success', 'form-error');

    if (type === 'success') {
      const check = document.createElement('span');
      check.className = 'success-check';
      check.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      status.appendChild(check);
      status.appendChild(document.createTextNode(text));
      status.classList.add('form-success');
      form.reset();
    } else {
      status.textContent = text;
      status.classList.add('form-error');
    }

    setTimeout(() => {
      status.classList.remove('form-success', 'form-error');
      status.innerHTML = '';
    }, 6000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const formData = new FormData(form);
    formData.append('_subject', `Portfolio enquiry from ${nameInput.value.trim()}`);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        showMessage('success', 'Message sent successfully. Thanks for reaching out!');
      } else {
        const data = await response.json().catch(() => null);
        const errMsg = (data && data.errors) ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again.';
        showMessage('error', errMsg);
      }
    } catch {
      showMessage('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  });

  [nameInput, emailInput, typeSelect, messageInput, companyInput].forEach((input) => {
    if (input) input.addEventListener('input', () => clearInvalid(input));
  });
})();
