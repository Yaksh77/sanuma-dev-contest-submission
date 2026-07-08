// Application entry point bootstrapping modules

import { initIncludes } from './include.js';
import { getSavedTheme, applyTheme, initThemeToggle } from './theme.js';
import { initNavigation } from './navigation.js';
import { initScroll } from './scroll.js';
import { initObserver } from './observer.js';
import { initAnimations } from './animations.js';
import { initCarousels } from './carousel.js';
import { initForms } from './forms.js';
import { initSearch } from './search.js';
import { initSEO } from './seo.js';
import { initHero3D } from './hero3d.js';
import { initMarqueeScroll } from './brands.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1. Fetch sub-components HTML templates first (Rule component loading strategy)
    await initIncludes();
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // 2. Initialize secondary modular engines
    initThemeToggle();
    initNavigation();
    initScroll();
    initObserver();
    initAnimations();
    initCarousels();
    initForms();
    initSearch();
    initSEO();
    initMarqueeScroll();
    
    // 3. Setup Three.JS if container is present on page
    initHero3D();

  } catch (err) {
    console.error('Error during site initialization sequence:', err);
  } finally {
    // Fade out preloader to reveal page content
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      // Set aria-busy to false for accessible reading frame
      document.body.removeAttribute('aria-busy');
    }
  }
});
