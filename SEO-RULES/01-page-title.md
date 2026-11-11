# 01 Page Title (`<title>`)
Last researched: 2026-11-10 | Tier: B

## Purpose
The HTML `<title>` tag specifies the title of a web page displayed in browser title bars, browser tabs, social preview cards, and crucially as the headline in search engine result snippets (the "title link"). It is a primary relevance signal used by Google to determine the topic of the document and plays a central role in user click-through rate (CTR).

## Google Guidelines [OFFICIAL]
According to Google Search Central ("Control your title links in search results"):
- Every page must have a `<title>` specified in the `<head>` element.
- Make title text descriptive, concise, and accurate to the page's contents.
- Avoid vague titles such as "Home" for the homepage or "Untitled".
- Avoid keyword stuffing (loading titles with repetitive lists of keywords/phrases).
- Avoid repeated or boilerplate text across pages (e.g. identical site-wide marketing slogans).
- Brand titles concisely (e.g., placing the brand at the beginning or end separated by a hyphen or pipe).
- Make sure Googlebot can crawl the page; if crawling is blocked by robots.txt, Google may still index the URL and generate a title purely from external anchor text.
- Google’s generation of title links in search results is completely automated; Google analyzes the `<title>`, visible `<h1>` headings, prominent text, and anchor text. If the `<title>` fails to accurately represent the content, Google will rewrite it.

## Limits and Sizes
- **Google Official Limit:** No official limit. Google does not specify a hard minimum or maximum character count.
- **Pixel Width Limit [RECOMMENDED]:** Max ~600px on desktop, ~520px–550px on mobile.
- **Recommended Character Length [RECOMMENDED]:** 50–60 characters (titles under ~50 characters may be too vague; titles over 60 characters or ~600px risk being truncated with an ellipsis `...` or algorithmically rewritten by Google).

## Validation Rules
- `R01-1` Every indexable page must contain exactly one non-empty `<title>` element inside `<head>` | [OFFICIAL] | severity: Critical
- `R01-2` Page title must be unique across all pages on the site (no duplicate titles) | [OFFICIAL] | severity: High
- `R01-3` Page title length must be between 30 and 60 characters (or under 600px desktop width) to prevent truncation or rewrites | [RECOMMENDED] | severity: Medium
- `R01-4` Page title must not contain keyword stuffing or comma-separated lists of query terms | [OFFICIAL] | severity: High
- `R01-5` Page title must not use repetitive boilerplate text across pages | [OFFICIAL] | severity: High
- `R01-6` Page title primary topic must align with the page's primary `<h1>` heading to prevent unwanted algorithmic title link replacement | [RECOMMENDED] | severity: High
- `R01-7` Brand name should be included consistently at the end (or start) separated by a clean delimiter (hyphen `-` or pipe `|`) | [RECOMMENDED] | severity: Low

## Good Examples
- `Remote Windows PC Repair & Tech Help | HelpIt India` (51 chars)
- `Emergency Document & PDF Formatting Assistance – HelpIt` (56 chars)
- `AI Tool Setup & Prompt Workflow Help | HelpIt` (45 chars)

## Bad Examples
- `Home` (too vague, fails R01-1 / R01-3)
- `HelpIt - Tech Help - Computer Repair - PDF Help - AI Setup - India` (keyword stuffing, fails R01-4)
- `Affordable Services | HelpIt - The Best Tech Solution in Delhi NCR for Every Problem Online` (88 chars, truncated, boilerplate suffix, fails R01-3, R01-5)
- `<title></title>` (empty title, fails R01-1)

## Common Mistakes
1. Believing Google enforces a strict 60-character hard cutoff (it is based on pixel width; wide characters like `W` and `M` truncate sooner).
2. Assuming `<title>` is always 100% displayed as written (Google rewrites over 60% of title links if titles are too long, mismatched with H1, or stuffed with keywords).
3. Duplicating the exact same title tag across multiple service or location landing pages.
4. Omitting the brand name, or making the brand name occupy 80% of the character budget.
5. Using multiple confusing separators (e.g. `HelpIt | Tech Help - Service - Now`).

