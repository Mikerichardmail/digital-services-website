# 05 H2 Headings
Last researched: 2026-11-10 | Tier: B

## Purpose
The HTML `<h2>` element defines second-level sectional headings dividing the main content beneath the `<h1>`. H2 headings organize the document into scannable subtopics, signal secondary keyword relevance and semantic entity relationships to search algorithms, serve as extraction targets for Featured Snippets and Passage Indexing, and provide critical navigational waypoints for WCAG screen readers and Table of Contents jump links.

## Google Guidelines [OFFICIAL]
According to Google Search Central and John Mueller:
- Headings (H2, H3, etc.) outline the content structure and help Google understand the topical hierarchy and relationships among sections.
- Google’s passage ranking algorithm evaluates modular blocks of text under subheadings, allowing specific sections of a page to rank for distinct long-tail queries.
- Maintain a logical heading order (H1 -> H2 -> H3). Skipping levels (e.g. H1 directly to H3) confuses accessibility tools and obscures topical hierarchy.
- Headings should be descriptive and informative rather than vague placeholders like "Introduction", "Overview", or "More Information".
- Avoid keyword stuffing in H2 tags (do not repeat lists of location or service keywords across subheadings).
- Do not use heading tags purely for presentation or font-size styling; use CSS classes for appearance and reserve `<h2>` for structural semantics.

## Limits and Sizes
- **Google Official Limit:** No official limit. Google imposes no restriction on the number or length of H2 tags.
- **Recommended Frequency [RECOMMENDED]:** Roughly 1 H2 heading for every 250 to 500 words of content.
- **Recommended Length [RECOMMENDED]:** 30 to 80 characters (roughly 6 to 15 words). Headings should be punchy and readable without stretching into full paragraphs.

## Validation Rules
- `R05-1` Content pages with more than 300 words should contain at least two descriptive `<h2>` headings dividing the body into logical sections | [RECOMMENDED] | severity: Medium
- `R05-2` An `<h2>` heading must not be empty or contain only whitespace or decorative icons | [OFFICIAL] | severity: Critical
- `R05-3` Heading hierarchy must be sequential; pages must not jump from `<h1>` directly to `<h3>` or `<h4>` without an intervening `<h2>` | [RECOMMENDED] | severity: High
- `R05-4` `<h2>` headings must not contain keyword stuffing or spammy repetitive query phrases | [OFFICIAL] | severity: High
- `R05-5` Major section headers must use native semantic `<h2>` elements rather than generic `<div>` or `<p>` tags styled with CSS classes | [RECOMMENDED] | severity: High
- `R05-6` Subheadings should incorporate secondary keywords, natural questions (PAA targeting), or semantic entity variations matching search intent | [RECOMMENDED] | severity: Low
- `R05-7` Long-form informational pages with multiple H2 sections should provide unique `id` attributes on `<h2>` elements to enable anchor jump links and potential SERP sitelinks | [OPTIONAL] | severity: Low

## Good Examples
- `<h2 id="windows-boot-troubleshooting">How to Fix Slow Windows Startup & Boot Errors</h2>` (64 chars, descriptive, keyword-rich, includes anchor ID)
- `<h2 id="included-services">What Is Included in Our Remote PC Support Package?</h2>` (62 chars, question format targeting PAA and passage ranking)
- `<h2 id="pricing-faq">Common Questions About Our ₹500 Pricing & Guarantees</h2>` (62 chars, entity-driven, transparent)

## Bad Examples
- `<h2></h2>` (empty H2 tag, violates WCAG 1.3.1 and confuses screen readers, fails R05-2)
- `<div class="text-2xl font-bold text-gray-900">Our Services</div>` (styled `<div>` lacks semantic H2 tag, fails R05-5)
- `<h2>Computer Repair Delhi, Best PC Repair Delhi, Windows Repair Delhi NCR</h2>` (blatant keyword stuffing, fails R05-4)
- An `<h1>` followed directly by `<h3>Features</h3>` with no `<h2>` on the page (broken hierarchy, fails R05-3)
- `<h2>Overview</h2>` (vague, generic placeholder missing all topical context)

## Common Mistakes
1. Skipping heading levels (jumping from H1 directly to H3 because H2 looked "too big" visually in CSS).
2. Using styled `<div>` elements instead of semantic `<h2>` in component libraries (e.g. Tailwind UI card headers).
3. Leaving empty `<h2>` containers when CMS fields or icon wrappers render without text.
4. Repeating identical generic H2s across all pages (e.g. "Services", "Details", "Contact Us").
5. Stuffing primary keywords into every single H2, causing algorithmic spam devaluation.

