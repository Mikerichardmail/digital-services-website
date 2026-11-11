# Master SEO Checklist: Machine-Checkable Pass/Fail Rules

**Target Entity:** HelpIt Digital Solutions (`helpit.in`)  
**Structure:** One Pass/Fail Check per Rule ID  
**Hierarchy:** `[OFFICIAL]` Requirements First, followed by `[RECOMMENDED]` and `[OPTIONAL]`  
**Total Rules:** 188 Rules across 35 Factors  
**Last Updated:** 2026-11-10

---

## Part 1: Official Google Search Guidelines (`[OFFICIAL]`)

These rules are grounded directly in Google Search Essentials, Search Central Documentation, and Webmaster Spam Policies. Violating these rules can result in de-indexing, algorithmic ranking demotions, or manual actions.

### 1.1 Crawlability, Directives & Status Codes
- [ ] **R16-1** | `[OFFICIAL]` | **Severity: Critical** | Robots meta tag or `X-Robots-Tag` must not contain `noindex` or `none` on pages intended for organic search indexing.
- [ ] **R16-2** | `[OFFICIAL]` | **Severity: High** | Directives must use standard accepted tokens: `index`, `noindex`, `follow`, `nofollow`, `noarchive`, `nosnippet`, `max-snippet`, `max-image-preview`, `max-video-preview`.
- [ ] **R16-4** | `[OFFICIAL]` | **Severity: High** | Meta tag and HTTP header must agree; conflicting directives (e.g. `index` in HTML but `noindex` in header) default to the most restrictive directive.
- [ ] **R17-1** | `[OFFICIAL]` | **Severity: Critical** | `robots.txt` must be accessible at the exact domain root (`https://helpit.in/robots.txt`) and return HTTP 200 OK.
- [ ] **R17-2** | `[OFFICIAL]` | **Severity: Critical** | `robots.txt` must NOT block essential site CSS, JavaScript, or public image assets required for browser rendering.
- [ ] **R17-3** | `[OFFICIAL]` | **Severity: High** | `robots.txt` must declare at least one valid, absolute XML Sitemap directive: `Sitemap: https://helpit.in/sitemap-index.xml`.
- [ ] **R17-4** | `[OFFICIAL]` | **Severity: High** | Directives must use standard `User-agent`, `Allow`, `Disallow`, and `Sitemap` syntax; avoid non-standard or unsupported directives.
- [ ] **R18-1** | `[OFFICIAL]` | **Severity: Critical** | XML sitemap must be located at root or declared in `robots.txt`, formatted according to the official sitemaps.org schema (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`).
- [ ] **R18-2** | `[OFFICIAL]` | **Severity: Critical** | Every URL listed in the sitemap must return an HTTP 200 OK status code (zero 301/302 redirects, zero 404/410 errors, zero 5xx server errors).
- [ ] **R18-3** | `[OFFICIAL]` | **Severity: Critical** | All sitemap URLs must be fully canonical; zero non-canonical, parameterized duplicate, or noindexed URLs permitted.
- [ ] **R18-4** | `[OFFICIAL]` | **Severity: High** | Individual sitemap files must not exceed 50,000 URLs or 50 MB uncompressed; sitemap index files must be used for multi-file splits.
- [ ] **R24-1** | `[OFFICIAL]` | **Severity: Critical** | Site must be served over HTTPS across all pages with a valid, unexpired SSL/TLS certificate.
- [ ] **R24-2** | `[OFFICIAL]` | **Severity: Critical** | Insecure HTTP requests must permanently redirect to HTTPS via 301/308 status codes.
- [ ] **R24-3** | `[OFFICIAL]` | **Severity: Critical** | Zero mixed-content warnings; all assets (scripts, images, stylesheets, fonts) must be requested over secure HTTPS.
- [ ] **R25-1** | `[OFFICIAL]` | **Severity: Critical** | Non-existent or deleted URLs must return a true HTTP 404 Not Found or HTTP 410 Gone status code.
- [ ] **R25-2** | `[OFFICIAL]` | **Severity: Critical** | Zero Soft 404 errors; pages with error messages or missing content must not return HTTP 200 OK.
- [ ] **R25-3** | `[OFFICIAL]` | **Severity: High** | Do not blanket redirect broken/dead URLs to the homepage; Google treats blanket homepage redirects as Soft 404s.
- [ ] **R26-1** | `[OFFICIAL]` | **Severity: Critical** | Permanent page moves must use HTTP 301 or HTTP 308 redirects to pass ~100% PageRank link equity.
- [ ] **R26-2** | `[OFFICIAL]` | **Severity: Critical** | Zero redirect chains or loops; redirects must resolve to the final canonical target in exactly 1 hop (maximum 2 for protocol shifts).
- [ ] **R26-3** | `[OFFICIAL]` | **Severity: High** | Internal links, canonical tags, and sitemaps must point directly to the destination URL, never to a redirected URL.
- [ ] **R27-1** | `[OFFICIAL]` | **Severity: Critical** | Server must deliver fully rendered static HTML or server-rendered content on first byte without requiring client-side JS to render core content.
- [ ] **R27-2** | `[OFFICIAL]` | **Severity: Critical** | Server response code for valid indexable pages must be HTTP 200 OK with zero 5xx server errors.
- [ ] **R28-1** | `[OFFICIAL]` | **Severity: Critical** | Paginated series must use distinct, accessible URLs (`/blog/page/2/`), each with a self-referencing canonical tag.
- [ ] **R28-2** | `[OFFICIAL]` | **Severity: Critical** | Do not canonicalize paginated pages (page 2+) back to the first page (page 1).
- [ ] **R28-3** | `[OFFICIAL]` | **Severity: High** | Faceted navigation search filters and sorting parameters must not generate infinite indexable URL combinations.

### 1.2 URL Architecture & Canonicalization
- [ ] **R15-1** | `[OFFICIAL]` | **Severity: Critical** | Every indexable page must contain exactly one `<link rel="canonical" href="...">` in the document `<head>`.
- [ ] **R15-2** | `[OFFICIAL]` | **Severity: Critical** | Canonical URLs must be fully qualified and absolute (include `https://helpit.in`), never relative paths.
- [ ] **R15-3** | `[OFFICIAL]` | **Severity: Critical** | Canonical target must return an HTTP 200 OK status code (never a 301 redirect or 404).
- [ ] **R15-4** | `[OFFICIAL]` | **Severity: High** | Self-canonicalization is required on all unique, primary indexable pages.
- [ ] **R03-1** | `[OFFICIAL]` | **Severity: Critical** | URLs must use consistent protocol and domain hostname across all internal links (`https://helpit.in`).
- [ ] **R03-4** | `[OFFICIAL]` | **Severity: Critical** | Consistent trailing-slash enforcement (HelpIt standard: no trailing slash on endpoints, matching Astro config).

### 1.3 Page Titles & Headings
- [ ] **R01-1** | `[OFFICIAL]` | **Severity: Critical** | Every page must contain exactly one non-empty `<title>` element inside the `<head>` block.
- [ ] **R01-2** | `[OFFICIAL]` | **Severity: Critical** | Page titles must be unique across the entire site; zero duplicate titles across distinct indexable URLs.
- [ ] **R01-6** | `[OFFICIAL]` | **Severity: Critical** | Title tags must not be stuffed with repetitive keywords or boilerplate spam.
- [ ] **R04-1** | `[OFFICIAL]` | **Severity: Critical** | Every indexable page must have at least one semantic `<h1>` element.
- [ ] **R04-2** | `[OFFICIAL]` | **Severity: High** | Exactly one primary `<h1>` element per page representing the main topic of the document.

### 1.4 Structured Data & Rich Snippets
- [ ] **R19-1** | `[OFFICIAL]` | **Severity: Critical** | Schema markup must be valid JSON-LD enclosed in `<script type="application/ld+json">`.
- [ ] **R19-2** | `[OFFICIAL]` | **Severity: Critical** | Structured data must pass Google Rich Results Test with zero errors on required schema properties.
- [ ] **R19-3** | `[OFFICIAL]` | **Severity: Critical** | Schema content must match visible on-page content; hidden or deceptive structured data violates Google Spam Policies.
- [ ] **R19-4** | `[OFFICIAL]` | **Severity: High** | Homepage must include `LocalBusiness` / `ProfessionalService` and `WebSite` schema markup.
- [ ] **R20-1** | `[OFFICIAL]` | **Severity: High** | Breadcrumbs must be accompanied by valid `BreadcrumbList` JSON-LD schema matching on-page navigation.
- [ ] **R32-1** | `[OFFICIAL]` | **Severity: Critical** | Homepage must include `WebSite` schema with official `name` ("HelpIt") and canonical `url` to power Google SERP Site Names.
- [ ] **R32-2** | `[OFFICIAL]` | **Severity: Critical** | SERP favicon must be at least $48\times 48\text{ px}$ (or scalable SVG) and accessible to `Googlebot-Image`.

### 1.5 Internationalization & Language
- [ ] **R33-1** | `[OFFICIAL]` | **Severity: Fatal** | Hreflang annotations (if implemented) must be 100% reciprocal; unilateral references are discarded by Google.
- [ ] **R33-2** | `[OFFICIAL]` | **Severity: Critical** | Every localized page cluster must include a self-referencing `hreflang` tag pointing to itself.
- [ ] **R33-3** | `[OFFICIAL]` | **Severity: Fatal** | Language codes must use ISO 639-1 and region codes must use ISO 3166-1 alpha-2 (e.g. `en-IN`, `hi-IN`). Region-only codes are invalid.
- [ ] **R33-5** | `[OFFICIAL]` | **Severity: Critical** | All URLs referenced in `hreflang` must return HTTP 200 OK and self-canonicalize.

### 1.6 Content Quality, Link Schemes & Webmaster Policies
- [ ] **R08-1** | `[OFFICIAL]` | **Severity: Critical** | Zero scraped, spun, or automated doorway content targeting thin geographic variations.
- [ ] **R10-1** | `[OFFICIAL]` | **Severity: Critical** | Zero duplicate content domains or substantial verbatim block duplication without canonical attribution.
- [ ] **R14-1** | `[OFFICIAL]` | **Severity: Critical** | Outbound paid, sponsored, or affiliate links must be qualified with `rel="sponsored"` or `rel="nofollow"`.
- [ ] **R14-2** | `[OFFICIAL]` | **Severity: High** | User-generated content links (comments, forum posts) must be qualified with `rel="ugc"`.
- [ ] **R34-4** | `[OFFICIAL]` | **Severity: Fatal** | Zero participation in private blog networks (PBNs), automated link injection schemes, or link-buying schemes.
- [ ] **R35-1** | `[OFFICIAL]` | **Severity: Fatal** | GSC Domain Property must be verified via DNS TXT record at the apex domain (`helpit.in`).
- [ ] **R35-2** | `[OFFICIAL]` | **Severity: Critical** | XML sitemap must be submitted in Google Search Console and pass fetch inspection.

---

## Part 2: Industry Recommended Standards (`[RECOMMENDED]`)

These rules represent empirical best practices established by leading technical SEO practitioners, Core Web Vitals research, and W3C web standards.

### 2.1 Titles, Descriptions & Content Optimization
- [ ] **R01-3** | `[RECOMMENDED]` | **Severity: High** | Title length must be between 50 and 60 characters ($< 600\text{ px}$ display width to prevent SERP truncation).
- [ ] **R01-4** | `[RECOMMENDED]` | **Severity: High** | Primary target keyword must be placed within the first 35 characters of the `<title>` tag.
- [ ] **R01-5** | `[RECOMMENDED]` | **Severity: Medium** | Title should append brand name suffix with consistent separator (`Primary Keyword | Flat ₹500 Tech Help - HelpIt`).
- [ ] **R02-1** | `[RECOMMENDED]` | **Severity: High** | Every indexable page must have a unique meta description.
- [ ] **R02-2** | `[RECOMMENDED]` | **Severity: High** | Meta description length must be between 120 and 158 characters ($< 960\text{ px}$ mobile width).
- [ ] **R02-3** | `[RECOMMENDED]` | **Severity: Medium** | Meta description must include a clear call-to-action (CTA) and core value proposition ("flat ₹500", "Delhi NCR doorstep").
- [ ] **R02-4** | `[RECOMMENDED]` | **Severity: Medium** | Meta description should naturally incorporate the primary and secondary target keywords.
- [ ] **R04-3** | `[RECOMMENDED]` | **Severity: High** | H1 length should be between 20 and 70 characters and clearly describe the page content.
- [ ] **R04-4** | `[RECOMMENDED]` | **Severity: High** | H1 must contain the primary keyword in a natural, prominent position.
- [ ] **R04-5** | `[RECOMMENDED]` | **Severity: Medium** | H1 must reinforce the `<title>` tag without verbatim copy-pasting.
- [ ] **R05-1** | `[RECOMMENDED]` | **Severity: High** | Every substantive content page must contain 2 to 8 semantic `<h2>` headings.
- [ ] **R05-2** | `[RECOMMENDED]` | **Severity: Medium** | H2 headings should incorporate secondary and long-tail keyword variations.
- [ ] **R05-3** | `[RECOMMENDED]` | **Severity: Medium** | H2 headings must not be empty or contain non-descriptive filler text.
- [ ] **R06-1** | `[RECOMMENDED]` | **Severity: High** | Heading hierarchy must be strictly sequential; never skip levels (e.g. `<h2>` directly to `<h4>`).
- [ ] **R06-2** | `[RECOMMENDED]` | **Severity: Medium** | Heading tags (`<h1>`–`<h6>`) must not be used solely for visual styling or button design.
- [ ] **R07-1** | `[RECOMMENDED]` | **Severity: High** | Content must align with search intent: Informational (guides), Commercial (comparisons), or Transactional (booking).
- [ ] **R07-2** | `[RECOMMENDED]` | **Severity: High** | Keyword density must remain natural (1% to 2.5%); zero keyword stuffing.
- [ ] **R07-3** | `[RECOMMENDED]` | **Severity: Critical** | Zero keyword cannibalization between service pages; each page targets a distinct primary query.
- [ ] **R08-2** | `[RECOMMENDED]` | **Severity: High** | Primary service pages must exceed 600 words; technical guides must exceed 1,000 words.
- [ ] **R08-3** | `[RECOMMENDED]` | **Severity: High** | E-E-A-T signals must be visible: technician credentials, clear service pricing, business registration, contact address.
- [ ] **R09-1** | `[RECOMMENDED]` | **Severity: Medium** | Flesch Reading Ease score should be $\ge 60$ (accessible to general audience).
- [ ] **R09-2** | `[RECOMMENDED]` | **Severity: Medium** | Paragraphs should not exceed 3–4 sentences; use scannable bulleted lists and bold key phrases.
- [ ] **R10-2** | `[RECOMMENDED]` | **Severity: Critical** | Delhi NCR location service pages (Noida, Gurgaon, Delhi) must contain $\ge 70\%$ unique localized copy.

### 2.2 Media Optimization & Core Web Vitals
- [ ] **R11-1** | `[RECOMMENDED]` | **Severity: High** | Images must be delivered in modern next-gen formats (WebP or AVIF); avoid uncompressed PNGs for photos.
- [ ] **R11-2** | `[RECOMMENDED]` | **Severity: Critical** | All `<img>` tags must include explicit `width` and `height` attributes to prevent layout shift.
- [ ] **R11-3** | `[RECOMMENDED]` | **Severity: Critical** | LCP hero banner image must NOT have `loading="lazy"`; must use `loading="eager"` and `fetchpriority="high"`.
- [ ] **R11-5** | `[RECOMMENDED]` | **Severity: High** | Below-the-fold images must employ native `loading="lazy"` to preserve mobile bandwidth.
- [ ] **R11-6** | `[RECOMMENDED]` | **Severity: Medium** | Images should specify `decoding="async"` to avoid main-thread rendering delays.
- [ ] **R12-1** | `[RECOMMENDED]` | **Severity: High** | All informational and functional images must include descriptive, contextual `alt` text ($< 125\text{ chars}$).
- [ ] **R12-2** | `[RECOMMENDED]` | **Severity: Medium** | Purely decorative images must have empty `alt=""` and `aria-hidden="true"`.
- [ ] **R12-3** | `[RECOMMENDED]` | **Severity: Medium** | Image filenames must be descriptive, lowercase, and hyphen-separated (no `IMG_1024.jpg`).
- [ ] **R21-1** | `[RECOMMENDED]` | **Severity: Critical** | Document `<head>` must include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- [ ] **R21-2** | `[RECOMMENDED]` | **Severity: High** | Interactive touch targets (buttons, links) must measure at least $48\times 48\text{ px}$ with $\ge 8\text{ px}$ spacing.
- [ ] **R21-3** | `[RECOMMENDED]` | **Severity: Critical** | Zero horizontal page scrolling on mobile viewports (320px to 414px width).
- [ ] **R22-1** | `[RECOMMENDED]` | **Severity: High** | Server Time to First Byte (TTFB) must be $\le 200\text{ms}$ on cached edge requests ($\le 500\text{ms}$ dynamic).
- [ ] **R22-2** | `[RECOMMENDED]` | **Severity: High** | Static assets must be served with Brotli or Gzip compression.
- [ ] **R22-3** | `[RECOMMENDED]` | **Severity: High** | Hashed static assets (`_astro/*`) must have `Cache-Control: public, max-age=31536000, immutable`.
- [ ] **R23-1** | `[RECOMMENDED]` | **Severity: Critical** | Largest Contentful Paint (LCP) must occur within $\le 2.5\text{ seconds}$ on 75th percentile of page loads.
- [ ] **R23-2** | `[RECOMMENDED]` | **Severity: Critical** | Interaction to Next Paint (INP) must remain $\le 200\text{ms}$ across all user interactions.
- [ ] **R23-3** | `[RECOMMENDED]` | **Severity: Critical** | Cumulative Layout Shift (CLS) must remain $\le 0.1$.
- [ ] **R23-4** | `[RECOMMENDED]` | **Severity: High** | JavaScript long tasks ($> 50\text{ms}$) must yield execution via `scheduler.yield()` or `setTimeout()`.

### 2.3 Linking, Architecture & Social Meta
- [ ] **R13-1** | `[RECOMMENDED]` | **Severity: High** | Internal links must use descriptive, keyword-rich anchor text; zero generic "click here" or raw URL anchors.
- [ ] **R13-2** | `[RECOMMENDED]` | **Severity: High** | Zero orphan pages; every indexable page must receive at least 2 internal contextual in-body links.
- [ ] **R13-3** | `[RECOMMENDED]` | **Severity: Medium** | Critical service pages must be linked prominently from navigation or homepage body.
- [ ] **R14-3** | `[RECOMMENDED]` | **Severity: Medium** | External citations to authoritative technical resources (Microsoft, Apple, RFCs) should open safely without vulnerability.
- [ ] **R20-2** | `[RECOMMENDED]` | **Severity: Medium** | Breadcrumb navigation should be visible on all pages below the root homepage.
- [ ] **R29-1** | `[RECOMMENDED]` | **Severity: High** | Maximum click depth from homepage to any indexable service page must be $\le 3$ clicks ($d \le 2$ for priority services).
- [ ] **R30-1** | `[RECOMMENDED]` | **Severity: High** | Semantic `<nav aria-label="...">` landmark elements must encapsulate site navigation menus.
- [ ] **R30-2** | `[RECOMMENDED]` | **Severity: High** | A visible "Skip to main content" link must be the first interactive element in `<body>`.
- [ ] **R30-3** | `[RECOMMENDED]` | **Severity: High** | 100% link parity between desktop navigation and mobile drawer navigation.
- [ ] **R31-1** | `[RECOMMENDED]` | **Severity: High** | Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) present on all public pages.
- [ ] **R31-2** | `[RECOMMENDED]` | **Severity: High** | `og:image` dimensions must be $1200\times 630\text{ px}$ (1.91:1 ratio) and file size must be $\le 300\text{ KB}$ for WhatsApp.
- [ ] **R31-3** | `[RECOMMENDED]` | **Severity: Medium** | Twitter card meta (`twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`) present.
- [ ] **R32-3** | `[RECOMMENDED]` | **Severity: High** | Base layout includes `apple-touch-icon.png` ($180\times 180$) and `/site.webmanifest` with 192x192 & 512x512 icons.
- [ ] **R34-1** | `[RECOMMENDED]` | **Severity: Critical** | Exact-match anchor text must account for $< 5\%$ of total unique referring domains.
- [ ] **R34-2** | `[RECOMMENDED]` | **Severity: High** | Branded and naked URL anchors must comprise $\ge 60\%$ of total referring domain profile.
- [ ] **R34-3** | `[RECOMMENDED]` | **Severity: Fatal** | 100% NAP consistency (Name, Address, Phone) across Justdial, Sulekha, IndiaMART, and Google Business Profile.
- [ ] **R35-3** | `[RECOMMENDED]` | **Severity: High** | GA4 property linked to GSC Domain Property and Search Console collection published in GA4 library.
- [ ] **R35-4** | `[RECOMMENDED]` | **Severity: Medium** | Cloudflare Crawler Hints (IndexNow) enabled for instant push indexing to Bing and Copilot.

