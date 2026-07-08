// Dynamic HTML partial include system for sub-components (FAQ, CTA, Newsletter blocks)
import { observeNewElements } from './observer.js';

export async function initIncludes() {
  const includeElements = document.querySelectorAll('[data-include]');
  const promises = Array.from(includeElements).map(async (el) => {
    const file = el.getAttribute('data-include');
    if (!file) return;

    try {
      const response = await fetch(file);
      if (response.ok) {
        const html = await response.text();
        el.innerHTML = html;
        
        // Remove include tag to prevent duplicate downloads
        el.removeAttribute('data-include');
        
        // Re-trigger observer for reveals or count-ups inside fetched components
        observeNewElements(el);
      } else {
        console.error(`Error loading HTML include component: ${file} (Status ${response.status})`);
      }
    } catch (err) {
      console.error(`Network error loading include component ${file}:`, err);
    }
  });

  // Resolve all before proceeding
  await Promise.all(promises);
}
