(function () {
  'use strict';

  var validationRules = {
    required: function (value) {
      var trimmed = value.trim();
      return {
        valid: trimmed.length >= 2,
        message: trimmed.length === 0
          ? 'Este campo é obrigatório.'
          : 'Introduza pelo menos 2 caracteres.'
      };
    },

    email: function (value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return {
        valid: emailRegex.test(value.trim()),
        message: 'Introduza um endereço de e-mail válido.'
      };
    },

    select: function (value) {
      return {
        valid: value.trim().length > 0,
        message: 'Selecione uma opção.'
      };
    },

    message: function (value) {
      var trimmed = value.trim();
      return {
        valid: trimmed.length >= 10,
        message: trimmed.length === 0
          ? 'Este campo é obrigatório.'
          : 'A mensagem deve ter pelo menos 10 caracteres.'
      };
    }
  };

  function showError(input, errorSpan, message) {
    input.classList.add('form-group__input--error');
    input.classList.remove('form-group__input--success');
    errorSpan.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function showSuccess(input, errorSpan) {
    input.classList.remove('form-group__input--error');
    input.classList.add('form-group__input--success');
    errorSpan.textContent = '';
    input.setAttribute('aria-invalid', 'false');
  }

  function clearValidation(input, errorSpan) {
    input.classList.remove('form-group__input--error', 'form-group__input--success');
    errorSpan.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  function validateField(input, errorSpan, ruleType) {
    var rule = validationRules[ruleType];
    if (!rule) return true;

    var result = rule(input.value);
    if (result.valid) {
      showSuccess(input, errorSpan);
    } else {
      showError(input, errorSpan, result.message);
    }
    return result.valid;
  }

  function setupFormValidation(config) {
    var form = document.getElementById(config.formId);
    var successEl = document.getElementById(config.successId);

    if (!form || !successEl) return;

    config.fields.forEach(function (field) {
      var input = document.getElementById(field.inputId);
      var errorSpan = document.getElementById(field.errorId);

      if (!input || !errorSpan) return;

      input.addEventListener('blur', function () {
        if (input.value.trim().length > 0) {
          validateField(input, errorSpan, field.rule);
        }
      });

      input.addEventListener('input', function () {
        if (input.classList.contains('form-group__input--error')) {
          clearValidation(input, errorSpan);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var firstInvalid = null;

      config.fields.forEach(function (field) {
        var input = document.getElementById(field.inputId);
        var errorSpan = document.getElementById(field.errorId);

        if (!input || !errorSpan) return;

        var fieldValid = validateField(input, errorSpan, field.rule);
        if (!fieldValid && isValid) {
          isValid = false;
          firstInvalid = input;
        }
      });

      if (!isValid) {
        if (firstInvalid) {
          firstInvalid.focus();
        }
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.style.animation = 'none';
          void submitBtn.offsetHeight;
          submitBtn.style.animation = 'shake 0.5s ease';
          setTimeout(function () {
            submitBtn.style.animation = '';
          }, 500);
        }
        return;
      }

      simulateSubmission(form, successEl);
    });
  }

  function simulateSubmission(form, successEl) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>A enviar...</span>';
    submitBtn.style.opacity = '0.7';

    setTimeout(function () {
      form.style.display = 'none';
      successEl.hidden = false;

      setTimeout(function () {
        form.reset();
        form.style.display = '';
        successEl.hidden = true;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        submitBtn.style.opacity = '';

        form.querySelectorAll('.form-group__input').forEach(function (input) {
          input.classList.remove('form-group__input--error', 'form-group__input--success');
          input.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('.form-group__error').forEach(function (span) {
          span.textContent = '';
        });
      }, 5000);
    }, 1500);
  }

  setupFormValidation({
    formId: 'newsletter-form',
    successId: 'newsletter-success',
    fields: [
      { inputId: 'newsletter-nome', errorId: 'newsletter-nome-error', rule: 'required' },
      { inputId: 'newsletter-email', errorId: 'newsletter-email-error', rule: 'email' },
      { inputId: 'newsletter-interesse', errorId: 'newsletter-interesse-error', rule: 'select' }
    ]
  });

  setupFormValidation({
    formId: 'contact-form',
    successId: 'contact-success',
    fields: [
      { inputId: 'contact-nome', errorId: 'contact-nome-error', rule: 'required' },
      { inputId: 'contact-email', errorId: 'contact-email-error', rule: 'email' },
      { inputId: 'contact-assunto', errorId: 'contact-assunto-error', rule: 'select' },
      { inputId: 'contact-mensagem', errorId: 'contact-mensagem-error', rule: 'message' }
    ]
  });

  var shakeStyle = document.createElement('style');
  shakeStyle.textContent =
    '@keyframes shake {' +
    '  0%, 100% { transform: translateX(0); }' +
    '  20% { transform: translateX(-8px); }' +
    '  40% { transform: translateX(8px); }' +
    '  60% { transform: translateX(-4px); }' +
    '  80% { transform: translateX(4px); }' +
    '}';
  document.head.appendChild(shakeStyle);

})();
