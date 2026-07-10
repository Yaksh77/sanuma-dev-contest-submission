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

---

## Overview

This repository is a complete business-transformation rebuild of **robuzta.com** — the official website for **Robuzta Tech Labs**, a premium device repair laboratory based in South Bopal, Ahmedabad.

The site covers:
- **Consumer repair services**: MacBook, Laptop, Smartphone, Tablet, Gaming PC, Chip-level Logic Board Micro-soldering, Data Recovery
- **B2B corporate AMC**: SLA-backed fleet device maintenance for companies and schools
- A repair-focused blog, about page, service booking form, and legal pages

**Design direction:** premium dark-mode-first interface inspired by Apple (layouts), Stripe (forms), Linear (UX clarity), Vercel (dark borders/glows) and Framer (purposeful animation) — using a Three.js hero, GSAP scroll choreography, and a component-driven HTML structure with no framework or build step required.

## Live Demo & Repository

| | Link |
|---|---|
| **Live Site** | https://sanuma-dev-contest-submission.vercel.app/ |
| **Repository** | https://github.com/Yaksh77/sanuma-dev-contest-submission |
| **Reference Site** | [www.robuzta.com](https://www.robuzta.com) |

## Objective & Reference

Per the contest brief, the reference website (`robuzta.com`) was used only to understand the business domain, location, contact details, and service offerings — not as a design or content source. Every page, section, layout, and copy block in this repository was independently designed and written for Robuzta Tech Labs' brand and repair service catalogue.

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | Semantic HTML5 | 8 hand-authored pages |
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
| SEO optimized | ✅ Per-page metadata, JSON-LD LocalBusiness schema, sitemap, robots.txt |
| Deployable without a build step | ✅ Static assets only |
| Permitted libraries only | ✅ GSAP, Three.js, Swiper, Lenis (all allowed) |

## Key Features

- **Dark/light theme toggle** with persisted preference (`robuzta-theme` localStorage key)
- **Three.js animated hero background** that checks `deviceMemory` / `hardwareConcurrency` and falls back to a CSS-only hero on low-end devices
- **GSAP scroll-driven animations** combined with an `IntersectionObserver` reveal utility for lightweight, framework-free motion
- **Reusable HTML partials** (header, footer, CTA, FAQ, testimonials, newsletter) loaded via a lightweight fetch-based include system (`include.js`)
- **Client-side site search** driven by a static JSON content index
- **Device repair booking form** with service category checkboxes, budget selector, and full client-side validation
- **B2B Corporate AMC section** with SLA breakdown, fleet pricing, and account manager details
- **Accessible mobile navigation** with a custom focus trap and skip-to-content link
- **JSON-LD LocalBusiness schema** dynamically injected with South Bopal coordinates, phone number, and opening hours
- **Google Maps embed** for the South Bopal, Ahmedabad service center
- **Custom 404 page** and legal pages (Privacy Policy, Terms & Conditions)

## Project Structure

```
robuzta-repair-services/
├── index.html                  Homepage — Hero, device categories, workflow, calculator
├── services.html               Full repair capability catalogue
├── about.html                  Lab story, values, timeline, team
├── blog.html                   Repair tips & diagnostics blog
├── contact.html                Repair booking form, map & contact info
├── privacy-policy.html         DPDP Act 2023-aligned policy
├── terms.html                  Legal terms
├── 404.html                    Custom not-found page
├── robots.txt
├── sitemap.xml                 7 indexed URLs
│
├── data/
│   └── content.json            Search index / page metadata
│
└── assets/
    ├── css/
    │   ├── variables.css         Design tokens (colour, spacing, type scale)
    │   ├── base.css              Resets & global styles
    │   ├── typography.css
    │   ├── layout.css            Grid / container / flex utilities
    │   ├── utilities.css
    │   ├── themes.css            Light / dark mode overrides
    │   ├── animations.css
    │   ├── buttons.css
    │   ├── cards.css
    │   ├── forms.css
    │   ├── header.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── sections.css
    │   └── responsive.css        Breakpoint overrides
    │
    ├── js/
    │   ├── main.js               Entry point — orchestrates all modules
    │   ├── theme.js              Light/dark toggle & persistence
    │   ├── navigation.js         Header scroll, mobile nav, dropdowns
    │   ├── scroll.js             Lenis smooth-scroll init
    │   ├── hero3d.js             Three.js hero background
    │   ├── animations.js         GSAP scroll animations
    │   ├── observer.js           IntersectionObserver reveal utility
    │   ├── include.js            HTML partial fetcher
    │   ├── forms.js              Client-side form validation
    │   ├── search.js             Client-side site search
    │   ├── seo.js                JSON-LD LocalBusiness schema injection
    │   ├── carousel.js           Swiper.js setup
    │   ├── brands.js             Partner logo marquee
    │   └── utils.js              Shared helpers
    │
    ├── components/               HTML partials loaded via include.js
    │   ├── header.html
    │   ├── footer.html
    │   ├── cta.html
    │   ├── faq.html
    │   ├── testimonial.html
    │   └── newsletter.html
    │
    ├── images/
    │   └── partners/             Partner/brand SVG logos
    │
    ├── icons/
    │   └── favicon.svg
    │
    └── vendor/                   Local fallbacks for CDN libraries
        ├── gsap.min.js
        ├── three.min.js
        ├── lenis.min.js
        ├── swiper-bundle.min.js
        └── swiper-bundle.min.css
```

## Pages

| Page | File | Purpose |
|---|---|---|
| Homepage | `index.html` | Hero, device selector, 4-step workflow, pricing calculator |
| Services | `services.html` | Full repair capability catalogue with B2B AMC section |
| About | `about.html` | Lab story, core principles, growth timeline, team |
| Blog | `blog.html` | Device care & diagnostics articles index |
| Contact | `contact.html` | Repair booking form, South Bopal map, contact info |
| Privacy Policy | `privacy-policy.html` | DPDP Act 2023-aligned policy |
| Terms & Conditions | `terms.html` | Legal terms |
| 404 | `404.html` | Custom not-found page |

## Getting Started

The site has no build step and no dependencies to install — clone it and serve the folder with any static file server.

```bash
git clone https://github.com/Yaksh77/robuzta-repair-services.git
cd robuzta-repair-services

# Python
python -m http.server 8000

# Node.js (if installed)
npx serve .

# or open with VS Code "Live Server" extension
```

Then visit `http://localhost:8000`.

> **Important:** serve the project over HTTP — opening `index.html` directly via `file://` will break ES6 module imports and the component-include fetch calls.

## Design System

All design tokens (colours, spacing scale, typography, radii, shadows) live in `assets/css/variables.css`, with light/dark overrides in `assets/css/themes.css`. Component-level styles (`buttons.css`, `cards.css`, `forms.css`, `header.css`, `footer.css`) consume those tokens exclusively, so the entire visual language can be re-themed by editing a single file.

**Brand palette:**
- **Brand Green:** `#0F9D58` / `#00C97A` (accent, buttons, highlights)
- **Background Dark:** `#0A0A0A` (dark mode base)
- **Background Light:** `#FFFFFF` (light mode base)

## Performance

- Third-party libraries loaded from CDN with automatic local `assets/vendor` fallback via `onerror` handlers, so the site never breaks on a flaky connection
- Images use `loading="lazy"` outside the first viewport
- Three.js hero is gated behind device capability checks (`deviceMemory`, `hardwareConcurrency`) with a CSS-only fallback for constrained devices
- Lenis smooth scroll initialised only after DOM ready to avoid blocking first paint
- No render-blocking framework or bundler runtime

## SEO

- Unique `<title>` and `<meta name="description">` per page
- Open Graph metadata on primary pages
- JSON-LD **LocalBusiness** schema injected dynamically via `seo.js` with South Bopal coordinates, phone, email, opening hours
- `robots.txt` and `sitemap.xml` (7 active URLs) included at the project root
- Semantic breadcrumb navigation on all interior pages

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