## Implementation (for Astro / Tailwind Stack)
In Astro, use semantic `<h2>` elements styled directly with Tailwind classes and auto-generated slug IDs:
```astro
---
// src/components/ServiceSection.astro
interface Props {
  id: string;
  title: string;
}

const { id, title } = Astro.props;
---
<section class="py-10 border-b border-slate-100">
  <!-- Semantic H2 with anchor id and responsive Tailwind styles -->
  <h2 id={id} class="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight scroll-mt-20">
    {title}
  </h2>
  <div class="mt-4 text-slate-600 leading-relaxed">
    <slot />
  </div>
</section>
```

## How to Test and Verify
1. **Automated Crawl:** Extract all heading tags (`h1`, `h2`, `h3`) across built HTML pages to verify sequential order (no H1 -> H3 skips), check for empty H2s, and inspect heading text lengths.
2. **Accessibility Audit:** Run Lighthouse Accessibility to verify proper document outline and WCAG 2.1 compliance.
3. **Snippet & PAA Check:** Search for target long-tail questions on Google to assess whether concise 40–60 word answer blocks under H2s are qualifying for Featured Snippets.

## Official vs General Advice
- **Official (Google):** John Mueller states that Google's parser does not break or penalize pages for irregular heading structures or skipped levels. Headings are contextual outlines, not direct ranking multipliers.
- **General SEO Advice:** Maintain strict H1 -> H2 -> H3 hierarchy without exception. H2s are primary drivers for passage ranking, Featured Snippets, and WCAG accessibility, and should appear every 250–500 words with descriptive secondary keywords.

## Research Log
| Query | Date | Source URL | What it Confirmed |
|---|---|---|---|
| Google Search Central H2 headings subheadings content structure guidelines | 2026-11-10 | https://developers.google.com / https://yoast.com | Confirmed official Google heading guidance: use H2s to break content into logical thematic sections, improve scannability, assist screen readers, and provide contextual signposts for crawling. |
| Google featured snippets passage ranking H2 headings subheadings SEO | 2026-11-10 | https://growthpulsemedia.co.za / https://semrush.com | Confirmed Google extracts Featured Snippets and Passage Rankings directly from text blocks beneath question-based H2/H3 subheadings when answers are concise (40–60 words). |
| how many H2 headings per page word count frequency SEO best practice | 2026-11-10 | https://upnorthmedia.co / https://brandstory.in | Confirmed no official count limit exists; industry best practice is roughly 1 H2 for every 250–500 words to prevent walls of text and maintain reader engagement. |
| secondary keywords semantic entities in H2 headings SEO best practice | 2026-11-10 | https://w3era.com / https://alliai.com | Confirmed mapping secondary keywords and semantic entities (concepts, tools, attributes) across H2 tags signals topical depth without keyword stuffing. |
| table of contents jump links H2 id anchor links Google search results sitelinks | 2026-11-10 | https://hubspot.com / https://scalpellabs.ai | Confirmed pairing unique H2 IDs with a Table of Contents enables browser anchor scrolling, reduces bounce rates, and helps Google generate SERP in-page jump sitelinks. |
| question based H2 headings People Also Ask SEO PAA ranking practice | 2026-11-10 | https://altagency.co.uk / https://seosherpa.com | Confirmed framing H2s as natural questions matching Google's People Also Ask (PAA) queries with reverse-pyramid direct answers maximizes SERP snippet capture. |
| generic H2 headings empty H2 tags SEO impact Google crawlability | 2026-11-10 | https://aamax.co / https://seoclarity.net | Confirmed empty H2 tags waste semantic real estate and confuse screen readers; generic H2s ("Overview", "Details") squander keyword context and passage indexing opportunities. |
| H2 heading character count length best practices SEO | 2026-11-10 | https://mqlmagnet.com / https://screamingfrog.co.uk | Confirmed recommended H2 length is 30 to 80 characters (8 to 15 words) for scannability and context without becoming unwieldy text blocks. |
| skipping heading levels H1 to H3 without H2 Google SEO accessibility WCAG | 2026-11-10 | https://accessknight.com / https://boia.org | Confirmed skipping heading levels violates WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships); causes screen reader navigation errors; must use CSS for font styling rather than skipping HTML tags. |
| semantic h2 HTML5 vs div class h2 Tailwind React Astro SEO accessibility | 2026-11-10 | https://dashweb.agency / https://searchatlas.com | Confirmed styled `<div>` elements are invisible to search heading hierarchies and screen reader shortcuts; modern component frameworks must use native `<h2>` with utility classes. |

## Sources (URLs)
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://yoast.com/headings-use/
- https://semrush.com/blog/h2-tag/
- https://accessknight.com/skipping-heading-levels/
- https://screamingfrog.co.uk/h2-headings/
