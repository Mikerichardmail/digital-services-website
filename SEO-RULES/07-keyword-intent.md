# 07 Keyword Targeting and Search Intent
Last researched: 2026-11-10 | Tier: B

## Purpose
Keyword targeting and search intent optimization align a webpage’s content, layout, and calls-to-action with the specific goal of a searching user. Modern search algorithms (powered by BERT, MUM, and Neural Matching) prioritize satisfying user intent over matching exact keyword strings. Accurately classifying and matching intent (Informational, Commercial, Transactional, Navigational) maximizes conversion rates, prevents keyword cannibalization, and establishes topical relevance.

## Google Guidelines [OFFICIAL]
According to Google Search Central and the Search Quality Rater Guidelines:
- Focus on "people-first content" created to satisfy human needs rather than search-engine-first content created to manipulate rankings.
- User queries fall into core intent categories: Informational ("Know/Know Simple"), Navigational ("Go"), Transactional ("Do"), and Commercial Investigation.
- Query satisfaction is evaluated on the "Needs Met" scale: content that directly and completely satisfies a query without forcing users to bounce back to Google to search again receives high quality ratings.
- Keyword density is an explicit myth; John Mueller confirmed Google has no concept of optimal keyword density and does not count word percentages.
- Keyword cannibalization (multiple pages on a site competing for the exact same query intent) dilutes ranking signals; sites should consolidate overlapping pages, use canonical tags, or refocus conflicting pages to distinct intents.
- AI Overviews and conversational search rely on "query fan-out" and natural language processing, rewarding pages that provide structured, modular, authoritative answers to complex user needs.

## Limits and Sizes
- **Google Official Limit:** No official keyword count, density percentage, or repetition limit.
- **Keyword Density [RECOMMENDED]:** No target percentage. Write naturally; repeating keywords unnaturally risks triggering Google's automated spam filters.
- **Page Intent Mapping [RECOMMENDED]:** Exactly one primary intent per page. Do not attempt to make a single landing page simultaneously serve top-of-funnel informational research and direct bottom-of-funnel checkout.

## Validation Rules
- `R07-1` Every indexable page must target a defined primary search intent (Informational, Commercial, or Transactional) matching its layout format | [OFFICIAL] | severity: High
- `R07-2` The primary keyword/topic must appear naturally in the `<title>`, `<h1>`, and opening 100 words of body content | [RECOMMENDED] | severity: High
- `R07-3` Content must not contain keyword stuffing, unnatural keyword frequency, or robotic comma-separated query variations | [OFFICIAL] | severity: Critical
- `R07-4` There must be no internal keyword cannibalization; two or more URLs on the site must not target the exact same primary search intent | [RECOMMENDED] | severity: High
- `R07-5` Service and landing pages targeting geographic intent (e.g. India, specific cities) must feature authentic, localized content rather than thin duplicate city templates | [OFFICIAL] | severity: High
- `R07-6` Pages must satisfy user query intent directly and comprehensively, minimizing bounce rates and secondary searches | [RECOMMENDED] | severity: Medium

## Good Examples
- **Transactional Service Page:** `/services/windows-computer-support/`  
  *Intent:* Transactional ("hire PC support online", "remote Windows repair India").  
  *Structure:* Clear pricing (₹500), scope checklist, turnaround time, WhatsApp/book button, customer guarantees.
- **Commercial Investigation Solution:** `/solutions/slow-pc-windows-troubleshooting/`  
  *Intent:* Commercial ("how to fix slow laptop vs get professional help").  
  *Structure:* Diagnostic steps, comparison of DIY vs remote expert assistance, transparent fee structure.
- **Localized Landing Page:** `/locations/delhi/`  
  *Intent:* Localized commercial/transactional ("remote PC support Delhi NCR").  
  *Structure:* Specific coverage areas (South Delhi, Noida, Gurgaon), local response times, localized FAQ.

## Bad Examples
- Writing a 3,000-word generic history of operating systems on a checkout page where users want an immediate ₹500 remote repair (intent mismatch, fails R07-1).
- Publishing 15 separate pages: `/pc-repair-delhi/`, `/laptop-repair-delhi/`, `/computer-repair-delhi-ncr/` with identical text where only the city keyword changes (thin doorway spam and cannibalization, fails R07-4, R07-5).
- Repeating the phrase "remote computer support India" 25 times in a 300-word page to hit a fake 8% keyword density quota (fails R07-3).

## Common Mistakes
1. Obsessing over keyword density tools (e.g. Yoast "green bullets" for keyword percentage) instead of writing comprehensive, natural explanations.
2. Creating duplicate thin city landing pages that only swap out the city name, triggering Google Helpful Content penalties.
3. Allowing multiple service pages to compete for the same query intent (e.g. `/services/windows-computer-support/` and `/solutions/slow-pc-windows-troubleshooting/` both targeting "fix slow windows pc").
4. Forcing commercial pitches into purely informational guides or hiding pricing on transactional pages.

