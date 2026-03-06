(function () {
  'use strict';

  var header = document.getElementById('header');

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mainNav = document.getElementById('main-nav');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('header__nav--open');
      hamburgerBtn.classList.toggle('header__hamburger--active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('.header__nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('header__nav--open');
        hamburgerBtn.classList.remove('header__hamburger--active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('header__nav--open') &&
          !mainNav.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        mainNav.classList.remove('header__nav--open');
        hamburgerBtn.classList.remove('header__hamburger--active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('header__nav--open')) {
        mainNav.classList.remove('header__nav--open');
        hamburgerBtn.classList.remove('header__hamburger--active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburgerBtn.focus();
      }
    });
  }

  var scrollTopBtn = document.getElementById('scroll-top-btn');

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('scroll-top--visible');
      scrollTopBtn.hidden = false;
    } else {
      scrollTopBtn.classList.remove('scroll-top--visible');
      setTimeout(function () {
        if (!scrollTopBtn.classList.contains('scroll-top--visible')) {
          scrollTopBtn.hidden = true;
        }
      }, 350);
    }
  }

  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  var btnMissaoMais = document.getElementById('btn-missao-mais');
  var missaoExtra = document.getElementById('missao-extra');

  if (btnMissaoMais && missaoExtra) {
    btnMissaoMais.addEventListener('click', function () {
      var isExpanded = missaoExtra.classList.toggle('mission__extra--visible');

      btnMissaoMais.classList.toggle('btn--expanded');
      btnMissaoMais.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      missaoExtra.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');

      var spanEl = btnMissaoMais.querySelector('span');
      if (spanEl) {
        spanEl.textContent = isExpanded ? 'Ver Menos' : 'Saber Mais';
      }
    });

    btnMissaoMais.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btnMissaoMais.click();
      }
    });
  }

  var researchCards = document.querySelectorAll('.research__card');

  researchCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      var rotateX = ((y - centerY) / centerY) * -5;
      var rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = 'translateY(-8px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.focus();
      }
    });
  });

  var opportunityCards = document.querySelectorAll('.opportunities__card');

  opportunityCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();

      var ripple = document.createElement('span');
      ripple.style.cssText =
        'position:absolute;border-radius:50%;background:rgba(30,86,208,0.15);' +
        'transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;';

      var rect = card.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      card.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 600);

      showNotification('Esta funcionalidade estará disponível em breve.');
    });
  });

  var rippleStyle = document.createElement('style');
  rippleStyle.textContent =
    '@keyframes ripple {' +
    '  to { transform: scale(4); opacity: 0; }' +
    '}';
  document.head.appendChild(rippleStyle);

  function showNotification(message, type) {
    type = type || 'info';

    var existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast-notification toast-notification--' + type;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    toast.style.cssText =
      'position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(100px);' +
      'background:#1f2937;color:#fff;padding:14px 28px;border-radius:12px;font-size:14px;' +
      'font-family:Inter,sans-serif;font-weight:500;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.2);' +
      'transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),opacity 0.4s ease;opacity:0;';

    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(function () {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 3000);
  }

  function animateHeroEntrance() {
    var title = document.getElementById('hero-title');
    var subtitle = document.getElementById('hero-subtitle');
    var cta = document.getElementById('hero-cta');

    setTimeout(function () {
      if (title) title.classList.add('hero__title--visible');
    }, 300);

    setTimeout(function () {
      if (subtitle) subtitle.classList.add('hero__subtitle--visible');
    }, 500);

    setTimeout(function () {
      if (cta) cta.classList.add('hero__cta--visible');
    }, 700);
  }

  if (document.readyState === 'complete') {
    animateHeroEntrance();
  } else {
    window.addEventListener('load', animateHeroEntrance);
  }

  var navLinks = document.querySelectorAll('.header__nav-link');
  var sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var activeId = entry.target.id;
          navLinks.forEach(function (link) {
            var linkHref = link.getAttribute('href');
            if (linkHref === '#' + activeId) {
              link.classList.add('header__nav-link--active');
            } else {
              link.classList.remove('header__nav-link--active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var questionBtn = item.querySelector('.faq__question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');

      faqItems.forEach(function (other) {
        other.classList.remove('faq__item--open');
        var otherBtn = other.querySelector('.faq__question');
        var otherAnswer = other.querySelector('.faq__answer');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        item.classList.add('faq__item--open');
        questionBtn.setAttribute('aria-expanded', 'true');
        var answer = item.querySelector('.faq__answer');
        if (answer) answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

  var testimonialItems = document.querySelectorAll('.testimonials__item');
  var testimonialDots = document.querySelectorAll('.testimonials__dot');
  var currentTestimonial = 0;
  var testimonialTimer = null;

  function showTestimonial(index) {
    testimonialItems.forEach(function (item, i) {
      item.classList.toggle('testimonials__item--active', i === index);
    });
    testimonialDots.forEach(function (dot, i) {
      dot.classList.toggle('testimonials__dot--active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    currentTestimonial = index;
  }

  if (testimonialItems.length > 0) {
    testimonialDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = parseInt(dot.getAttribute('data-index'), 10);
        showTestimonial(index);
        restartTestimonialTimer();
      });
    });

    function startTestimonialTimer() {
      testimonialTimer = setInterval(function () {
        showTestimonial((currentTestimonial + 1) % testimonialItems.length);
      }, 6000);
    }

    function restartTestimonialTimer() {
      if (testimonialTimer) clearInterval(testimonialTimer);
      startTestimonialTimer();
    }

    startTestimonialTimer();
  }

  var teamCards = document.querySelectorAll('.team__card');

  teamCards.forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('team__card--flipped');
      }
    });
  });

})();
