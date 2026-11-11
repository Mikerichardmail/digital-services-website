# Master SEO Correction Plan: Prioritized Engineering Fixes

**Target Entity:** HelpIt Digital Solutions (`helpit.in`)  
**Technology Stack:** Astro 5.4.2 SSG / Tailwind CSS / Cloudflare  
**Active Git Branch:** `seo-fixes`  
**Total Target Fixes:** 10 Structured Action Batches  
**Last Updated:** 2026-11-10

---

## 1. Classification of Changes by Risk

Per Section 6 of [`SEO-MASTER-PLAN.md`](file:///c:/all%20sorce%20code/online%20service%20website/SEO-MASTER-PLAN.md), all proposed corrections are segmented into two risk categories:

| Category | Description | Approval Level |
|---|---|---|
| **Safe Changes** | Titles, meta descriptions, image ALT text, image dimensions, heading hierarchy fixes (no visual layout change), internal linking additions, Open Graph tags, schema additions. | Pre-approved for batching (batches of $\le 10$ files). |
| **Needs Approval Changes** | `robots.txt` modifications, `noindex` directives, canonical tag structure alterations, URL slug changes, 301 redirects, sitemap configuration changes, merging/deleting routes. | **Requires explicit per-item user confirmation** at Checkpoint 3. |

---

## 2. Priority 1: Critical Site-Wide Template Fixes (Immediate Health Lift)

### Fix 1.1: Missing Explicit Dimensions on Universal Footer Brand Logo
- **Pages Affected:** All 53 pages (site-wide).
- **Rule ID:** `R11-2` (Critical - Weight 10).
- **Problem:** `<img src="/icon.png">` in the global footer component lacks explicit `width` and `height` attributes, causing Cumulative Layout Shift (CLS) on every page.
- **Current Value:**
  ```html
  <img 
    src="/icon.png" 
    alt={site.brandName} 
    class="w-9 h-9 rounded-xl object-contain bg-white" 
  />
  ```
- **New Value:**
  ```html
  <img 
    src="/icon.png" 
    alt={site.brandName} 
    width="36" 
    height="36" 
    loading="lazy"
    decoding="async"
    class="w-9 h-9 rounded-xl object-contain bg-white" 
  />
  ```
- **Files Touched:** `src/components/Footer.astro`
- **Risk Category:** **Safe**
- **Priority:** **Critical** (Instantly clears 53 of 54 Critical violations across the entire domain).

---

### Fix 1.2: Add `WebSite` Schema to Homepage for Google SERP Site Names
- **Pages Affected:** `https://helpit.in/` (Homepage).
- **Rule ID:** `R32-1` (Critical - Weight 10).
- **Problem:** Homepage JSON-LD contains `ProfessionalService` but lacks `WebSite` structured data. Google requires `WebSite` schema on the root homepage to display the official brand name ("HelpIt") in mobile and desktop SERP snippets.
- **Current Value:**
  Only `ProfessionalService` rendered via `defaultSchema`.
- **New Value:**
  Conditionally inject `WebSite` structured data when on the homepage:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HelpIt",
    "alternateName": ["Help It", "HelpIt Digital Solutions"],
    "url": "https://helpit.in/"
  }
  ```
- **Files Touched:** `src/layouts/Base.astro`
- **Risk Category:** **Safe**
- **Priority:** **Critical**

---

### Fix 1.3: Favicon & Modern Web Manifest Asset Suite
- **Pages Affected:** All 53 pages (site-wide).
- **Rule ID:** `R32-2`, `R32-3` (Critical / High).
- **Problem:** `Base.astro` only declares 16x16 and 32x32 PNG favicons. Google requires $\ge 48\times 48\text{ px}$ square icons (or SVG) for SERP display. Missing scalable `favicon.svg` link and `site.webmanifest`.
- **Current Value:**
  ```html
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="shortcut icon" href="/favicon-32x32.png" />
  ```
- **New Value:**
  ```html
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="shortcut icon" href="/favicon-32x32.png" />
  ```
- **Files Touched:** `src/layouts/Base.astro`, `public/site.webmanifest` (create file).
- **Risk Category:** **Safe**
- **Priority:** **Critical**

---

### Fix 1.4: WCAG 2.4.1 "Skip to Main Content" Accessibility Link
- **Pages Affected:** All 53 pages (site-wide).
- **Rule ID:** `R30-2` (High - Weight 5).
- **Problem:** Missing keyboard-accessible skip link as first child of `<body>` and `<main>` lacks landmark ID.
- **Current Value:**
  ```html
  <body class="...">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
  ```
- **New Value:**
  ```html
  <body class="...">
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
    >
      Skip to main content
    </a>
    <Header />
    <main id="main-content" tabindex="-1" class="flex-grow focus:outline-none">
      <slot />
    </main>
  ```
- **Files Touched:** `src/layouts/Base.astro`
- **Risk Category:** **Safe**
- **Priority:** **High**

---

### Fix 1.5: Geotargeted Language Tag Update (`en-IN`)
- **Pages Affected:** All 53 pages (site-wide).
- **Rule ID:** `R33-1` (High - Weight 5).
- **Problem:** HTML document uses generic `<html lang="en">` instead of region-specific Indian English `<html lang="en-IN">`.
- **Current Value:** `<html lang="en" class="scroll-smooth">`
- **New Value:** `<html lang="en-IN" class="scroll-smooth">`
- **Files Touched:** `src/layouts/Base.astro`
- **Risk Category:** **Safe**
- **Priority:** **High**

---

## 3. Priority 2: Core Metadata Optimizations (Titles & Meta Descriptions)

### Fix 2.1: Homepage Title & Meta Description Calibration
- **Page:** `https://helpit.in/`
- **Rule ID:** `R01-3` (Length), `R02-2` (Length), `R02-3` (CTA & Pricing).
- **Current Title (71 chars):** `HelpIt - Instant Digital Services & Computer Tech Support from ₹500`
- **New Title (62 chars):** `HelpIt: On-Demand Remote IT Support & Doorstep Computer Repair`
- **Current Description (160 chars):** `Stuck with tech? Get instant remote computer tech help, websites, local SEO, AI setup & document fixes across India from ₹500. Doorstep visits in Delhi NCR.`
- **New Description (157 chars):** `Certified remote computer tech help from ₹500 pan-India & doorstep technician visits in Delhi NCR. Instant virus removal, PC troubleshooting & printer fixes.`
- **Files Touched:** `src/pages/index.astro`
- **Risk Category:** **Safe**
- **Priority:** **High**