---

## Part 3: Optional Optimizations & Polish (`[OPTIONAL]`)

These rules offer advanced enhancements, defensive hardening, and micro-optimizations that provide incremental competitive edges.

- [ ] **R03-2** | `[OPTIONAL]` | **Severity: Low** | URL slug length kept under 75 characters for optimal readability and sharing.
- [ ] **R03-3** | `[OPTIONAL]` | **Severity: Low** | URL subfolder nesting kept to $\le 2$ levels deep (`/services/remote-it-support`).
- [ ] **R05-4** | `[OPTIONAL]` | **Severity: Low** | H2 headings styled with collapsible accordion UI on long FAQ and troubleshooting documentation.
- [ ] **R06-3** | `[OPTIONAL]` | **Severity: Low** | H3 headings incorporate diagnostic symptom codes (e.g. "Error 0x80070002", "Spooler Service Terminated").
- [ ] **R09-3** | `[OPTIONAL]` | **Severity: Low** | In-page table of contents provided for long-form diagnostic guides ($> 1,500$ words).
- [ ] **R11-4** | `[OPTIONAL]` | **Severity: Low** | Preload LCP hero image in `<head>` via `<link rel="preload" as="image" href="..." fetchpriority="high">`.
- [ ] **R12-4** | `[OPTIONAL]` | **Severity: Low** | Add `title` attribute to images where supplementary hover tooltip context is helpful to desktop users.
- [ ] **R13-4** | `[OPTIONAL]` | **Severity: Low** | Contextual related-post links module at the bottom of technical troubleshooting guides.
- [ ] **R14-4** | `[OPTIONAL]` | **Severity: Low** | External links to non-affiliate educational references open with `rel="noopener noreferrer"`.
- [ ] **R16-3** | `[OPTIONAL]` | **Severity: Low** | Add `max-image-preview:large` to encourage Google Discover and high-resolution mobile snippet rendering.
- [ ] **R17-5** | `[OPTIONAL]` | **Severity: Low** | Disallow crawling of internal search result URLs and query parameter filters.
- [ ] **R18-5** | `[OPTIONAL]` | **Severity: Low** | Provide image sitemap tags (`<image:image>`) for key service illustrations.
- [ ] **R19-5** | `[OPTIONAL]` | **Severity: Low** | Embed `FAQPage` schema on dedicated FAQ components to earn expandable SERP rich results.
- [ ] **R22-4** | `[OPTIONAL]` | **Severity: Low** | Use `dns-prefetch` and `preconnect` for external origins (e.g. Google Fonts or CDN endpoints).
- [ ] **R24-4** | `[OPTIONAL]` | **Severity: Low** | Submit domain to HSTS preload list (`includeSubDomains; preload`).
- [ ] **R31-4** | `[OPTIONAL]` | **Severity: Low** | Add `og:locale:alternate` tags if multilingual pages are introduced in future releases.
- [ ] **R32-4** | `[OPTIONAL]` | **Severity: Low** | Include adaptive SVG favicon styling switching colors between light and dark browser themes.
- [ ] **R35-5** | `[OPTIONAL]` | **Severity: Low** | Host static IndexNow API key verification file in `/public/[key].txt` for direct API curl pushes.
