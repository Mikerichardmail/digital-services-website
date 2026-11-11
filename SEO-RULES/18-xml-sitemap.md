# SEO Factor 18: XML Sitemap

## Purpose
An XML Sitemap (`sitemap.xml` or `sitemap-index.xml`) is a structured machine-readable roadmap adhering to the Sitemap 0.9 protocol. It provides search engines with an authoritative inventory of all canonical, indexable URLs across a domain, along with metadata indicating when content was last updated (`<lastmod>`). For search engines like Googlebot and Bingbot, the sitemap streamlines crawling efficiency, ensures rapid discovery of newly published service landing pages or blog guides, and prevents deep pages from being overlooked. It also acts as the primary benchmark in Google Search Console to detect coverage and indexing discrepancies.

---

## Guidelines
1. **Strict Inclusion of 200 OK Canonical URLs Only**:
   Every URL listed inside an XML sitemap must return an HTTP **200 OK** response, be indexable (free of `noindex`), and match the page's self-referencing canonical tag exactly (including HTTPS protocol and trailing slash). Never include redirecting URLs (301/302), broken pages (404/410), or utility/private pages.
2. **Accurate W3C Datetime `<lastmod>`**:
   Include a truthful `<lastmod>` timestamp adhering to the W3C Datetime format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS+TZD`). Google heavily utilizes `<lastmod>` to schedule re-crawling for updated content. Never update `<lastmod>` globally across all pages unless the underlying content has genuinely changed; doing so causes Google to lose trust in the sitemap timestamps.
3. **Ignore `<priority>` and `<changefreq>`**:
   Google officially ignores `<priority>` and `<changefreq>` values. Do not waste engineering effort calculating arbitrary priority values. Focus exclusively on URL accuracy and truthful `<lastmod>` timestamps.
4. **Sitemap Index File Architecture**:
   Use a master Sitemap Index file (`sitemap-index.xml`) that references categorized sub-sitemaps (e.g., `sitemap-0.xml` or content-segmented sitemaps like pages and services).
5. **Declare Sitemap in `robots.txt`**:
   Expose the absolute URL of the sitemap index at the top or bottom of `robots.txt`:
   ```text
   Sitemap: https://helpit.in/sitemap-index.xml
   ```
6. **Submit Exclusively via Google Search Console**:
   Submit strictly the master sitemap index URL (`sitemap-index.xml`) in Google Search Console under Indexing > Sitemaps. Googlebot automatically parses the index and crawls the referenced sub-sitemaps.
7. **Filter Utility & Confirmation Routes in Astro**:
   When using `@astrojs/sitemap`, use the `filter` hook in `astro.config.mjs` to systematically exclude staging pages, admin portals, thank-you pages, and 404 templates from the generated XML.

---

## Limits & Constraints
- **Maximum URLs per File**: Maximum **50,000 URLs** per individual sitemap file (recommended: 10,000–20,000 for optimal processing).
- **Maximum File Size**: Maximum **50 MB** uncompressed per sitemap file.
- **Encoding**: Must be **UTF-8** encoded.
- **Entity Escaping**: XML reserved characters (`&`, `'`, `"`, `<`, `>`) must be escaped (`&amp;`, `&apos;`, `&quot;`, `&lt;`, `&gt;`).
- **Non-200 / Non-Canonical URL Tolerance**: Exactly **0%**. Zero 3xx, 4xx, 5xx, or non-canonical URLs permitted.

---

## Validation Rules
| Rule ID | Rule Name | Description | Severity | Pass Criteria |
|---|---|---|---|---|
| `R18-1` | 200 OK Status | 100% of URLs in sitemap must return HTTP 200 OK. | Critical | Zero 3xx, 4xx, or 5xx responses for sitemap URLs. |
| `R18-2` | Self-Canonical Match | Every URL in sitemap must match that page's user-declared canonical tag. | Critical | Canonical URL string equals sitemap `<loc>` string. |
| `R18-3` | No Noindex in Sitemap | No URL in sitemap may contain a `noindex` robots meta tag or header. | Critical | `noindex` count among sitemap URLs equals 0. |
| `R18-4` | Absolute Loc URLs | All `<loc>` elements must contain fully qualified absolute `https://` URLs. | Critical | Starts with `https://helpit.in/`. |
| `R18-5` | Valid W3C Datetime | `<lastmod>` must match ISO 8601 / W3C format (`YYYY-MM-DD`). | High | `<lastmod>` parses against `^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$`. |
| `R18-6` | Robots.txt Declaration | The sitemap index URL must be declared in `https://helpit.in/robots.txt`. | High | Valid `Sitemap:` line exists in `robots.txt`. |
| `R18-7` | Trailing Slash Conformity | Sitemap URLs must terminate with `/` matching site canonical policy. | High | URL paths end with `/`. |

