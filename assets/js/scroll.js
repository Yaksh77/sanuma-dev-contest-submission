// Scroll utilities and Lenis wrapper

let lenisInstance = null;

export function initScroll() {
  // Initialize Lenis smooth scroll from CDN if present
  if (typeof Lenis !== 'undefined') {
    // Only enable if user has not requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Connect Lenis to requestAnimationFrame
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Back to Top Button and Progress Bar
  const backToTopBtn = document.querySelector('.back-to-top');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update scroll progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrolled = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = `${scrolled}%`;
    }
    
    // Toggle Back to top button visibility
    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Smooth scroll back to top on click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}

export function getLenis() {
  return lenisInstance;
}
