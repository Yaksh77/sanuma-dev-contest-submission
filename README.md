# Robuzta Tech Labs — Website Redesign

> Submission for the **Sanuma India Pvt. Ltd. Website Development Contest**
> A ground-up redesign and rebuild of [robuzta.com](https://www.robuzta.com), built as a fully static, framework-free, production-ready site.

<p align="left">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=000">
  <img alt="No Build Step" src="https://img.shields.io/badge/Build%20Step-None-success">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo & Repository](#live-demo--repository)
- [Objective & Reference](#objective--reference)
- [Known Issues](#known-issues)
- [Tech Stack](#tech-stack)
- [Contest Compliance](#contest-compliance)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Performance](#performance)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Submission Details](#submission-details)
- [Author](#author)
- [License](#license)

---

## Overview

This repository is a business-transformation rebuild of **robuzta.com**, redesigned around a premium **device-repair-services** business — MacBook, laptop, smartphone, tablet, and gaming-PC repair — rather than the industrial-automation concept used in an earlier submission.

The site now covers:
- **Consumer repair services**: MacBook, laptop, smartphone, tablet, gaming PC, chip-level logic-board micro-soldering, data recovery
- **Interactive tools**: a guided symptom-based diagnosis center, a multi-step repair cost estimator, and a live repair-status tracker
- A before/after repair showcase, a device-care blog, a booking/contact flow, and legal pages

**Design direction:** a premium dark-mode-first interface inspired by Apple (layout discipline), Stripe (form clarity), Linear (UX precision), Vercel (dark borders/glow accents), and Framer (purposeful motion) — built on a Three.js hero, GSAP scroll choreography, and a component-driven HTML structure, with no framework or build step required.

## Live Demo & Repository

| | Link |
|---|---|
| **Live Site** | https://sanuma-dev-contest-submission.vercel.app/ |
| **Repository** | https://github.com/Yaksh77/sanuma-dev-contest-submission |
| **Reference Site** | [www.robuzta.com](https://www.robuzta.com) |

## Objective & Reference

Per the contest brief, the reference website (`robuzta.com`) is meant to be used only to understand the business domain and its service offerings — not as a source for brand name, contact details, or copy. See [Known Issues](#known-issues) for where the current build still needs to be brought in line with that requirement.

## Known Issues

| Issue | Where | Fix needed |
|---|---|---|
| Site is branded **"Robuzta Tech Labs"** throughout (64 occurrences) | Every page `<title>`, `assets/components/header.html`, `footer.html`, `localStorage` key `robuzta-theme` | Rename to Sanuma or another original brand across all pages/components/scripts |
| Real-looking street address, phone number, and precise GPS coordinates | `assets/js/seo.js` (JSON-LD `LocalBusiness`), `contact.html`, `footer.html` | Replace with fictional or Sanuma's actual business details |
| `sitemap.xml` and this README were out of date vs. the current page set | `sitemap.xml` (11 URLs), README (previously listed 8 pages) | Regenerate sitemap; this README has been updated to reflect all 12 current pages |
| Some imagery is hot-linked from Unsplash (`assets/js/showcase.js`, `tracker.js`) rather than hosted locally | `showcase.js`, `tracker.js` | Fine for a contest demo, but move to owned/local assets before production use |

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | Semantic HTML5 | 12 hand-authored pages |
| Styling | Vanilla CSS3 | Custom-property design tokens, no preprocessor |
| Logic | Vanilla JavaScript (ES6 modules) | No framework, no bundler |
| 3D Hero | [Three.js](https://threejs.org/) | CDN-first with local `/assets/vendor` fallback |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) | CDN-first with local fallback |
| Scroll Animation | [GSAP](https://gsap.com/) | CDN-first with local fallback |
| Carousels | [Swiper.js](https://swiperjs.com/) | CDN-first with local fallback |
| Data | Static JSON (`data/content.json`) | Powers client-side search index |

No `npm install`, no bundler, and no server runtime is required — the site is deployable as-is to any static host.

## Contest Compliance

| Requirement | Status |
|---|---|
| Frontend-only (HTML5 / CSS3 / vanilla JS) | ✅ No PHP, Node.js, or server-side code |
| No database or backend | ✅ All content is static HTML/JSON |
| Fully responsive (desktop / tablet / mobile) | ✅ Dedicated `responsive.css` breakpoint layer |
| SEO optimized | ✅ Per-page metadata, JSON-LD schema, sitemap, robots.txt |
| Deployable without a build step | ✅ Static assets only |
| Permitted libraries only | ✅ GSAP, Three.js, Swiper, Lenis (all allowed) |
| Original business identity (not copied from reference) | ⚠️ **Not yet met** — see [Known Issues](#known-issues) |

## Key Features

- **Guided Device Diagnosis Center** (`diagnosis.html`) — symptom-based selector per device type with a rules-driven diagnostic engine (`diagnosis.js`)
- **Smart Repair Estimator** (`estimator.html`) — multi-step configurator (device → brand → issue) producing a price and turnaround estimate (`estimator.js`)
- **Live Repair Tracker** (`tracker.html`) — status dashboard with technician notes, timestamped logs, and a live diagnostics viewport (`tracker.js`)
- **Before/After Showcase** (`showcase.html`) — interactive inspection-room view of repair case studies with hotspot annotations (`showcase.js`)
- **Dark/light theme toggle** with persisted preference
- **Three.js animated hero background** that checks `deviceMemory` / `hardwareConcurrency` and falls back to a CSS-only hero on low-end devices
- **GSAP scroll-driven animations** combined with an `IntersectionObserver` reveal utility
- **Reusable HTML partials** (header, footer, CTA, FAQ, testimonials, newsletter) loaded via a fetch-based include system (`include.js`)
- **Client-side site search** driven by a static JSON content index
- **Repair booking form** with client-side validation
- **Accessible mobile navigation** with a custom focus trap and skip-to-content link
- **JSON-LD `LocalBusiness` schema** dynamically injected per page (`seo.js`) — update the contact details here per [Known Issues](#known-issues)
- Custom 404 page and legal pages (Privacy Policy, Terms & Conditions)

## Project Structure

```
robuzta-repair-services/
├── index.html                  Homepage — hero, device categories, workflow
├── services.html               Full repair capability catalogue
├── about.html                  Company story, values, timeline, founder
├── blog.html                   Device care & diagnostics articles index
├── diagnosis.html              Guided symptom-based diagnosis center
├── estimator.html              Multi-step repair cost estimator
├── tracker.html                Live repair status tracker
├── showcase.html                Before/after repair inspection room
├── contact.html                 Booking form, map & contact info
├── privacy-policy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml                  11 indexed URLs (regenerate after any page changes)
│
├── data/
│   └── content.json             Search index / page metadata
│
└── assets/
    ├── css/
    │   ├── variables.css         Design tokens (colour, spacing, type scale)
    │   ├── base.css               Resets & global styles
    │   ├── typography.css
    │   ├── layout.css              Grid / container / flex utilities
    │   ├── utilities.css
    │   ├── themes.css               Light / dark mode overrides
    │   ├── animations.css
    │   ├── buttons.css
    │   ├── cards.css
    │   ├── forms.css
    │   ├── header.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── sections.css
    │   ├── founder.css              About-page founder section
    │   ├── diagnosis.css            Diagnosis Center layout
    │   ├── estimator.css             Estimator layout
    │   ├── tracker.css                Tracker dashboard layout
    │   ├── showcase.css                Showcase inspection-room layout
    │   └── responsive.css               Breakpoint overrides
    │
    ├── js/
    │   ├── main.js                  Entry point — orchestrates all modules
    │   ├── theme.js                  Light/dark toggle & persistence
    │   ├── navigation.js              Header scroll, mobile nav, dropdowns
    │   ├── scroll.js                   Lenis smooth-scroll init
    │   ├── hero3d.js                    Three.js hero background
    │   ├── animations.js                 GSAP scroll animations
    │   ├── observer.js                    IntersectionObserver reveal utility
    │   ├── include.js                      HTML partial fetcher
    │   ├── forms.js                         Client-side form validation
    │   ├── search.js                         Client-side site search
    │   ├── seo.js                            JSON-LD schema injection
    │   ├── carousel.js                        Swiper.js setup
    │   ├── brands.js                           Partner logo marquee
    │   ├── diagnosis.js                        Diagnosis Center engine
    │   ├── estimator.js                         Estimator engine
    │   ├── tracker.js                            Repair tracker dashboard engine
    │   ├── showcase.js                           Before/after showcase engine
    │   └── utils.js                               Shared helpers
    │
    ├── components/                  HTML partials loaded via include.js
    │   ├── header.html
    │   ├── footer.html
    │   ├── cta.html
    │   ├── faq.html
    │   ├── testimonial.html
    │   └── newsletter.html
    │
    ├── images/
    │   └── partners/                Partner/brand SVG logos
    │
    ├── icons/
    │   └── favicon.svg
    │
    └── vendor/                       Local fallbacks for CDN libraries
        ├── gsap.min.js
        ├── three.min.js
        ├── lenis.min.js
        ├── swiper-bundle.min.js
        └── swiper-bundle.min.css
```

## Pages

| Page | File | Purpose |
|---|---|---|
| Homepage | `index.html` | Hero, device categories, workflow overview |
| Services | `services.html` | Full repair capability catalogue |
| About | `about.html` | Company story, values, timeline, founder |
| Blog | `blog.html` | Device care & diagnostics articles index |
| Diagnosis Center | `diagnosis.html` | Guided, symptom-based issue diagnosis |
| Estimator | `estimator.html` | Multi-step repair cost & turnaround estimator |
| Tracker | `tracker.html` | Live repair status dashboard |
| Showcase | `showcase.html` | Before/after repair case studies |
| Contact | `contact.html` | Booking form, map, contact info |
| Privacy Policy | `privacy-policy.html` | DPDP Act 2023–aligned policy |
| Terms & Conditions | `terms.html` | Legal terms |
| 404 | `404.html` | Custom not-found page |

## Getting Started

The site has no build step and no dependencies to install — clone it and serve the folder with any static file server.

```bash
git clone https://github.com/Yaksh77/sanuma-dev-contest-submission.git
cd sanuma-dev-contest-submission

# Python
python -m http.server 8080

# Node.js
npx serve .

# or open with VS Code "Live Server" extension
```

Then visit `http://localhost:8080`.

> **Important:** serve the project over HTTP — opening `index.html` directly via `file://` will break ES6 module imports and the component-include fetch calls.

## Design System

All design tokens (colours, spacing scale, typography, radii, shadows) live in `assets/css/variables.css`, with light/dark overrides in `assets/css/themes.css`. Component-level styles consume those tokens exclusively, so the entire visual language can be re-themed by editing a single file.

## Performance

- Third-party libraries loaded from CDN with automatic local `assets/vendor` fallback via `onerror` handlers
- Images use `loading="lazy"` outside the first viewport
- Three.js hero is gated behind device capability checks (`deviceMemory`, `hardwareConcurrency`) with a CSS-only fallback for constrained devices
- Lenis smooth scroll initialised only after DOM ready to avoid blocking first paint
- No render-blocking framework or bundler runtime

## SEO

- Unique `<title>` and `<meta name="description">` per page
- Open Graph metadata on primary pages
- JSON-LD `LocalBusiness` schema injected dynamically via `seo.js` — **update the placeholder address/phone/geo per Known Issues**
- `robots.txt` and `sitemap.xml` at the project root
- Semantic breadcrumb navigation on interior pages

## Accessibility

- Skip-to-content link on every page
- Visible focus states on all interactive elements
- ARIA labels, roles, and live regions throughout
- Custom focus trap in the mobile navigation overlay
- Colour palette verified for high-contrast readability in both themes
- Respects the `prefers-reduced-motion` media query

## Browser Support

Tested on current versions of Chrome, Firefox, Edge, and Safari (desktop and mobile). ES6 module support is required, which covers all evergreen browsers.

## Submission Details

As required by the contest guidelines:

| Field | Value |
|---|---|
| Candidate Name | Yaksh Chudasama |
| Email | chudasamayaksh77@gmail.com |
| Live Website URL | https://sanuma-dev-contest-submission.vercel.app/ |
| GitHub Repository | https://github.com/Yaksh77/sanuma-dev-contest-submission |
| Submission Deadline | 12th July 2026, 7:00 PM IST (extended per direct feedback) |

## Author

Built by **[Yaksh77](https://github.com/Yaksh77)** for the Sanuma India Pvt. Ltd. Website Development Contest.

## License

This project was built solely as a contest submission for Sanuma India Pvt. Ltd. and is shared for evaluation purposes.