# SEO Factor 12: Image ALT Text and Filenames

## Purpose
The `alt` (alternative text) attribute provides a machine-readable text equivalent for visual media. It serves two indispensable roles: accessibility (enabling screen-reader users, visually impaired individuals, and text-only browsers to perceive image content under WCAG 2.1 SC 1.1.1) and search engine indexation (allowing Googlebot and AI models to understand image context, subject matter, and entities for Google Images and rich search snippets). When an image functions as a clickable link, its `alt` text serves as the anchor text for that link. Image filenames provide an auxiliary crawling signal that establishes semantic relevance.

---

## Guidelines
1. **Universal Attribute Presence**: Every `<img>` element rendered in HTML must contain an `alt` attribute. Omitting the attribute entirely violates WCAG Failure F65 and causes screen readers to read the raw file name/URL aloud.
2. **Informative Alt Descriptions**: For informative images (e.g., service illustrations, technician photos, error screenshots), write concise, natural descriptions conveying the image's meaning and context within the page.
3. **Empty Alt for Decorative Images (`alt=""`)**: Purely aesthetic elements, background shapes, visual dividers, and icons placed immediately next to identical visible text labels must use an empty/null alt attribute (`alt=""` or `role="presentation"`), signaling assistive technologies to skip them silently.
4. **Linked Images as Anchor Text**: When an image is wrapped in an `<a>` tag, the `alt` text functions directly as the search anchor text. It must describe the destination or function of the link (e.g., `alt="HelpIt Home"` or `alt="Book computer repair service"`), not merely a physical description of the image.
5. **Eliminate Redundant Prefixes**: Never begin alt text with phrases like "Image of...", "Photo of...", or "Graphic showing...". Screen readers automatically prefix the announcement with "graphic" or "image".
6. **Sentence Structure & Punctuation**: End alt text with a period (`.`) so screen readers insert a natural auditory pause before resuming body text reading.
7. **Hyphenated, Lowercase Filenames**: Name image files using descriptive, lowercase keywords separated by hyphens (e.g., `remote-printer-driver-setup.webp`). Avoid underscores, camelCase, spaces, and automated camera defaults (`IMG_1024.jpg`).

---

