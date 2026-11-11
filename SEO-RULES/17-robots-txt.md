# SEO Factor 17: robots.txt

## Purpose
The `robots.txt` file is an authoritative, plain-text control document placed at the root of a domain adhering to the Robots Exclusion Protocol (REP / RFC 9309). It instructs automated web crawlers (such as Googlebot, Bingbot, and AI agents) which URLs and directories they are permitted or forbidden from requesting. By managing crawler access, `robots.txt` conserves server resources, streamlines crawl budget toward high-priority commercial content, prevents crawlers from requesting infinite parameter loops, and exposes the location of XML sitemaps. Misconfigurations in `robots.txt`—such as blocking critical styling resources or attempting to use it for de-indexing—can devastate site rankings.

---

## Guidelines
1. **Root Placement & Exact Naming**:
   The file must reside strictly at the root of the domain: `https://helpit.in/robots.txt`. A file named `Robots.TXT` or located in a subdirectory (e.g., `/assets/robots.txt`) is completely ignored by search engines.
2. **Valid RFC 9309 Directives Only**:
   Google recognizes strictly four directives:
   - `User-agent:` (Identifies the target bot)
   - `Disallow:` (Blocks access to a specific URL path or prefix)
   - `Allow:` (Permits access to a sub-path within a disallowed parent)
   - `Sitemap:` (Provides the absolute URL to an XML sitemap)
3. **Never Block CSS, JavaScript, or Images**:
   Googlebot utilizes an evergreen headless browser to render pages. Disallowing CSS, JS, or image directories prevents Googlebot from evaluating visual layout, font legibility, and mobile-friendliness, triggering severe algorithmic rendering penalties.
4. **Never Use `robots.txt` for De-indexing (`noindex` is Retired)**:
   Google officially retired support for `noindex` rules in `robots.txt` in 2019. If a page is blocked via `Disallow`, Googlebot cannot crawl it to see an on-page `noindex` meta tag, frequently leading to the URL being indexed anyway via external anchor text as *"Indexed, though blocked by robots.txt"*.
5. **Absolute URL for Sitemap Directive**:
   Declare the sitemap using a fully qualified absolute URL: `Sitemap: https://helpit.in/sitemap-index.xml`. Relative paths are invalid.
6. **Specificity & Precedence**:
   When matching URL paths, crawlers follow the most specific (longest) matching rule. If an `Allow` and `Disallow` rule have identical path lengths, `Allow` takes precedence.
7. **`crawl-delay` is Ignored by Google**:
   Googlebot does not honor `crawl-delay:`. Crawl rate adjustments must be managed via Google Search Console settings.
8. **Modern AI Bot Management**:
   Optionally separate AI model training crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`) from search/retrieval crawlers (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) based on the site's intellectual property and AI visibility strategy.

---

## Limits & Constraints
- **Maximum File Size**: Google processes only the first **500 KiB** of `robots.txt`. Any rules past 500 KiB are ignored.
- **Encoding**: Must be plain text encoded in **UTF-8** (ASCII is a subset of UTF-8).
- **HTTP Status Code**: Must return HTTP **200 OK**. A 404 response means "allow all". A 5xx server error causes Googlebot to halt crawling entirely until the server recovers.
- **Path Case Sensitivity**: Paths are case-sensitive (`/admin/` is distinct from `/Admin/`).
- **Wildcard Syntax**: Supports `*` (matches zero or more characters) and `$` (matches end of URL string).

---

## Validation Rules
| Rule ID | Rule Name | Description | Severity | Pass Criteria |
|---|---|---|---|---|
| `R17-1` | Root Accessibility | `robots.txt` must be accessible at `https://helpit.in/robots.txt` returning 200 OK. | Critical | HTTP status code is 200. |
| `R17-2` | No CSS/JS Blocking | Stylesheets (`*.css`) and scripts (`*.js`) must not be blocked by any `Disallow` rule. | Critical | CSS/JS paths are crawlable. |
| `R17-3` | Valid Sitemap Directive | File must include at least one valid `Sitemap:` line with an absolute `https://` URL. | High | `Sitemap: https://helpit.in/sitemap-index.xml` present. |
| `R17-4` | File Size Ceiling | Total file size must remain well below 500 KiB (target < 10 KB). | High | File size < 500 KiB. |
| `R17-5` | No Deprecated Noindex | File must NOT contain `noindex:` lines (unsupported since 2019). | High | Case-insensitive regex `^noindex:` has 0 matches. |
| `R17-6` | Clean Path Syntax | Disallow paths must start with a forward slash `/` (or `*`). | Medium | All path values begin with `/`. |
| `R17-7` | UTF-8 Encoding | File must be encoded in UTF-8 without byte order marks (BOM). | Medium | Valid UTF-8 encoding confirmed. |

