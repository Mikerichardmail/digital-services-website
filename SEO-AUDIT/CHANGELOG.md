# SEO Fixes Changelog

**Repository:** `online service website` (`https://helpit.in`)  
**Active Branch:** `seo-fixes`  
**Execution Date:** 2026-11-10

---

## Batch 1: Core Layout, Assets & Crawl Directives

| Date | File Touched | Change Applied | Reason | Rule ID | Verified |
|---|---|---|---|---|---|
| 2026-11-10 | `src/components/Footer.astro` | Added `width="36" height="36" loading="lazy" decoding="async"` to logo `<img>` | Eliminate Cumulative Layout Shift (CLS) on all 53 pages | `R11-2` | **Yes (0 CLS errors)** |
| 2026-11-10 | `public/site.webmanifest` | Created standard PWA web manifest with 192x192 & 512x512 icons | Enable mobile PWA shortcuts & Google mobile discoverability | `R32-3` | **Yes** |
| 2026-11-10 | `src/layouts/Base.astro` | Changed `<html lang="en">` to `<html lang="en-IN">` | Enforce Indian English regional geotargeting | `R33-1` | **Yes** |
| 2026-11-10 | `src/layouts/Base.astro` | Added `favicon.svg` and `site.webmanifest` links to `<head>` | Google minimum 48x48 icon and modern SVG dark mode support | `R32-2`, `R32-3` | **Yes** |
| 2026-11-10 | `src/layouts/Base.astro` | Injected `WebSite` JSON-LD schema with `name: "HelpIt"` on homepage | Establish official brand identity for Google SERP Site Names | `R32-1` | **Yes** |
| 2026-11-10 | `src/layouts/Base.astro` | Added "Skip to main content" link and `id="main-content"` on `<main>` | WCAG 2.4.1 landmark compliance for keyboard navigation | `R30-2` | **Yes** |
| 2026-11-10 | `public/robots.txt` | Added `Disallow: /seo-dashboard/` | Conserve Googlebot crawl budget on internal noindexed dashboard | `R17-5` | **Yes** |
| 2026-11-10 | `public/robots.txt` | Consolidated sitemap directive to `https://helpit.in/sitemap-index.xml` | Single canonical XML sitemap index declaration | `R17-3` | **Yes** |

## Batch 2: Core Metadata & CTR Optimization

| Date | File Touched | Change Applied | Reason | Rule ID | Verified |
|---|---|---|---|---|---|
| 2026-11-10 | `src/pages/index.astro` | Calibrated Title (52 chars) & Meta Description (148 chars) | Eliminate SERP truncation, front-load keywords, include ₹500 & doorstep hooks | `R01-3`, `R02-2`, `R02-3` | **Yes** |
| 2026-11-10 | `src/data/locations.json` | Added `metaTitle` (59-62 chars) & `metaDescription` (152-154 chars) across Noida, Gurgaon, Delhi, Ghaziabad, Faridabad | Eliminate massive 108-char titles & 280-char description truncations | `R01-3`, `R02-2`, `R02-3` | **Yes** |
| 2026-11-10 | `src/pages/locations/[city].astro` | Connected `location.metaTitle` & `location.metaDescription` | Clean SERP snippet presentation for 5 NCR metro hubs | `R01-3`, `R02-2` | **Yes** |
| 2026-11-10 | `src/pages/locations/index.astro` | Optimized Title (58 chars) & Meta Description (138 chars) | Align locations hub with target NCR keywords | `R01-3`, `R02-2` | **Yes** |
| 2026-11-10 | `src/pages/pricing/index.astro` | Optimized Title (61 chars) & Meta Description (153 chars) | Include flat ₹500 remote and ₹1,500 doorstep pricing hooks | `R01-3`, `R02-2`, `R02-3` | **Yes** |
| 2026-11-10 | `src/pages/contact/index.astro` | Calibrated Title (58 chars) & Meta Description (153 chars) | Eliminate SERP truncation and prompt direct WhatsApp conversion | `R01-3`, `R02-2`, `R02-3` | **Yes** |
| 2026-11-10 | `src/pages/about/index.astro` | Calibrated Title (59 chars) & Meta Description (151 chars) | Reinforce E-E-A-T credentials and service pricing | `R01-3`, `R02-2` | **Yes** |
| 2026-11-10 | `src/pages/services/index.astro` | Calibrated Title (60 chars) & Meta Description (156 chars) | Eliminate 80-char title & 214-char description overflow | `R01-3`, `R02-2` | **Yes** |
