# 06 H3–H6 and Heading Hierarchy
Last researched: 2026-11-10 | Tier: B

## Purpose
Heading tags `<h3>` through `<h6>` represent subordinate structural sub-levels that further divide content beneath `<h2>` sections. A correct, unbroken heading hierarchy organizes complex documents into granular, scannable subtopics, enables screen reader navigation for WCAG 2.1 accessibility compliance, guides search engine crawlers through document outlines, and provides extraction anchors for AI Overviews and passage indexing.

## Google Guidelines [OFFICIAL]
According to Google Search Central and John Mueller:
- Headings are structural signposts used to understand the topical flow and context of a document.
- Google does not penalize pages algorithmically for deep heading hierarchies (H4–H6) or minor structural irregularities; however, over-nesting is often a symptom of poor user readability.
- Headings should never be used purely for visual presentation or CSS styling (e.g. choosing an H4 because it has a smaller default font size).
- The defunct HTML5 outline algorithm (relying on independent H1 tags inside every `<section>` or `<article>`) was never supported by browsers or assistive technologies; Google and WCAG rely on explicit, sequential heading tags (H1 -> H2 -> H3).
- Keyword stuffing across subheadings (H3–H6) violates Google Search Essentials spam policies and can trigger algorithmic demotions via Spam Updates and Helpful Content quality systems.
- FAQ rich results on SERPs have been deprecated by Google for standard commercial sites, but well-structured H3 FAQ questions and semantic accordions remain valuable for AI Overviews and passage indexing.

## Limits and Sizes
- **Google Official Limit:** No official limit. Google imposes no ceiling on the number or depth of heading tags.
- **Recommended Hierarchy Depth [RECOMMENDED]:** Stick to H1 -> H2 -> H3 for standard content and service pages. Reserve H4 for deeply nested technical documentation. Avoid H5 and H6 in general marketing pages as they fragment readability.
- **Recommended Length [RECOMMENDED]:** 20 to 70 characters per subheading. Keep them concise and informative.

## Validation Rules
- `R06-1` Heading tags must follow a sequential descending order; never skip downward (e.g. `<h1>` directly to `<h3>`, or `<h2>` directly to `<h4>`) | [RECOMMENDED] | severity: High
- `R06-2` Any `<h3>` through `<h6>` element must not be empty or contain only whitespace or decorative markup | [OFFICIAL] | severity: Critical
- `R06-3` Global template boilerplate in footers, sidebars, and navigation menus must not use heading tags (or if unavoidable, must use low-tier tags like `<h6>` or `<p class="widget-title">`) to prevent polluting the main content outline | [RECOMMENDED] | severity: Medium
- `R06-4` Subheadings `<h3>`–`<h6>` must not be stuffed with repetitive target keywords or location variants | [OFFICIAL] | severity: High
- `R06-5` Headings must use native semantic HTML tags (`<h3>`, `<h4>`) rather than generic `<div>` or `<span>` tags styled with CSS classes | [RECOMMENDED] | severity: High
- `R06-6` When card grids (e.g. service lists, portfolio items) use `<h3>` for item titles, they must logically sit beneath an overarching `<h2>` section header and wrap each item in an `<article>` | [RECOMMENDED] | severity: Low

## Good Examples
```html
<section>
  <h2>Windows Computer Troubleshooting</h2>
  <article>
    <h3>Slow Laptop Optimization</h3>
    <p>Step-by-step diagnostic process to speed up boot times...</p>
  </article>
  <article>
    <h3>Blue Screen & Boot Error Fixes</h3>
    <p>Troubleshooting critical Windows startup failures...</p>
  </article>
</section>
```

## Bad Examples
```html
<!-- Skipped H2 level, empty H3, and footer widget styled as H3 -->
<h1>HelpIt Services</h1>
<h3>Windows Laptop Fix</h3> <!-- Fails R06-1: skipped H2 -->
<h3></h3> <!-- Fails R06-2: empty tag -->
<footer>
  <h3>Quick Links</h3> <!-- Fails R06-3: boilerplate footer using H3 -->
</footer>
```

## Common Mistakes
1. Skipping heading levels (jumping from H2 to H4 because H3 default font size was too large in styling).
2. Using `<h3>` tags for global footer links ("About Us", "Legal", "Follow Us"), which injects boilerplate into the core semantic document outline on every page.
3. Automated template bugs where an empty custom field outputs `<h3></h3>` into the DOM.
4. Using an excessive heading depth (down to H6) for simple marketing pages, creating an overly complex and fragmented document outline.
5. Stuffing every H3 with the exact primary keyword phrase.

## Implementation (for Astro / Tailwind Stack)
In Astro layouts and components:
1. Ensure the footer uses standard paragraphs or spans styled with Tailwind:
   ```astro
   <!-- src/components/Footer.astro -->
   <footer class="bg-slate-900 text-slate-300 py-12">
     <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
       <div>
         <!-- Do NOT use H3 for footer widget titles -->
         <p class="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</p>
         <ul class="mt-4 space-y-2">...</ul>
       </div>
     </div>
   </footer>
   ```