## Implementation (for HelpIt Stack)
1. Map every route in `src/pages` to a clear search intent:
   - `/services/[category].astro`: Transactional (direct booking, transparent pricing from ₹500, booking form).
   - `/solutions/[slug].astro`: Commercial / Problem-solving (explains the symptom, provides quick self-check, offers HelpIt rescue service).
   - `/locations/[city].astro`: Localized transactional (specifies on-site home visit availability for ₹1,000 extra + remote coverage).
2. Incorporate primary keywords and related entities naturally into frontmatter metadata:
   ```astro
   ---
   // src/pages/services/windows-computer-support.astro
   const serviceData = {
     title: "Remote Windows Computer Support & Repair Services | HelpIt",
     metaDescription: "Get expert remote Windows troubleshooting, update error fixes, and slow PC optimization across India from ₹500. Fast online assistance.",
     primaryKeyword: "remote windows computer support",
     intent: "transactional",
     entities: ["Windows 11", "boot error", "driver installation", "remote desktop", "India"]
   };
   ---
   ```

## How to Test and Verify
1. **SERP Intent Audit:** Search target keywords on Google to observe current ranking formats (are competitors showing pricing calculators, step-by-step guides, or product listings?).
2. **Google Search Console Cannibalization Check:** Filter queries in Performance report; inspect whether multiple pages receive impressions for the exact same query.
3. **Keyword Placement Verification:** Run automated script checking that the primary topic appears in `<title>`, `<h1>`, and first 100 words of rendered HTML.

## Official vs General Advice
- **Official (Google):** John Mueller and Google documentation explicitly reject keyword density metrics and mechanical keyword quotas. Google ranks content based on whether it satisfies human search intent ("Needs Met") and exhibits genuine topical depth.
- **General SEO Advice:** Industry practice recommends placing the primary keyword in the title, H1, URL slug, and first paragraph, while distributing semantic entity terms across subheadings to provide clear topical signposts for search bots.

## Research Log
| Query | Date | Source URL | What it Confirmed |
|---|---|---|---|
| Google Search Central search intent user query satisfaction guidelines | 2026-11-10 | https://developers.google.com / https://keywordinsights.ai | Confirmed Search Quality Rater Guidelines "Needs Met" scale; queries classified into Know, Do, Go; content must satisfy intent completely without secondary searches. |
| 4 types of search intent informational navigational commercial transactional SERP features mapping | 2026-11-10 | https://semrush.com / https://devbytedaily.com | Confirmed 4 primary intents and SERP feature correlations: Informational -> Featured Snippets/AI Overviews; Commercial -> Comparison tables/reviews; Transactional -> Shopping/booking forms; Navigational -> Sitelinks/Knowledge Panels. |
| keyword cannibalization causes identification fix Google Search Central | 2026-11-10 | https://semrush.com / https://morningscore.io | Confirmed cannibalization splits backlinks and ranking equity; resolved via content consolidation, 301 redirects, canonical tags, or intent differentiation. |
| keyword density myth Google John Mueller semantic search entities SEO | 2026-11-10 | https://seroundtable.com / https://semrush.com | Confirmed John Mueller explicitly stated Google has no concept of keyword density; entity optimization and comprehensive topic coverage replace keyword percentage formulas. |
| Google BERT MUM natural language processing search intent matching SEO | 2026-11-10 | https://webtonic.io / https://pwskills.com | Confirmed BERT and MUM evaluate bidirectional sentence context and prepositions; search models match semantic concepts rather than exact phrase strings. |
| Google Search Central helpful content system people first search intent guidelines | 2026-11-10 | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | Confirmed Google rewards people-first content with demonstrated first-hand experience (E-E-A-T) and penalizes search-engine-first mass-produced content. |
| long tail vs short tail keywords search intent conversion rate SEO | 2026-11-10 | https://geeksforgeeks.org / https://quattr.com | Confirmed long-tail keywords represent >90% of searches, have high conversion rates due to clear intent, and are easier to rank for than ambiguous head terms. |
| keyword placement priority title tag H1 first 100 words SEO Google ranking | 2026-11-10 | https://clickrank.ai / https://semrush.com | Confirmed placement priority hierarchy: Title tag (highest) -> H1 tag -> First 100 words (introductory paragraph) -> Subheadings -> Body copy. |
| local search intent keywords city name modifiers Google SEO guidelines | 2026-11-10 | https://localfalcon.com / https://searchengineland.com | Confirmed explicit city modifiers require dedicated, unique location landing pages with LocalBusiness schema and distinct local proof points rather than duplicate templates. |
| AI Overviews search intent conversational queries query syntax shifts SEO Google | 2026-11-10 | https://finch.com / https://searchengineland.com | Confirmed conversational queries utilize query fan-out to extract structured, modular answers for multi-part intent, reducing traditional organic clicks on generic informational queries. |

## Sources (URLs)
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://semrush.com/blog/search-intent/
- https://seroundtable.com/google-on-keyword-density-again-33230.html
- https://searchengineland.com/how-ai-overviews-impact-search-intent-442890
