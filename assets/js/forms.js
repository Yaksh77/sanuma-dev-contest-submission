// Forms validation, accessibility, honeypot protection, and submit hooks

export function initForms() {
  const forms = document.querySelectorAll('form');

  // Create accessibility live region for form errors if it doesn't exist
  let liveRegion = document.getElementById('form-live-announcer');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'form-live-announcer';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm(form, liveRegion)) {
        submitForm(form);
      }
    });

    // Clear validation borders on typing
    form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) {
          group.classList.remove('has-error');
          const errorLabel = group.querySelector('.form-error');
          if (errorLabel) errorLabel.remove();
        }
      });
    });
  });
}

function validateForm(form, announcer) {
  let isValid = true;
  let errorMessages = [];

  // Reset all previous errors
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('has-error');
    const label = group.querySelector('.form-error');
    if (label) label.remove();
  });

  // Check honeypot spam protection
  const honeypot = form.querySelector('.honeypot-field input');
  if (honeypot && honeypot.value.trim() !== '') {
    console.warn('Spam submission detected via honeypot.');
    // Fail silently to confuse the spam bot
    form.reset();
    return false;
  }

  // Validate required fields
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach((input, index) => {
    const value = input.value.trim();
    const group = input.closest('.form-group');
    const labelText = group?.querySelector('.form-label')?.textContent?.replace('*', '')?.trim() || 'Field';

    let isFieldValid = true;
    let message = '';

    if (value === '') {
      isFieldValid = false;
      message = `${labelText} is required.`;
    } else if (input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        isFieldValid = false;
        message = `Please enter a valid email address for ${labelText}.`;
      }
    }

    if (!isFieldValid) {
      isValid = false;
      errorMessages.push(message);

      if (group) {
        group.classList.add('has-error');

        // Add dynamic error label
        const errorId = `error-${input.id || 'field-' + index}`;
        const errorSpan = document.createElement('span');
        errorSpan.id = errorId;
        errorSpan.className = 'form-error';
        errorSpan.textContent = message;

        group.appendChild(errorSpan);
        input.setAttribute('aria-describedby', errorId);
      }
    } else if (group) {
      group.classList.add('has-success');
    }
  });

  // Announce errors to screen readers via live region
  if (errorMessages.length > 0) {
    announcer.textContent = `Form submission failed with ${errorMessages.length} errors: ${errorMessages.join(' ')}`;
    // Focus the first invalid field
    const firstInvalid = form.querySelector('.has-error .form-input, .has-error .form-textarea');
    if (firstInvalid) firstInvalid.focus();
  }

  return isValid;
}

function submitForm(form) {
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) {
    submitBtn.classList.add('btn--loading');
    submitBtn.setAttribute('disabled', 'true');
  }

  // Extract form inputs
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Simulate remote submit transition
  setTimeout(() => {
    // Cache inside localStorage for verification/manual testing
    const submissions = JSON.parse(localStorage.getItem('robuzta_form_submissions') || '[]');
    submissions.push({
      id: Date.now(),
      formId: form.id || 'newsletter-or-contact',
      data: data,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('robuzta_form_submissions', JSON.stringify(submissions));

    // Reset button states
    if (submitBtn) {
      submitBtn.classList.remove('btn--loading');
      submitBtn.removeAttribute('disabled');
    }

    // Success response UI
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success-banner';
    successMsg.style.padding = 'var(--space-4)';
    successMsg.style.marginTop = 'var(--space-4)';
    successMsg.style.backgroundColor = 'var(--clr-green-soft-tint)';
    successMsg.style.border = '1px solid var(--accent)';
    successMsg.style.borderRadius = 'var(--radius-md)';
    successMsg.style.color = 'var(--accent)';
    successMsg.style.fontWeight = 'var(--fw-semibold)';
    successMsg.style.textAlign = 'center';
    successMsg.innerHTML = `<p style="color: var(--text-primary); font-size: var(--fs-200); margin:0;"><strong>Thank you!</strong> Your submission has been received successfull. We'll be in touch within 1 business day.</p>`;

    form.appendChild(successMsg);
    form.reset();

    // Remove success banner after 5 seconds
    setTimeout(() => {
      successMsg.remove();
    }, 7000);

  }, 1200);
}
