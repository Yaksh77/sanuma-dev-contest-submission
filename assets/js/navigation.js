// Navigation, menus, sticky headers, and announcements

export function initNavigation() {
  // Sticky Header condenses after 80px scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially in case of refreshed page
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const isCurrentPage = currentPath.endsWith(href) || 
                            (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html')));
      if (isCurrentPage) {
        link.classList.add('active');
        // If dropdown link, highlight parent too
        const dropdownParent = link.closest('.nav-item')?.querySelector('.nav-link');
        if (dropdownParent) dropdownParent.classList.add('active');
      }
    }
  });

  // Mobile Menu & Hamburger Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileOverlay.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        trapFocus(mobileOverlay);
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on clicking links
    mobileOverlay.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  // Focus Trapping Logic (A11y)
  function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a[href], button, input, textarea, select, [tabindex="0"]');
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    
    if (firstFocusableEl) firstFocusableEl.focus();

    element.addEventListener('keydown', function(e) {
      if (e.key === 'Tab' || e.keyCode === 9) {
        if (e.shiftKey) { /* Shift + Tab */
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else { /* Tab */
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Announcement Bar dismissal
  const announcementBar = document.querySelector('.announcement-bar');
  const closeBtn = document.querySelector('.announcement-close');
  const SESSION_KEY = 'robuzta-announcement-dismissed';

  if (announcementBar && closeBtn) {
    if (sessionStorage.getItem(SESSION_KEY)) {
      announcementBar.style.display = 'none';
    } else {
      closeBtn.addEventListener('click', () => {
        announcementBar.classList.add('dismissed');
        sessionStorage.setItem(SESSION_KEY, 'true');
        setTimeout(() => {
          announcementBar.style.display = 'none';
        }, 300); // Wait for transition
      });
    }
  }

  // FAQ Accordion Toggle — supports both .faq-trigger (legacy) and .faq-question (contact page)
  const faqTriggers = document.querySelectorAll('.faq-trigger, .faq-question');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      // .faq-answer panel (contact page) or .faq-panel (legacy)
      const panel = item.querySelector('.faq-panel, .faq-answer');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other panels (accordion behavior)
      const allItems = document.querySelectorAll('.faq-item');
      allItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger, .faq-question');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanel = otherItem.querySelector('.faq-panel, .faq-answer');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current panel
      item.classList.toggle('active');
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (!isExpanded) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });
}