---

## Good Examples

### Example 1: Standard Production `robots.txt` for HelpIt (Astro + Cloudflare)
```text
# https://helpit.in/robots.txt
# Standard Robots Exclusion Protocol for HelpIt Digital Solutions

User-agent: *
Allow: /

# Disallow private operational endpoints and internal search queries
Disallow: /api/
Disallow: /admin/
Disallow: /checkout/success
Disallow: /cdn-cgi/
Disallow: /*?*query=
Disallow: /*?*utm_*=

# Ensure vital static assets remain crawlable
Allow: /_astro/*.css
Allow: /_astro/*.js
Allow: /images/

# XML Sitemap Declaration
Sitemap: https://helpit.in/sitemap-index.xml
```
*Why this is good*: Universally allows all legitimate crawlers, protects private utility routes without blocking assets, preserves access to Astro compiled CSS/JS in `/_astro/`, and declares the absolute production sitemap URL.

### Example 2: AI Training Control while Preserving AI Search Citations
```text
User-agent: *
Allow: /

# Block AI foundational training scrapers (optional IP protection)
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# Allow AI Search Engines for live user citations
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://helpit.in/sitemap-index.xml
```
*Why this is good*: Disallows bots that scrape content for model training while ensuring modern conversational search engines can access and cite HelpIt in real-time answers.

---

## Bad Examples

### Example 1: Blocking CSS and JS Assets
```text
# BAD: Triggers algorithmic rendering penalties and mobile-usability failures
User-agent: *
Disallow: /_astro/
Disallow: /scripts/
Disallow: /styles/
```
*Why this is bad*: Prevents Google's headless Chromium from loading stylesheets and JavaScript, rendering the page unstyled and causing Googlebot to treat it as broken.

### Example 2: Relative Sitemap and Unsupported Directives
```text
# BAD: Invalid syntax, relative sitemap, and ignored directives
User-agent: Googlebot
Crawl-delay: 10
noindex: /private-page/
Sitemap: /sitemap.xml
```
*Why this is bad*:
1. `Crawl-delay:` is completely ignored by Googlebot.
2. `noindex:` in `robots.txt` has been unsupported and ignored since 2019.
3. `Sitemap: /sitemap.xml` is relative and will be discarded by crawlers.

---

## Common Mistakes & Anti-Patterns
| Mistake / Anti-Pattern | Why It Fails | Correction |
|---|---|---|
| Blanket `Disallow: /` left after staging deployment | De-indexes the entire site from Google Search. | Ensure `public/robots.txt` on production allows `/`. |
| Disallowing CSS/JS directories | Googlebot cannot render layout; suppresses mobile rankings. | Explicitly `Allow:` asset directories. |
| Using `noindex:` inside `robots.txt` | Ignored by Google since 2019. | Use `<meta name="robots" content="noindex">` on crawlable pages. |
| Using relative URLs for `Sitemap:` | Discarded by search engines. | Use fully qualified absolute URL (`https://helpit.in/...`). |
| Disallowing a URL you want de-indexed | Googlebot cannot crawl it to see the `noindex` tag. | Remove URL from `robots.txt` and add `noindex` to the page. |
| Adding decorative comments pushing file over 500 KiB | Google truncates processing at 500 KiB; subsequent rules fail. | Keep file lean (< 5 KB). |

