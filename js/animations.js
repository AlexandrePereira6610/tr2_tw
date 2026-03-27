

  /**
   * Inicializa um fallback (alternativa) de revelação ao rolar
   * para browsers ou situações em que as bibliotecas GSAP num formato avançado
   * não possam ser carregadas.
   */
  function initScrollRevealFallback() {
    var animElements = document.querySelectorAll('[data-animate]');
    if (animElements.length === 0) return;

    document.body.classList.add('no-gsap');

    if (!('IntersectionObserver' in window)) {
      animElements.forEach(function (el) {
        el.classList.add('animated');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Anima um conjunto de elementos de um estado inicial para um estado final.
   * @param {string|NodeList|HTMLElement[]} targets - Seletor CSS ou coleção de elementos a animar.
   * @param {Object} fromVars - Propriedades iniciais da animação GSAP.
   * @param {Object} toVars - Propriedades finais da animação GSAP.
   */
  function animateElements(targets, fromVars, toVars) {
    var elements = typeof targets === 'string'
      ? document.querySelectorAll(targets)
      : targets;

    if (!elements || elements.length === 0) return;

    gsap.fromTo(elements, fromVars, toVars);
  }

  /**
   * Inicializa todas as animações baseadas no GSAP e ScrollTrigger.
   */
  function initGSAPAnimations() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      var allAnimated = document.querySelectorAll('[data-animate], .mission__card, .research__card, .chart-wrapper, .partners__item, .opportunities__card, .section__description, .section__title, .contact__info, .contact__form-wrapper, .newsletter-form');
      allAnimated.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      initScrollRevealFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    animateElements('.mission__card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mission',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    animateElements('.mission__expand-wrapper',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.mission__expand-wrapper',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );

    var chartWrapper = document.querySelector('.chart-wrapper');
    if (chartWrapper) {
      gsap.fromTo(chartWrapper,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chartWrapper,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    animateElements('#parceiros .section__description',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#parceiros',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    animateElements('.partners__item',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partners',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    animateElements('#oportunidades .section__description',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#oportunidades',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    animateElements('.opportunities__card',
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.opportunities',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    animateElements('#newsletter .section__description',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#newsletter',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    var newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      gsap.fromTo(newsletterForm,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: newsletterForm,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    var contactInfo = document.querySelector('.contact__info');
    var contactForm = document.querySelector('.contact__form-wrapper');

    if (contactInfo) {
      gsap.fromTo(contactInfo,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (contactForm) {
      gsap.fromTo(contactForm,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    var sectionTitles = document.querySelectorAll('.section__title');
    sectionTitles.forEach(function (title) {
      gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    var heroOverlay = document.querySelector('.hero__overlay');
    if (heroOverlay) {
      gsap.to(heroOverlay, {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        opacity: 0.3,
        ease: 'none'
      });
    }
  }

  if (document.readyState === 'complete') {
    initGSAPAnimations();
  } else {
    window.addEventListener('load', initGSAPAnimations);
  }