---

### Fix 2.2: Location Pages Title & Description Optimization (Delhi, Noida, Gurgaon, Ghaziabad, Faridabad)
- **Pages:** `https://helpit.in/locations/*`
- **Rule ID:** `R01-3` (Titles 84–108 chars $\rightarrow$ truncated in SERPs), `R02-2` (Descriptions 241–280 chars $\rightarrow$ truncated in SERPs).
- **Current Values:**
  - Delhi Title: `Digital Solutions & Computer IT Support for Delhi Traders & Professionals | HelpIt Digital Solutions` (108 chars)
  - Delhi Description: `Empowering Chandni Chowk wholesalers...` (252 chars)
  - Noida Title: `IT Support Services, Digital Solutions & Tech Help in Noida | HelpIt Digital Solutions` (90 chars)
  - Noida Description: `Helping retail shops in Sector 18...` (280 chars)
  - Gurgaon Title: `Fast Website, Local SEO & IT Services for Gurugram Businesses | HelpIt Digital Solutions` (92 chars)
  - Gurgaon Description: `From Cyber City startups to salons...` (248 chars)
- **New Values:**
  - **Delhi Title (59 chars):** `Doorstep Computer Repair & IT Support in Delhi | HelpIt`
  - **Delhi Description (154 chars):** `Expert doorstep PC repair & remote IT help in Connaught Place, South Delhi, Karol Bagh & Chandni Chowk. Flat ₹500 remote base or 2-hr technician visits.`
  - **Noida Title (59 chars):** `Doorstep Computer Repair & IT Support in Noida | HelpIt`
  - **Noida Description (152 chars):** `Fast computer troubleshooting & doorstep technician visits in Noida Sectors 18, 62, Phase 2 & Expressway. Flat ₹500 remote support & local business IT.`
  - **Gurgaon Title (61 chars):** `Doorstep Computer Repair & IT Support in Gurgaon | HelpIt`
  - **Gurgaon Description (154 chars):** `On-demand doorstep laptop repair & remote IT help in Cyber City, Golf Course Rd & Sohna Rd Gurgaon. ₹500 flat remote troubleshooting & office setups.`
  - **Ghaziabad Title (62 chars):** `Computer Repair & Doorstep IT Support in Ghaziabad | HelpIt`
  - **Ghaziabad Description (153 chars):** `Affordable computer repair & technician visits in Indirapuram, Vaishali, Raj Nagar & Mohan Nagar Ghaziabad. Flat ₹500 remote tech help pan-India.`
  - **Faridabad Title (62 chars):** `Computer Repair & Doorstep IT Support in Faridabad | HelpIt`
  - **Faridabad Description (153 chars):** `Doorstep computer repair & remote IT support in NIT Faridabad, Sector 24 & Mathura Road. Fast hardware fixes & flat ₹500 remote troubleshooting.`
