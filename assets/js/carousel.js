// Swiper.JS initialization configurations

export function initCarousels() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded. Swiping components will fall back to CSS overflow scroll.');
    return;
  }

  // 1. Hero 3D slides Carousel
  const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
    }
  });

  // Pause Hero Slider autoplay if screen-reader or keyboard user focuses on controls
  const heroEl = document.querySelector('.hero-slider');
  if (heroEl && heroSlider.autoplay) {
    heroEl.addEventListener('focusin', () => {
      heroSlider.autoplay.stop();
    });
    heroEl.addEventListener('focusout', () => {
      heroSlider.autoplay.start();
    });
  }

  const autoplayBtn = document.querySelector('.hero-autoplay-toggle');
  if (autoplayBtn && heroSlider.autoplay) {
    autoplayBtn.addEventListener('click', () => {
      const running = heroSlider.autoplay.running;
      if (running) heroSlider.autoplay.stop(); else heroSlider.autoplay.start();
      autoplayBtn.setAttribute('aria-pressed', String(running));
      autoplayBtn.setAttribute('aria-label', running ? 'Play slideshow' : 'Pause slideshow');
      autoplayBtn.querySelector('.icon-pause').hidden = running;
      autoplayBtn.querySelector('.icon-play').hidden = !running;
    });
  }

  // 2. Trusted Brands marquee slider
  const brandsSlider = new Swiper('.brands-slider', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    breakpoints: {
      480: { slidesPerView: 3, spaceBetween: 30 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: 5, spaceBetween: 50 }
    }
  });

  // Pause Brand Slider if user has prefers-reduced-motion active
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && brandsSlider.autoplay) {
    brandsSlider.autoplay.stop();
  }

  // 3. Testimonials Swiper Slider
  new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },
    pagination: {
      el: '.swiper-pagination-testimonials',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 40 }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }
  });
}


