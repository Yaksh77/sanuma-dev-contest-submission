// Technical SEO Automation module

export function initSEO() {
  const currentUrl = window.location.href;
  
  // 1. Inject Canonical URL Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', currentUrl.split('?')[0].split('#')[0]); // Strip query params/hashes

  // 2. Generate and Inject Global Schema (LocalBusiness & Service)
  injectLocalBusinessSchema();

  // 3. Inject FAQ Schema if accordion FAQ exists on page
  if (document.querySelector('.faq-accordion')) {
    injectFAQSchema();
  }

  // 4. Inject Breadcrumb Schema if breadcrumbs bar exists
  if (document.querySelector('.breadcrumbs-bar')) {
    injectBreadcrumbsSchema();
  }
}

function injectSchema(schemaId, schemaObj) {
  let script = document.getElementById(schemaId);
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObj, null, 2);
}

function injectLocalBusinessSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ComputerStore",
    "name": "Robuzta Tech Labs — Premium Device Repair Lab",
    "url": window.location.origin,
    "logo": `${window.location.origin}/assets/icons/favicon.svg`,
    "image": `${window.location.origin}/assets/images/og-image.jpg`,
    "description": "Premium laptop, MacBook, smartphone & gaming PC repair services in Ahmedabad. Diagnostics, screen replacements, battery service, and micro-soldering.",
    "telephone": "+91 999 245 2459",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "103, First Floor, Sun South Winds, Safal Parisar Road, South Bopal",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380058",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.015813,
      "longitude": 72.468464
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/robuztatechlabs/",
      "https://www.instagram.com/robuztatechlabs/",
      "https://www.youtube.com/@robuztatechlabs"
    ]
  };
  injectSchema('schema-localbusiness', localBusinessSchema);
}

function injectFAQSchema() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Array.from(faqItems).map(item => {
      const question = item.querySelector('.faq-trigger')?.textContent?.trim() || "";
      const answer = item.querySelector('.faq-content')?.textContent?.trim() || "";
      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      };
    }).filter(item => item.name && item.acceptedAnswer.text)
  };

  injectSchema('schema-faq', faqSchema);
}

function injectBreadcrumbsSchema() {
  const crumbs = document.querySelectorAll('.breadcrumbs-list .breadcrumb-item');
  if (!crumbs.length) return;

  const itemListElement = Array.from(crumbs).map((crumb, index) => {
    const link = crumb.querySelector('a');
    const name = link ? link.textContent.trim() : crumb.textContent.trim();
    const url = link ? link.href : window.location.href;
    
    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": url
    };
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  injectSchema('schema-breadcrumbs', breadcrumbSchema);
}