- **Files Touched:** `src/pages/locations/[city].astro`, `src/pages/locations/index.astro`
- **Risk Category:** **Safe**
- **Priority:** **High**

---

### Fix 2.3: Contact, Pricing & About Pages Metadata Calibration
- **Pages:** `https://helpit.in/contact`, `https://helpit.in/pricing`, `https://helpit.in/about`
- **Rule ID:** `R01-3`, `R02-2`, `R02-3`.
- **New Values:**
  - **Contact Title (58 chars):** `Contact HelpIt: Instant WhatsApp & Phone IT Support India`
  - **Contact Description (153 chars):** `Connect with certified HelpIt engineers via WhatsApp (+91 77387 89773) for instant remote PC repair from ₹500 or book a Delhi NCR doorstep visit.`
  - **Pricing Title (61 chars):** `Transparent IT Support Pricing & Packages from ₹500 | HelpIt`
  - **Pricing Description (153 chars):** `Zero hidden fees. Flat ₹500 remote technical troubleshooting across India & ₹1,500 doorstep technician visits in Delhi NCR. View all rates & plans.`
  - **About Title (59 chars):** `About HelpIt: Certified Remote IT & Doorstep Tech Support`
  - **About Description (151 chars):** `Learn about HelpIt Digital Solutions. Certified computer technicians delivering ₹500 remote technical troubleshooting and Delhi NCR doorstep visits.`
- **Files Touched:** `src/pages/contact/index.astro`, `src/pages/pricing/index.astro`, `src/pages/about/index.astro`
- **Risk Category:** **Safe**
- **Priority:** **High**

---

## 4. Priority 3: Changes Requiring User Confirmation (Needs Approval)

Per Section 6 of the Master Plan, these items modify crawling directives, security, or routing and require explicit confirmation:

### Item 3.1: Disallow Internal SEO Dashboard in `robots.txt`
- **Rule ID:** `R17-5` (Crawl Budget / Admin Exclusion).
- **Proposed Change:** Add `Disallow: /seo-dashboard/` to `public/robots.txt`.
- **Reason:** Prevent search engine bots from wasting crawl budget on an internal diagnostic dashboard that is already marked `noindex`.
- **Files Touched:** `public/robots.txt`
- **Risk Category:** **Needs Approval**

### Item 3.2: Clean Duplicate Sitemap Directives in `robots.txt`
- **Rule ID:** `R17-3` (Sitemap Declaration).
- **Current Value:**
  ```text
  Sitemap: https://helpit.in/sitemap-index.xml
  Sitemap: https://helpit.in/sitemap.xml
  ```
- **Proposed Change:** Retain singular canonical index: `Sitemap: https://helpit.in/sitemap-index.xml`.
- **Reason:** Clean crawler directive pointing directly to the master sitemap index.
- **Files Touched:** `public/robots.txt`
- **Risk Category:** **Needs Approval**

---

## 5. Summary Table of Files Touched in Sprint

| File Path | Nature of Fix | Rule IDs | Risk Category |
|---|---|---|---|
| `src/components/Footer.astro` | Add `width="36" height="36"` to logo | `R11-2` | **Safe** |
| `src/layouts/Base.astro` | Add `WebSite` schema, favicon suite, skip link, `en-IN` | `R32-1`, `R32-2`, `R30-2`, `R33-1` | **Safe** |
| `public/site.webmanifest` | Create PWA/Android web manifest with 192/512 icons | `R32-3` | **Safe** |
| `src/pages/index.astro` | Calibrate homepage title & meta description | `R01-3`, `R02-2`, `R02-3` | **Safe** |
| `src/pages/locations/[city].astro` | Calibrate 5 city page titles & meta descriptions | `R01-3`, `R02-2` | **Safe** |
| `src/pages/locations/index.astro` | Calibrate locations hub title & meta description | `R01-3`, `R02-2` | **Safe** |
| `src/pages/pricing/index.astro` | Calibrate pricing title & meta description | `R01-3`, `R02-2`, `R02-3` | **Safe** |
| `src/pages/contact/index.astro` | Calibrate contact title & meta description | `R01-3`, `R02-2` | **Safe** |
| `src/pages/about/index.astro` | Calibrate about title & meta description | `R01-3`, `R02-2` | **Safe** |
| `public/robots.txt` | Add `/seo-dashboard/` disallow, consolidate sitemap | `R17-3`, `R17-5` | **Needs Approval** |