---

## Good Examples

### Example 1: Standard XML Sitemap Entry
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://helpit.in/</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://helpit.in/services/remote-pc-support/</loc>
    <lastmod>2026-11-08</lastmod>
  </url>
  <url>
    <loc>https://helpit.in/services/delhi-home-setup/</loc>
    <lastmod>2026-11-05</lastmod>
  </url>
</urlset>
```
*Why this is good*: Clean Protocol 0.9 schema, fully qualified absolute HTTPS URLs, consistent trailing slashes matching canonical tags, truthful W3C date formats, and zero bloat (`priority` and `changefreq` omitted).

### Example 2: Clean Integration in `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://helpit.in',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      // Filter out non-indexable utility, admin, and error pages
      filter: (page) => {
        if (page.includes('/admin/')) return false;
        if (page.includes('/checkout/success')) return false;
        if (page.includes('/404')) return false;
        return true;
      },
      serialize: (item) => {
        // Guarantee trailing slash compliance on all sitemap URLs
        if (!item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }
        return item;
      }
    })
  ]
});
```
*Why this is good*: Automatically excludes utility/404 routes from the XML sitemap during static build and enforces trailing slash consistency.

---

## Bad Examples

### Example 1: Including Redirecting or Parameterized URLs
```xml
<!-- BAD: Wastes crawl budget and triggers GSC sitemap errors -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <!-- Triggers 301 redirect to /services/windows-support/ -->
    <loc>https://helpit.in/services/windows-support</loc>
  </url>
  <url>
    <!-- Duplicate URL with tracking token -->
    <loc>https://helpit.in/services/?utm_source=newsletter</loc>
  </url>
  <url>
    <!-- De-indexed thank-you page -->
    <loc>https://helpit.in/checkout/success/</loc>
  </url>
</urlset>
```
*Why this is bad*:
1. Missing trailing slash causes a 301 redirect hop.
2. Query parameter URL triggers canonical mismatch warnings.
3. `/checkout/success/` has a `noindex` tag, resulting in Search Console *"Submitted URL marked 'noindex'"* error.

### Example 2: Fake Global Lastmod Spam
```xml
<!-- BAD: Every page updated to the exact same second on every build -->
<url>
  <loc>https://helpit.in/about/</loc>
  <lastmod>2026-11-10T09:59:45+05:30</lastmod>
</url>
<url>
  <loc>https://helpit.in/terms/</loc>
  <lastmod>2026-11-10T09:59:45+05:30</lastmod>
</url>
```
*Why this is bad*: Changing `<lastmod>` on pages whose text hasn't been edited causes Googlebot to flag the sitemap as untrustworthy and stop respecting the `<lastmod>` signal.

---

## Common Mistakes & Anti-Patterns
| Mistake / Anti-Pattern | Why It Fails | Correction |
|---|---|---|
| Submitting URLs missing trailing slashes (when site policy requires them) | Generates 301 redirect hops; triggers GSC sitemap warnings. | Ensure sitemap generator outputs URLs matching canonical format. |
| Including pages with `<meta name="robots" content="noindex">` | Conflicting instructions; triggers GSC "Submitted URL has noindex" error. | Filter out all noindex routes in `astro.config.mjs`. |
| Including 404 or deleted pages | Wastes crawl budget on dead ends; GSC flags 404 error. | Ensure only active 200 OK pages are compiled into sitemap. |
| Relative URLs in `<loc>` (`<loc>/services/</loc>`) | Invalid XML schema; rejected by search engines. | Always use absolute URLs starting with `https://`. |
| Submitting sub-sitemaps individually to Search Console | Unnecessary overhead; harder to track holistically. | Submit only the master `sitemap-index.xml`. |
| Obsessing over `<priority>` and `<changefreq>` | Ignored by Googlebot entirely. | Omit or leave as default; focus on truthful `<lastmod>`. |