---

## How to Implement in HelpIt Stack (Astro 5 + Cloudflare)
1. **Static File in `public/robots.txt`**:
   In an Astro project, place the production `robots.txt` directly in `public/robots.txt`. During `npm run build`, Astro copies it unaltered to `dist/robots.txt`.
2. **Dynamic Generation Alternative (`src/pages/robots.txt.ts`)**:
   ```typescript
   import type { APIRoute } from 'astro';

   export const GET: APIRoute = ({ site }) => {
     const sitemapURL = new URL('sitemap-index.xml', site || 'https://helpit.in');
     const content = `User-agent: *
   Allow: /
   Disallow: /api/
   Disallow: /checkout/success

   Sitemap: ${sitemapURL.href}
   `;

     return new Response(content, {
       headers: {
         'Content-Type': 'text/plain; charset=utf-8',
         'Cache-Control': 'public, max-age=86400'
       }
     });
   };
   ```

---

## How to Verify / Test
1. **Live URL Fetch**:
   ```powershell
   curl.exe -I https://helpit.in/robots.txt
   curl.exe https://helpit.in/robots.txt
   ```
   Verify 200 OK response and correct UTF-8 text headers.
2. **Google Search Console robots.txt Tester**:
   Open Search Console -> Settings -> robots.txt:
   - Verify Googlebot fetched the latest version.
   - Test URLs: `/`, `/services/`, `/_astro/styles.css`.
   - Verify `/` is Allowed and no assets are Blocked.
3. **Automated Crawler Validation**:
   Screaming Frog automatically parses `robots.txt` during site crawls and flags any disallowed internal assets.

---

## Official Documentation vs General SEO Advice
- **Google Search Central Official Stance**: Google enforces RFC 9309. Google recognizes strictly `User-agent`, `Disallow`, `Allow`, and `Sitemap`. `crawl-delay` and `noindex` are unsupported. File size is capped at 500 KiB. Disallowing CSS/JS impairs rendering and damages rankings.
- **Industry Standards**: Place sitemap at the bottom. Separate AI model training bots from search bots. Keep file clean, minimal, and free of redundant rules.

---

## Research Log
- **Date**: 2026-11-10
- **Queries Conducted**:
  1. `Google Search Central robots.txt official specifications syntax guide` (Source: `google.com`) — Outlined RFC 9309 specifications, 500 KiB limit, UTF-8 requirement, case-sensitivity, and four supported directives (`User-agent`, `Disallow`, `Allow`, `Sitemap`).
  2. `robots.txt sitemap directive syntax multiple sitemaps absolute URL Google official` (Source: `google.com`) — Verified that the `Sitemap:` directive requires absolute URLs; multiple lines or sitemap index files are fully supported.
  3. `Google ignores crawl-delay noindex in robots.txt Search Central official` (Source: `stanventures.com`) — Confirmed Google officially retired `noindex` in `robots.txt` in 2019 and ignores `crawl-delay`.
  4. `robots.txt disallow css js images Googlebot rendering penalty official` (Source: `searchenginejournal.com`) — Documented Google's official warning: disallowing CSS, JS, or images directly impairs Google's headless browser rendering, causing algorithmic ranking penalties.
  5. `Astro static site robots.txt best practices Cloudflare Pages sitemap` (Source: `astro.build`) — Examined Astro implementation approaches (`public/robots.txt` vs `src/pages/robots.txt.ts`) and Cloudflare Pages deployment considerations.

---

## Sources
- Google Search Central: Robots.txt Introduction & Specification (`https://developers.google.com/search/docs/crawling-indexing/robots/intro`)
- Google Search Central: Manage Crawling of CSS & JS (`https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`)
- IETF RFC 9309: Robots Exclusion Protocol (`https://www.rfc-editor.org/rfc/rfc9309.html`)
- Sitemaps.org Protocol (`https://www.sitemaps.org/protocol.html`)
- Astro Docs: Static Assets & Robots.txt (`https://docs.astro.build/en/guides/integrations-guide/sitemap/`)
