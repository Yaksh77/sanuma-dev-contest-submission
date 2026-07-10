# Sanuma India Pvt. Ltd. — Website Redesign

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

This repository contains a complete redesign of the reference site **robuzta.com** for Sanuma India, an industrial OT (Operational Technology) engineering and software firm. The brief was not to copy the reference but to rebuild it into a significantly better experience across UI/UX, performance, SEO, responsiveness, and accessibility — using frontend-only technologies with no backend, build tooling, or dependency installation required.

**Design direction:** a premium, dark-mode-first interface with subtle glassmorphism and gradient accents, a Three.js-driven hero, GSAP scroll choreography, and a component-driven HTML structure — while keeping the shipped bundle dependency-light and deployable to any static host as-is.

## Live Demo & Repository

| | Link |
|---|---|
| **Live Site** | https://sanuma-dev-contest-submission.vercel.app/ |
| **Repository** | https://github.com/Yaksh77/sanuma-dev-contest-submission |
| **Reference Site** | [www.robuzta.com](https://www.robuzta.com) |

## Objective & Reference

Per the contest brief, the reference website (`robuzta.com`) was used only to understand the business domain and its service offerings — not as a design or content source. Every page, section, layout, and copy block in this repository was independently designed and built for Sanuma India's brand and service catalogue.

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | Semantic HTML5 | 13 hand-authored pages |
| Styling | Vanilla CSS3 | Custom-property design tokens, no preprocessor |
| Logic | Vanilla JavaScript (ES6 modules) | No framework, no bundler |
| 3D Hero | [Three.js](https://threejs.org/) | CDN-first with local `/assets/vendor` fallback |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) | CDN-first with local fallback |
| Scroll Animation | [GSAP](https://gsap.com/) | CDN-first with local fallback |
| Carousels | [Swiper.js](https://swiperjs.com/) | CDN-first with local fallback |
| Data | Static JSON (`data/content.json`) | Powers client-side search index |

No `npm install`, no bundler, and no server runtime is required at any point — the site is deployable as-is to any static host.

## Contest Compliance

| Requirement | Status |
|---|---|
| Frontend-only (HTML5 / CSS3 / vanilla JS) | ✅ No PHP, Node.js, or server-side code |
| No database or backend | ✅ All content is static HTML/JSON |
| Fully responsive (desktop / tablet / mobile) | ✅ Dedicated `responsive.css` breakpoint layer |
| SEO optimized | ✅ Per-page metadata, JSON-LD, sitemap, robots.txt |
| Deployable without a build step | ✅ Static assets only |
| Permitted libraries only | ✅ GSAP, Three.js, Swiper, Lenis (all allowed) |

## Key Features

- **Dark/light theme toggle** with persisted preference (`theme.js`)
- **Three.js animated hero background** that checks `deviceMemory` / `hardwareConcurrency` and falls back to a CSS-only hero on low-end devices
- **GSAP scroll-driven animations** combined with an `IntersectionObserver` reveal utility for lightweight, framework-free motion
- **Reusable HTML partials** (header, footer, CTA, FAQ, testimonials, newsletter) loaded via a lightweight fetch-based include system (`include.js`)
- **Client-side site search** driven by a static JSON content index
- **Accessible mobile navigation** with a custom focus trap and skip-to-content link
- **Custom 404 page** and policy pages (Privacy Policy, Terms & Conditions)

## Project Structure

```
sanuma-dev-contest-submission/
├── index.html                  Homepage
├── about.html                  About us
├── services.html                Capabilities & services
├── industries.html              Industries served
├── solutions.html                Outcome-based platforms
├── portfolio.html                Project portfolio
├── case-study.html               Featured case study
├── blog.html                     Technical blog index
├── career.html                   Careers & open roles
├── contact.html                  Contact form & office info
├── privacy-policy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml                   12 indexed URLs
│
├── data/
│   └── content.json              Search index / page metadata
│
└── assets/
    ├── css/
    │   ├── variables.css         Design tokens (colour, spacing, type scale)
    │   ├── base.css               Resets & global styles
    │   ├── typography.css
    │   ├── layout.css              Grid / container / flex utilities
    │   ├── utilities.css
    │   ├── themes.css              Light / dark mode overrides
    │   ├── animations.css
    │   ├── buttons.css
    │   ├── cards.css
    │   ├── forms.css
    │   ├── header.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── sections.css
    │   └── responsive.css          Breakpoint overrides
    │
    ├── js/
    │   ├── main.js                 Entry point — orchestrates all modules
    │   ├── theme.js                 Light/dark toggle & persistence
    │   ├── navigation.js             Header scroll, mobile nav, dropdowns
    │   ├── scroll.js                  Lenis smooth-scroll init
    │   ├── hero3d.js                   Three.js hero background
    │   ├── animations.js                GSAP scroll animations
    │   ├── observer.js                   IntersectionObserver reveal utility
    │   ├── include.js                     HTML partial fetcher
    │   ├── forms.js                        Client-side form validation
    │   ├── search.js                        Client-side site search
    │   ├── seo.js                            JSON-LD schema injection
    │   ├── carousel.js                        Swiper.js setup
    │   ├── brands.js                           Partner logo marquee
    │   └── utils.js                             Shared helpers
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
    │   └── partners/               Partner/brand SVG logos
    │
    ├── icons/
    │   └── favicon.svg
    │
    └── vendor/                      Local fallbacks for CDN libraries
        ├── gsap.min.js
        ├── three.min.js
        ├── lenis.min.js
        ├── swiper-bundle.min.js
        └── swiper-bundle.min.css
```

## Pages

| Page | File | Purpose |
|---|---|---|
| Homepage | `index.html` | Hero, services overview, industries, testimonials |
| About | `about.html` | Company mission, values, timeline, leadership |
| Services | `services.html` | Full capability catalogue |
| Industries | `industries.html` | Vertical-specific solutions (automotive, logistics, steel, energy) |
| Solutions | `solutions.html` | Outcome-based platform offerings |
| Portfolio | `portfolio.html` | Delivered project grid |
| Case Study | `case-study.html` | Deep dive into a featured engagement |
| Blog | `blog.html` | Technical articles index |
| Careers | `career.html` | Open roles & culture |
| Contact | `contact.html` | Contact form & office details |
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

All design tokens (colours, spacing scale, typography, radii, shadows) live in `assets/css/variables.css`, with light/dark overrides in `assets/css/themes.css`. Component-level styles (`buttons.css`, `cards.css`, `forms.css`, `header.css`, `footer.css`) consume those tokens exclusively, so the entire visual language can be re-themed by editing a single file.

## Performance

- Third-party libraries loaded from CDN with automatic local `assets/vendor` fallback via `onerror` handlers, so the site never breaks on a flaky connection
- Images use `loading="lazy"` outside the first viewport
- Three.js hero is gated behind device capability checks (`deviceMemory`, `hardwareConcurrency`) with a CSS-only fallback for constrained devices
- Lenis smooth scroll initialised only after DOM ready to avoid blocking first paint
- No render-blocking framework or bundler runtime

## SEO

- Unique `<title>` and `<meta name="description">` per page
- Open Graph metadata on primary pages
- JSON-LD Organization schema injected dynamically via `seo.js`
- `robots.txt` and `sitemap.xml` (12 URLs) included at the project root
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
| Submission Deadline | 10th July 2026, 7:00 PM IST |

## Author

Built by **[Yaksh77](https://github.com/Yaksh77)** for the Sanuma India Pvt. Ltd. Website Development Contest.