## Implementation (for Astro / Static Site Stack)
In Astro, handle page titles dynamically through layout components:
```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const siteTitle = "HelpIt";
const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
---
<head>
  <meta charset="utf-8" />
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
</head>
```
Ensure individual `.astro` pages pass a clear, specific `title` prop without duplicating the site brand suffix.

## How to Test and Verify
1. **Automated Crawl:** Extract `<title>` from all HTML outputs using Node.js script or crawler, measuring length and checking uniqueness.
2. **SERP Snippet Simulator:** Test pixel width using SERP preview tools (e.g. Screaming Frog, ToTheWeb, or custom canvas text width measurement in pixels for Arial 18px / 20px).
3. **Google Search Console:** Inspect URL to see the indexed rendering, and monitor Performance report queries vs. impressions.

## Official vs General Advice
- **Official (Google):** There is no character limit. Google will never penalize a title solely for being 65 characters; it simply truncates or algorithmically rewrites title links to best match user queries.
- **General SEO Advice:** Industry tools rigidly enforce "50–60 characters" as a hard rule. The practical reason is maximizing SERP real estate without trigger rewrites or ellipsis truncation.

## Research Log
| Query | Date | Source URL | What it Confirmed |
|---|---|---|---|
| Google Search Central control your title links in search results | 2026-11-10 | https://developers.google.com/search/docs/appearance/title-link | Confirmed official Google title link guidelines: must have title, avoid boilerplate, avoid stuffing, concise branding, and that Google uses titles, H1, and anchors to auto-generate title links. |
| Google rewriting title links causes studies zyppy ahrefs | 2026-11-10 | https://zyppy.com / https://ahrefs.com | Confirmed Google rewrites ~61.6% of titles; when rewritten, >50% pull from the H1 tag; excessive length (>600px / >60 chars) and H1 mismatch are top rewrite triggers. |
| google title tag length pixel width desktop mobile limits | 2026-11-10 | https://webapex.com.au / https://screamingfrog.co.uk | Confirmed Google measures width by pixels (desktop ~600px, mobile ~520-550px), equivalent to ~50-60 characters depending on proportional letter widths. |
| title tag separator hyphen pipe dash SEO Google best practice | 2026-11-10 | https://developers.google.com / https://zyppy.com | Confirmed Google supports hyphens, pipes, and colons; Zyppy study found pipes rewritten/dropped ~40% vs hyphens ~20%; consistency is essential. |
| google search central boilerplate repeated text in title tags | 2026-11-10 | https://developers.google.com/search/docs/appearance/title-link | Confirmed boilerplate title text across pages harms UX, obscures unique page context, and reliably triggers automated Google title replacement. |
| Google Search Central spam policies keyword stuffing title tags | 2026-11-10 | https://developers.google.com/search/docs/essentials/spam-policies | Confirmed keyword stuffing in titles violates Google spam policies; leads to algorithmic title rewriting or ranking suppression/penalties. |
| Google title tag vs h1 tag difference mismatch SEO impact | 2026-11-10 | https://searchenginejournal.com / https://roborank.io | Confirmed title and H1 do not need to be identical word-for-word, but thematic mismatch causes Google to discard the title tag in favor of the H1. |
| missing empty duplicate title tags SEO crawlability Google Search Central | 2026-11-10 | https://semrush.com / https://quattr.com | Confirmed missing/empty titles waste crawl equity and surrender SERP CTR; duplicate titles cause keyword cannibalization and ambiguous ranking signals. |
| Astro js SEO dynamic title tags props head layouts | 2026-11-10 | https://docs.astro.build | Confirmed implementation pattern in Astro using BaseLayout props and `<head>` title templating. |
| emojis special characters in title tags SEO CTR Google search results | 2026-11-10 | https://searchenginejournal.com / https://searchpilot.com | Confirmed emojis are not direct ranking signals; Google frequently filters them out or replaces them; standard typographic separators (hyphen, pipe) are safe. |

## Sources (URLs)
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/essentials/spam-policies
- https://zyppy.com/seo/google-title-rewrite-study/
- https://ahrefs.com/blog/google-rewrites-title-tags/
- https://screamingfrog.co.uk/page-title-length/
- https://docs.astro.build