2. In service grid components, wrap each card in an `<article>` with an `<h3>` that cleanly descends from the section `<h2>`:
   ```astro
   <!-- src/components/ServiceGrid.astro -->
   <section>
     <h2 class="text-3xl font-bold">Available Services</h2>
     <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
       {services.map(service => (
         <article class="p-6 bg-white rounded-lg shadow-sm">
           <h3 class="text-xl font-semibold text-slate-800">{service.title}</h3>
           <p class="mt-2 text-slate-600">{service.description}</p>
         </article>
       ))}
     </div>
   </section>
   ```

## How to Test and Verify
1. **Automated Heading Outline Crawler:** Run an HTML parser across built output to verify:
   - No skipped levels downward (e.g. sequence check on heading levels).
   - Zero empty `<h3>`–`<h6>` tags.
   - No `<h3>` or higher tags present inside `<footer>` elements.
2. **Accessibility Linters:** Test with Axe DevTools / Lighthouse Accessibility to verify WCAG 2.1 Criterion 1.3.1 (Heading sequence).
3. **HeadingsMap Extension:** Visually inspect the rendered document tree to verify it reads like a coherent table of contents.

## Official vs General Advice
- **Official (Google):** John Mueller states that Google is forgiving and does not algorithmically penalize sites for skipped heading levels or deep nesting; it parses headings contextually based on the DOM.
- **General SEO & Accessibility Advice:** Maintain a strict, sequential outline without skips. WCAG 2.1 screen readers depend on unbroken hierarchies, and search engines map passage relevance much more cleanly when sub-sections strictly descend from parent topics.

## Research Log
| Query | Date | Source URL | What it Confirmed |
|---|---|---|---|
| Google Search Central heading hierarchy H3 H4 H5 H6 guidelines | 2026-11-10 | https://developers.google.com / https://yoast.com | Confirmed official Google heading guidance: use H3–H6 sequentially to divide sections, never skip levels downward, use headings for structure not styling, and avoid keyword stuffing. |
| does Google penalize H4 H5 H6 deep heading hierarchy SEO John Mueller | 2026-11-10 | https://seroundtable.com | Confirmed John Mueller stated Google does not penalize deep heading levels (H4–H6), but excessive deep nesting is a waste of time and harms human readability. |
| WCAG 2.1 heading hierarchy criteria screen readers accessibility H1 H2 H3 H4 | 2026-11-10 | https://accessibility.com / https://barrierbreak.com | Confirmed WCAG 2.1 Criteria 1.3.1 (Info and Relationships) and 2.4.6 (Headings & Labels); screen reader users jump sequentially by heading level, making unbroken hierarchy essential. |
| H3 headings FAQ accordion search snippets Google rich results | 2026-11-10 | https://developers.google.com / https://thefrankagency.com | Confirmed Google deprecated FAQ rich snippet accordions on SERPs for standard commercial sites, but semantic H3 questions remain crucial for AI Overviews and passage ranking. |
| headings in footer sidebar widgets SEO antipattern H3 H4 heading hierarchy | 2026-11-10 | https://moz.com / https://bestseo.sg | Confirmed using H3/H4 in footers and sidebars is an antipattern that breaks the document outline and injects boilerplate into semantic signals; recommend styling `<p>` or `<span>` tags via CSS. |
| card grids product service catalog item titles H3 headings SEO semantics | 2026-11-10 | https://ecomseo.co / https://uxdesign.cc | Confirmed catalog card titles should only use `<h3>` when nested under a clear `<h2>` section and wrapped in `<article>`; otherwise styled non-heading tags or links are preferred. |
| skipping heading levels H2 to H4 without H3 SEO audit accessibility | 2026-11-10 | https://allyway.ai / https://equalweb.com | Confirmed jumping from H2 to H4 without H3 triggers accessibility warnings, confuses screen reader users, and weakens topical clustering in automated crawlers. |
| empty H3 H4 heading tags audit SEO automated template fix | 2026-11-10 | https://equalizedigital.com / https://aamax.co | Confirmed empty subheadings disrupt document outlines and fail WCAG tests; must be detected via regex/axe-core and eliminated through template conditional checks. |
| HTML5 section article heading outline algorithm Google SEO support | 2026-11-10 | https://seroundtable.com / https://accessibility-developer-guide.com | Confirmed the HTML5 outline algorithm was abandoned by specs and never supported by Google or browsers; webmasters must use explicit sequential H1–H6 tags. |
| keyword stuffing subheadings H3 H4 H5 Google spam update helpful content penalty | 2026-11-10 | https://semrush.com / https://searchengineland.com | Confirmed stuffing repetitive keywords across subheadings violates Google Search Essentials spam policies and triggers algorithmic demotion under Spam Updates. |

## Sources (URLs)
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/essentials/spam-policies
- https://yoast.com/headings-use/
- https://seroundtable.com/google-deep-heading-hierarchy-32696.html
- https://accessibility-developer-guide.com/knowledge/html5-headings/