## Limits & Constraints
- **Target Alt Text Length**: **80 to 125 characters** (typically 1 to 2 concise sentences).
- **Maximum Alt Text Ceiling**: Keep below **150 characters** for standard images. If a diagram requires deeper explanation, use a short summary in `alt` paired with an adjacent `<figcaption>` or `<table >`.
- **Filename Length**: Recommended **15 to 50 characters** (3 to 6 descriptive words).
- **Prohibited Characters in Filenames**: Never use spaces, underscores (`_` joins words into a single string in Google's index), uppercase letters, or special characters (`&`, `?`, `%`).
- **Keyword Density**: Never comma-stuff keywords into an `alt` tag (e.g., `alt="computer repair, pc support, dell repair, hp repair"`). Violates Google Search Essentials spam policies.

---

## Validation Rules
| Rule ID | Rule Name | Description | Severity | Pass Criteria |
|---|---|---|---|---|
| `R12-1` | Alt Attribute Presence | Every `<img>` tag must have an `alt` attribute (even if empty `alt=""`). | Critical | `alt` attribute exists on 100% of images. |
| `R12-2` | Informative Alt Text | Meaningful content images must have non-empty, descriptive alt text (> 5 characters). | High | Alt text describes image content; not whitespace or generic placeholder. |
| `R12-3` | Decorative Null Alt | Decorative or redundant icon images must use `alt=""` or `aria-hidden="true"`. | Medium | Decorative images marked with empty alt or aria-hidden. |
| `R12-4` | Linked Image Anchor Text | Images nested within `<a>` tags must have descriptive alt text defining destination/action. | Critical | Linked image has meaningful alt text; never empty unless adjacent text exists inside the `<a>`. |
| `R12-5` | No Redundant Prefixes | Alt text must not start with "image of", "photo of", "picture of", or "graphic of". | Low | Case-insensitive regex check `^(image\|photo\|picture\|graphic) of` fails. |
| `R12-6` | No Keyword Stuffing | Alt text must not consist of comma-separated keyword lists or repeated terms. | High | Free of comma-delimited keyword dumping; natural prose. |
| `R12-7` | Hyphenated Filenames | Image filenames must consist strictly of lowercase alphanumeric characters and hyphens. | Medium | Filename matches `^[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$`. |

---

## Good Examples

### Example 1: Informative Service Image & Linked Logo
```html
<!-- Informative Service Graphic -->
<img 
  src="/images/services/remote-desktop-diagnosis.webp" 
  alt="HelpIt IT specialist troubleshooting Windows blue screen error via secure remote screen share." 
  width="600" 
  height="400" 
  loading="lazy" 
/>

<!-- Linked Logo in Header (Acts as Anchor Text) -->
<a href="/" class="brand-link">
  <img 
    src="/images/brand/helpit-logo.svg" 
    alt="HelpIt Digital Solutions Homepage" 
    width="160" 
    height="40" 
  />
</a>
```
*Why this is good*: The service image specifies exact context with natural phrasing under 100 characters. The linked logo provides clear destination anchor text for Google and screen-reader users.

### Example 2: Complex Diagram with Figure and Figcaption
```html
<figure class="my-6">
  <img 
    src="/images/guides/wifi-router-troubleshooting-steps.webp" 
    alt="Four-step flow chart for resolving home WiFi connectivity dropouts. Detailed sequence described below." 
    width="800" 
    height="450" 
    loading="lazy" 
  />
  <figcaption class="text-sm text-gray-600 mt-2">
    <strong>Figure 1:</strong> Troubleshooting WiFi: 1. Restart optical fiber router, 2. Renew DHCP lease, 3. Flush DNS cache in cmd prompt, 4. Update network adapter drivers.
  </figcaption>
</figure>
```
*Why this is good*: Keeps the alt text brief and informative while providing complete programmatic and human-readable context in the semantic `<figcaption>`.

---

## Bad Examples

### Example 1: Missing Alt Attribute & Boilerplate Filename
```html
<!-- BAD: WCAG Failure F65, screen readers announce raw filename -->
<div class="card">
  <img src="/uploads/DCIM_0042_final_v2.PNG" width="400" height="300" />
  <h3>Doorstep Delhi Support</h3>
</div>
```
*Why this is bad*:
1. Missing `alt` attribute entirely.
2. Screen readers announce "DCIM_0042_final_v2.PNG".
3. Zero semantic signal for Googlebot.

### Example 2: Keyword Stuffed Alt Text and Underscore Filenames
```html
<!-- BAD: Spam policy violation and screen reader harassment -->
<img 
  src="/images/pc_repair_delhi_gurgaon_noida_support.webp" 
  alt="pc repair, computer service, laptop repair delhi, cheap pc repair ncr, best computer engineer doorstep" 
  width="500" 
  height="300" 
/>
```
*Why this is bad*:
1. Comma-separated keyword stuffing triggers SpamBrain / keyword stuffing penalties.
2. Underscores in filenames prevent Google from indexing keywords as separate words.
3. Terrible auditory experience for visually impaired visitors.

---

## Common Mistakes & Anti-Patterns
| Mistake / Anti-Pattern | Why It Fails | Correction |
|---|---|---|
| Omitting the `alt` tag on decorative images | Screen reader reads the image file path out loud. | Use `alt=""` so assistive tech skips it silently. |
| Starting alt with "Picture of..." | Redundant; screen readers already say "graphic/image". | Start immediately with the subject description. |
| Duplicate alt text across different images | Dilutes contextual uniqueness across pages. | Write tailored alt text for every unique image. |
| Using filename as alt text (`alt="service-banner.webp"`) | Lazy automated CMS injection; unhelpful to users and crawlers. | Write genuine natural language descriptions. |
| Empty alt on an icon-only button or link (`<a href="/cart"><img src="cart.svg" alt=""></a>`) | Creates an empty link with zero accessible name or anchor text. | Add descriptive alt text (`alt="Shopping Cart"`). |
| Alt text longer than 250 characters | Disrupts auditory navigation; poor UX. | Move deep explanations into visible paragraphs or `<figcaption>`. |

---

## How to Implement in HelpIt Stack (Astro 5 + Tailwind)
1. **Astro Image Component Enforcement**:
   Astro's `<Image />` component strictly requires an `alt` prop by default at compile-time:
   ```astro
   ---
   import { Image } from 'astro:assets';
   import laptopImg from '../assets/images/laptop-screen-repair.png';
   ---
   <Image 
     src={laptopImg} 
     alt="Technician repairing cracked laptop display hinge and ribbon cable" 
     width={600} 
     height={400} 
   />
   ```
   If `alt` is omitted in Astro, the compiler throws an error during `astro build`.
2. **Decorative Icon Marking**:
   When using SVG icons next to labels:
   ```astro
   <button class="flex items-center gap-2">
     <svg aria-hidden="true" class="w-5 h-5">...</svg>
     <span>Book On-Demand Support</span>
   </button>
   ```

---

## How to Verify / Test
1. **Lighthouse Accessibility Audit**:
   Run Chrome DevTools Lighthouse; verify rule `image-alt` passes with 100% score.
2. **axe DevTools Browser Extension**:
   Scan all rendered pages; ensure zero "Elements must have an alt attribute" violations.
3. **Automated Cheerio / Regex Crawler**:
   Run crawl check over `dist/**/*.html`:
   - Identify any `<img>` without an `alt` attribute.
   - Flag any `alt` containing "image of", "photo of", or repetitive commas.
   - Flag any image filename containing uppercase characters, spaces, or underscores.

---

## Official Documentation vs General SEO Advice
- **Google Search Central Official Stance**: Alt text is the primary signal for Google Images. Filenames and surrounding text provide supporting relevance. Keyword stuffing in alt text violates spam policies. When images are links, alt text serves as anchor text.
- **W3C / WCAG Standards**: SC 1.1.1 (Level A) mandates a text alternative for all non-text content. Purely decorative images must use `alt=""`. Informative images require equivalent textual meaning.

---

## Research Log
- **Date**: 2026-11-10
- **Queries Conducted**:
  1. `Google Search Central image alt text guidelines best practices official` (Source: `google.com`) — Outlined core Google Image guidelines: useful, information-rich, context-aware alt text, avoidance of keyword stuffing and filler prefixes.
  2. `WCAG 2.1 Success Criterion 1.1.1 Non-text Content image alt text rules` (Source: `equalweb.com`) — Clarified Level A requirements, Failure F65 (missing alt attribute), functional images, and images of text.
  3. `empty alt vs missing alt screen reader behavior decorative image SEO` (Source: `alttext.ai`) — Documented screen reader behavior: `alt=""` results in complete silence (correct for decorative images), whereas missing `alt` reads ugly filenames aloud.
  4. `optimal alt text length character limit screen reader cutoff Google SEO` (Source: `metagenius-ai-seo.com`) — Debunked the 125-character hard cutoff myth; confirmed sweet spot is 80–125 characters (1–2 concise sentences).
  5. `alt text keyword stuffing Google spam penalty Search Essentials` (Source: `semrush.com`) — Confirmed that alt text keyword stuffing violates Search Essentials spam policies and triggers SpamBrain suppression or manual actions.
  6. `image file name SEO best practices hyphens vs underscores Google Search Central` (Source: `google.com`) — Verified that Google treats hyphens as word separators and underscores as word joiners; lowercase alphanumeric formatting recommended.
  7. `image link alt text acts as anchor text Google SEO official` (Source: `google.com`) — Verified that Google officially parses alt text of linked images as the link's anchor text.
  8. `complex images charts diagrams alt text aria-describedby figcaption SEO accessibility` (Source: `w3.org`) — Detailed two-part text alternative method: concise alt text paired with `<figure>` / `<figcaption>` or `aria-describedby`.
  9. `service website technical support image alt text best practices examples SEO` (Source: `leadwalnut.com`) — Examined service catalog and technical support examples: error message screenshots, router diagrams, and UI buttons.
  10. `audit missing image alt text tools Lighthouse axe-core Screaming Frog rules` (Source: `screamingfrog.co.uk`) — Compared automated auditing rules across Lighthouse (`image-alt`), axe-core, and Screaming Frog image filters.

---

## Sources
- Google Search Central: Image SEO Best Practices (`https://developers.google.com/search/docs/appearance/google-images`)
- Google Search Central: Link Best Practices (`https://developers.google.com/search/docs/crawling-indexing/links-crawlable`)
- W3C: Web Content Accessibility Guidelines (WCAG) 2.1 - SC 1.1.1 (`https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html`)
- WebAIM: Alternative Text Guide (`https://webaim.org/techniques/alttext/`)
- Deque University: axe-core image-alt rule (`https://dequeuniversity.com/rules/axe/4.8/image-alt`)
