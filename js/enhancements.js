

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var heroSubtitle = document.getElementById('hero-subtitle');
  var subtitleText = heroSubtitle ? heroSubtitle.textContent : '';
  if (!prefersReducedMotion && heroSubtitle) {
    heroSubtitle.textContent = '';
  }

  /**
   * Oculta e remove a sobreposição de carregamento (loading overlay) da página.
   */
  function removeLoadingOverlay() {
    var overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    overlay.classList.add('loading-overlay--hidden');
    setTimeout(function () {
      overlay.remove();
    }, 600);
  }

  /**
   * Anima um elemento numérico de 0 até ao valor alvo.
   * @param {HTMLElement} el - O elemento HTML onde o número será exibido.
   * @param {number} target - O valor numérico final a alcançar.
   * @param {string} suffix - O sufixo a adicionar ao número (ex: '+', '%').
   * @param {number} duration - A duração da animação em milissegundos.
   */
  function animateCounter(el, target, suffix, duration) {
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeOut = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(easeOut * target) + (suffix || '');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + (suffix || '');
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Inicializa e observa os contadores na página para animá-los ao aparecerem na vista.
   */
  function initCounters() {
    var counters = document.querySelectorAll('.stats__number');
    if (counters.length === 0) return;

    if (prefersReducedMotion) {
      counters.forEach(function (c) {
        c.textContent = c.getAttribute('data-count') + (c.getAttribute('data-suffix') || '');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var items = entry.target.querySelectorAll('.stats__number');
            items.forEach(function (counter, i) {
              setTimeout(function () {
                animateCounter(
                  counter,
                  parseInt(counter.getAttribute('data-count'), 10),
                  counter.getAttribute('data-suffix') || '',
                  1500
                );
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      var statsEl = document.querySelector('.stats');
      if (statsEl) observer.observe(statsEl);
    } else {
      counters.forEach(function (c) {
        c.textContent = c.getAttribute('data-count') + (c.getAttribute('data-suffix') || '');
      });
    }
  }

  /**
   * Inicia o efeito de digitação automática no subtítulo da secção principal (hero).
   */
  function startTypingEffect() {
    if (prefersReducedMotion || !heroSubtitle || !subtitleText) return;

    heroSubtitle.classList.add('hero__subtitle--visible');
    heroSubtitle.style.opacity = '0.9';
    heroSubtitle.style.transform = 'translateY(0)';
    heroSubtitle.classList.add('typing-active');

    var i = 0;
    var interval = setInterval(function () {
      if (i < subtitleText.length) {
        heroSubtitle.textContent += subtitleText.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        heroSubtitle.classList.remove('typing-active');
      }
    }, 45);
  }

  /**
   * Inicializa os melhoramentos da interface do utilizador.
   */
  function init() {
    setTimeout(removeLoadingOverlay, 400);
    setTimeout(startTypingEffect, 1000);
    initCounters();
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
