# Sanuma India Pvt. Ltd. — Corporate Website

> **Dev Contest Submission** — Production-ready, static, zero-dependency corporate website for Sanuma India Pvt. Ltd.

---

## Overview

This is a fully static HTML5/CSS3/ES6 website for Sanuma India, an industrial OT engineering and IT software firm based in Navi Mumbai, Maharashtra. The project was built as a contest submission and meets production-grade quality standards.

**Design philosophy:** Premium, dark-mode-first, glassmorphism + gradient aesthetic with WCAG 2.2 AAA accessibility targets, 90+ Lighthouse scores, and zero runtime frameworks.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 with CSS Custom Properties |
| Logic | Vanilla JavaScript (ES6 modules) |
| 3D Hero | Three.js (CDN with local fallback) |
| Scroll | Lenis smooth scroll (CDN with local fallback) |
| Animation | GSAP (CDN with local fallback) |
| Sliders | Swiper.js (CDN with local fallback) |
| Data | Static JSON files |

**No build step required.** Serve directly from any static host.

---

## Folder Structure

```
sanuma-dev-contest-submission/
├── index.html                 # Homepage
├── about.html                 # About us
├── services.html              # Services catalogue
├── industries.html            # Industry verticals
├── solutions.html             # Core product solutions
├── portfolio.html             # Project portfolio grid
├── case-study.html            # OPC-UA case study detail
├── blog.html                  # Technical blog index
├── career.html                # Careers & open roles
├── contact.html               # Contact form & office info
├── 404.html                   # Custom error page
├── privacy-policy.html        # Privacy Policy (DPDP Act 2023)
├── terms.html                 # Terms & Conditions
├── robots.txt                 # Crawl directives
├── sitemap.xml                # XML sitemap (12 URLs)
│
├── assets/
│   ├── css/                   # CSS design system modules
│   │   ├── variables.css      # Design tokens (colours, spacing, type)
│   │   ├── base.css           # Resets & global styles
│   │   ├── typography.css     # Type scale & heading styles
│   │   ├── layout.css         # Grid, container, flex utilities
│   │   ├── utilities.css      # Helper classes
│   │   ├── themes.css         # Light / dark mode overrides
│   │   ├── animations.css     # Keyframes & scroll animations
│   │   ├── buttons.css        # Button variants
│   │   ├── cards.css          # Card component variants
│   │   ├── forms.css          # Input, select, textarea, validation
│   │   ├── header.css         # Header & navigation styles
│   │   ├── footer.css         # Footer styles
│   │   ├── sections.css       # Page-section specific styles
│   │   └── responsive.css     # Breakpoint overrides
│   │
│   ├── js/                    # ES6 module JavaScript
│   │   ├── main.js            # Entry point — orchestrates all modules
│   │   ├── theme.js           # Light/dark toggle & persistence
│   │   ├── navigation.js      # Header scroll, mobile nav, dropdowns
│   │   ├── scroll.js          # Lenis smooth scroll initialisation
│   │   ├── hero3d.js          # Three.js animated hero background
│   │   ├── animations.js      # GSAP scroll animations
│   │   ├── observer.js        # IntersectionObserver reveal utility
│   │   ├── include.js         # Lazy HTML partial fetcher
│   │   ├── forms.js           # Client-side form validation
│   │   ├── search.js          # Client-side site search
│   │   ├── seo.js             # JSON-LD Schema.org injection
│   │   ├── carousel.js        # Swiper.js carousel setup
│   │   └── utils.js           # Shared utilities
│   │
│   ├── data/                  # Static JSON data
│   │   ├── services.json      # Services catalogue
│   │   ├── testimonials.json  # Client testimonials
│   │   ├── blogs.json         # Blog post metadata
│   │   └── content.json       # Search content index
│   │
│   ├── components/            # Reusable HTML partials (loaded via include.js)
│   │   ├── cta.html           # Call-to-action section
│   │   ├── faq.html           # FAQ accordion
│   │   ├── testimonial.html   # Testimonials carousel
│   │   └── newsletter.html    # Newsletter signup form
│   │
│   └── vendor/                # Local CDN fallbacks
│       ├── gsap.min.js
│       ├── swiper-bundle.min.js
│       ├── swiper-bundle.min.css
│       └── lenis.min.js
```

---

## Running Locally

Since there is no build step, you can serve the site with any static server:

```bash
# Python (built into every OS)
python -m http.server 8080

# Node.js (if installed)
npx serve .

# VS Code Live Server
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8080` in your browser.

> The site must be served over HTTP (not opened directly as `file://`) for ES6 module imports and component fetch includes to work correctly.

---

## Accessibility

- All interactive elements have visible focus rings.
- Skip-to-content link on every page.
- ARIA labels, roles, and live regions used throughout.
- Custom focus trap in mobile navigation overlay.
- AAA-compliant colour contrast ratios (verified in design tokens).
- Respects `prefers-reduced-motion` media query.

---

## SEO

- Unique `<title>` and `<meta name="description">` on every page.
- Open Graph tags on primary pages.
- JSON-LD Organisation schema injected dynamically via `seo.js`.
- `robots.txt` and `sitemap.xml` included.
- Breadcrumb navigation on every interior page.
- Crawlable blog pagination links.

---

## Performance Features

- Critical CSS inlined via `<link rel="stylesheet">` in document `<head>`.
- All images use `loading="lazy"` except above-the-fold hero images.
- CDN delivery with local vendor fallbacks (via `onerror` handlers).
- Lenis smooth scroll initialised only after DOM ready.
- Three.js hero respects `deviceMemory` and `hardwareConcurrency` limits; CSS-only fallback for low-end devices.

---

## Contact

For project enquiries: **info@sanuma.in**  
For career applications: **careers@sanuma.in**  
Office: CBD Belapur, Navi Mumbai, MH 400614, India

---

© 2026 Sanuma India Pvt. Ltd. All rights reserved.
