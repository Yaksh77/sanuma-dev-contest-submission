// Shared IntersectionObserver for animations and counters

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -10% 0px', // Trigger slightly before element reaches viewport
  threshold: 0.1
};

let revealObserver = null;
let counterObserver = null;

// Initialize global observers
export function initObserver() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal Animations Observer
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (prefersReduced) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        } else {
          entry.target.classList.add('revealed');
        }
        revealObserver.unobserve(entry.target); // Animate once only
      }
    });
  }, DEFAULT_OPTIONS);

  // Register all elements requesting scroll reveals
  const revealElements = document.querySelectorAll('.reveal-item, .reveal-left, .reveal-right');
  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Animated Stats Counters Observer
  counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target); // Count once only
      }
    });
  }, DEFAULT_OPTIONS);

  const counterElements = document.querySelectorAll('[data-counter]');
  counterElements.forEach(el => counterObserver.observe(el));
}

// Function to animate a numeric count-up
function runCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'), 10) || 0;
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // 2 seconds
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease Out Quad
    const easeProgress = progress * (2 - progress);
    const value = Math.floor(start + easeProgress * (target - start));
    
    element.textContent = value.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Register dynamic elements loaded after initial setup (e.g. from fetch templates)
export function observeNewElements(container) {
  if (!revealObserver || !counterObserver) return;
  
  const revealElements = container.querySelectorAll('.reveal-item, .reveal-left, .reveal-right');
  revealElements.forEach(el => revealObserver.observe(el));

  const counterElements = container.querySelectorAll('[data-counter]');
  counterElements.forEach(el => counterObserver.observe(el));
}