---

## How to Implement in HelpIt Stack (Astro 5 + Cloudflare)
1. **Configure `@astrojs/sitemap` in `astro.config.mjs`**:
   Set `site: 'https://helpit.in'` and `trailingSlash: 'always'`.
2. **Build Output**:
   When `npm run build` runs, Astro automatically emits:
   - `dist/sitemap-index.xml`
   - `dist/sitemap-0.xml`
3. **Reference in `public/robots.txt`**:
   Ensure `public/robots.txt` contains:
   ```text
   Sitemap: https://helpit.in/sitemap-index.xml
   ```

---

## How to Verify / Test
1. **Inspect Build Artifact**:
   Open `dist/sitemap-index.xml` and `dist/sitemap-0.xml`:
   - Verify all `<loc>` entries start with `https://helpit.in/`.
   - Verify all paths end with `/`.
   - Verify no private routes (`/checkout/success`, `/admin`) are present.
2. **Crawl Validation via Screaming Frog**:
   - Go to **Mode > List** -> Click **Upload > Download Sitemap**.
   - Input `https://helpit.in/sitemap-index.xml`.
   - Verify: 100% of URLs return status **200 OK**, 0% return 3xx, 0% return 4xx, and 0% have `noindex`.
3. **Google Search Console Verification**:
   Submit `sitemap-index.xml` in Search Console; confirm status reads **"Success"** with 0 errors.

---

## Official Documentation vs General SEO Advice
- **Google Search Central Official Stance**: Sitemaps follow Protocol 0.9. Max 50,000 URLs / 50 MB per file. Google explicitly ignores `<priority>` and `<changefreq>`. Google actively uses truthful `<lastmod>` timestamps in W3C format. Non-200, non-canonical, or noindex URLs should never be submitted.
- **Industry Standards**: Segment large sitemaps into logical content silos (pages, services, blog) using a sitemap index file. Limit child sitemaps to 10k–20k URLs.

---

## Research Log
- **Date**: 2026-11-10
- **Queries Conducted**:
  1. `Google Search Central build submit sitemap official guide specifications` (Source: `google.com`) — Outlined Protocol 0.9, limits (50k URLs / 50MB), UTF-8, entity escaping, and GSC submission workflow.
  2. `Google ignores priority changefreq sitemap lastmod W3C datetime official` (Source: `google.com`) — Documented that Google officially ignores `<priority>` and `<changefreq>`, but relies on accurate `<lastmod>` formatted in W3C Datetime.
  3. `sitemap index file vs sub sitemap structure 50000 limit best practices SEO` (Source: `icertglobal.com`) — Analyzed sitemap index file architecture, content-type segmentation, and sub-sitemap sizing recommendations (10k–20k URLs).
  4. `sitemap URLs only 200 OK canonical noindex redirects 404 Google audit errors` (Source: `e-cbd.com.au`) — Detailed consequences of sitemap pollution: 301 redirects, 404s, and `noindex` conflicts leading to GSC indexation coverage errors.
  5. `@astrojs/sitemap filter serialize custom pages config astro.config.mjs` (Source: `astro.build`) — Documented `@astrojs/sitemap` integration settings (`filter`, `serialize`, `customPages`) to enforce canonical URLs and exclude utility routes.

---

## Sources
- Google Search Central: Build and Submit a Sitemap (`https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap`)
- Sitemaps.org: Protocol 0.9 Specification (`https://www.sitemaps.org/protocol.html`)
- Search Engine Roundtable: Google on Lastmod vs Priority (`https://www.seroundtable.com/google-lastmod-sitemap-priority-changefreq-36262.html`)
- Astro Docs: `@astrojs/sitemap` Integration (`https://docs.astro.build/en/guides/integrations-guide/sitemap/`)
- Screaming Frog: Auditing XML Sitemaps (`https://www.screamingfrog.co.uk/how-to-audit-xml-sitemaps/`)
