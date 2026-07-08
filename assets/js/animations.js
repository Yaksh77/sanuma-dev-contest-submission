// Custom cursors, magnetic CTA alignments, and ripple clicks

export function initAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // 1. Setup Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    // Follower interpolation loop for lag effect
    function animateFollower() {
      const ease = 0.15;
      followerX += (mouseX - followerX) * ease;
      followerY += (mouseY - followerY) * ease;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      requestAnimationFrame(animateFollower);
    }
    requestAnimationFrame(animateFollower);

    // Hover states for link structures
    const hoverables = document.querySelectorAll('a, button, .faq-trigger, .filter-btn, [role="button"]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  }

  // 2. Ripple Button Effect
  const rippleButtons = document.querySelectorAll('.btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 3. Magnetic Primary Buttons CTA attraction
  const magneticWraps = document.querySelectorAll('.magnetic-btn-wrap');
  magneticWraps.forEach(wrap => {
    const btn = wrap.querySelector('.btn--primary');
    if (!btn) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      // Mouse coordinates relative to wrap center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull pull effect (max 15px displacement)
      const pullX = x * 0.35;
      const pullY = y * 0.35;

      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 4. GSAP Hero intro animations (if gsap CDN exists)
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      duration: 1,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
      stagger: 0.2
    })
    .from('.hero-subtitle', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-actions', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      ease: 'power3.out'
    }, '-=0.6');
  }
}
