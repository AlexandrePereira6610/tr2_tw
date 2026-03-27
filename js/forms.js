

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

  /**
   * Exibe uma mensagem de erro para um campo de formulário.
   * @param {HTMLElement} input - O elemento de entrada (input) com erro.
   * @param {HTMLElement} errorSpan - O elemento onde a mensagem será mostrada.
   * @param {string} message - A mensagem de erro a exibir.
   */
  function showError(input, errorSpan, message) {
    input.classList.add('form-group__input--error');
    input.classList.remove('form-group__input--success');
    errorSpan.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  /**
   * Remove a indicação de erro e marca o campo como válido.
   * @param {HTMLElement} input - O elemento de entrada (input) válido.
   * @param {HTMLElement} errorSpan - O elemento de erro correspondente.
   */
  function showSuccess(input, errorSpan) {
    input.classList.remove('form-group__input--error');
    input.classList.add('form-group__input--success');
    errorSpan.textContent = '';
    input.setAttribute('aria-invalid', 'false');
  }

  /**
   * Limpa a validação de um campo (remove as classes de erro/sucesso).
   * @param {HTMLElement} input - O elemento de entrada (input) a limpar.
   * @param {HTMLElement} errorSpan - O elemento de erro correspondente.
   */
  function clearValidation(input, errorSpan) {
    input.classList.remove('form-group__input--error', 'form-group__input--success');
    errorSpan.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  /**
   * Valida um campo específico com base numa regra definida.
   * @param {HTMLElement} input - O elemento de entrada (input) a validar.
   * @param {HTMLElement} errorSpan - O elemento para mostrar a mensagem de erro.
   * @param {string} ruleType - O tipo de regra a aplicar ('required', 'email', etc).
   * @returns {boolean} Verdade se o campo for válido, falso caso contrário.
   */
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

  /**
   * Configura a validação e submissão de um formulário.
   * @param {Object} config - Configuração do formulário.
   * @param {string} config.formId - O ID do formulário HTML.
   * @param {string} config.successId - O ID do elemento a mostrar em caso de sucesso.
   * @param {Object[]} config.fields - A lista de campos a validar e suas regras.
   */
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

  /**
   * Simula a submissão de um formulário com um estado de carregamento e mensagem de sucesso.
   * @param {HTMLElement} form - O formulário submetido.
   * @param {HTMLElement} successEl - O elemento a exibir no sucesso.
   */
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
      { inputId: 'c-fname', errorId: 'c-fname-error', rule: 'required' },
      { inputId: 'c-lname', errorId: 'c-lname-error', rule: 'required' },
      { inputId: 'c-email', errorId: 'c-email-error', rule: 'email' },
      { inputId: 'c-message', errorId: 'c-message-error', rule: 'message' },
      { inputId: 'contact-assunto', errorId: 'contact-assunto-error', rule: 'select' }
    ]
  });

  /**
   * Preenchimento automático da mensagem baseado no assunto selecionado
   */
  var assuntoSelect = document.getElementById('contact-assunto');
  var messageArea = document.getElementById('c-message');

  if (assuntoSelect && messageArea) {
    var autoFillTexts = {
      'investigacao': 'Gostaria de obter mais informações sobre os projetos de investigação em curso...',
      'ensino': 'Estou interessado(a) nas oportunidades de ensino e formação técnica...',
      'parcerias': 'Gostaríamos de propor uma parceria institucional no âmbito de...',
      'esaude': 'Procuro saber mais sobre as soluções de telemedicina e e-Saúde disponibilizadas...',
      'info': 'Gostaria de solicitar informações gerais sobre o Centro Académico Clínico...',
      'outro': ''
    };

    assuntoSelect.addEventListener('change', function() {
      var selected = this.value;
      if (selected && autoFillTexts[selected] !== undefined) {
        var currentText = messageArea.value.trim();
        var isAutoFilled = Object.values(autoFillTexts).some(function(text) { 
          return text !== '' && currentText === text; 
        });
        
        if (currentText === '' || isAutoFilled) {
          messageArea.value = autoFillTexts[selected];
        }
      }
    });
  }

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
