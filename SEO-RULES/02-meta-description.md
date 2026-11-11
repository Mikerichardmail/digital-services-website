# 02 Meta Description
Last researched: 2026-11-10 | Tier: B

## Purpose
The `<meta name="description">` tag provides a concise summary of a webpage's contents. While not a direct ranking factor in Google's ranking algorithms, it serves as the default candidate for the snippet displayed below the title link in search results. A well-crafted description directly drives organic click-through rate (CTR), user engagement, and contextual relevance.

## Google Guidelines [OFFICIAL]
According to Google Search Central ("Control your snippets in search results"):
- Use unique descriptions for each page. Duplicate descriptions across pages prevent users and search engines from distinguishing page context.
- Accurately summarize the page content.
- Include relevant information about the page (for example, author, subject, or dates for news/articles).
- Avoid keyword stuffing (do not string together long lists of comma-separated keywords).
- Google uses both visible on-page content and the `<meta name="description">` to automatically generate search snippets.
- Google frequently generates an alternative snippet from page body text if it believes the on-page text answers the user's specific query better than the hardcoded description.
- Webmasters can control snippets using `nosnippet`, `max-snippet:[number]`, and the `data-nosnippet` attribute.

## Limits and Sizes
- **Google Official Limit:** No official limit ("there’s no limit on how long a meta description can be", Google Search Central).
- **Desktop Pixel Width Limit [RECOMMENDED]:** ~920px to 1024px, approximately 150–160 characters.
- **Mobile Pixel Width Limit [RECOMMENDED]:** ~680px, approximately 110–120 characters.
- **Recommended Length [RECOMMENDED]:** 120–155 characters. Crucial value propositions and primary target keywords should be front-loaded in the first 110–120 characters to avoid truncation on mobile devices.

## Validation Rules
- `R02-1` Every indexable page should have a non-empty `<meta name="description">` tag in the `<head>` | [RECOMMENDED] | severity: High
- `R02-2` Meta description must be unique across all pages on the site (no duplicate descriptions) | [OFFICIAL] | severity: High
- `R02-3` Meta description length should be between 100 and 160 characters to optimize SERP display without excessive truncation | [RECOMMENDED] | severity: Medium
- `R02-4` Meta description must not contain keyword stuffing or unnatural keyword repetitions | [OFFICIAL] | severity: High
- `R02-5` Meta description must not break HTML syntax; raw double quotes (`"`) inside the `content` attribute must be escaped as `&quot;` or replaced with single quotes | [OFFICIAL] | severity: Critical
- `R02-6` Meta description should include a clear value proposition and a user-focused call-to-action (CTA) matching the search intent | [RECOMMENDED] | severity: Low

## Good Examples
- `Need quick PC help in India? Get remote Windows troubleshooting, virus removal & slow laptop fixes from verified experts. Book online from ₹500.` (147 chars)
- `Struggling with unformatted PDFs or broken Excel files? We convert, repair, and format documents in under 2 hours. Fast online service across India.` (148 chars)
- `Set up custom AI tools, automation workflows, and OpenAI/Claude prompts for your business. Fast online assistance starting at ₹500. Get started today.` (151 chars)

## Bad Examples
- `Welcome to HelpIt. We do computer support, PDF convert, AI setup, SEO, digital services, laptop support, online tech support.` (keyword list, boring, fails R02-4, R02-6)
- `Get your computer fixed with "expert" help now.` (raw double quotes break the tag: `<meta name="description" content="Get your computer fixed with "expert" help now.">` truncates at `with `, fails R02-5)
- `Digital services.` (too short, 17 chars, fails R02-3)
- `<meta name="description" content="">` (empty description, fails R02-1)

## Common Mistakes
1. Believing meta descriptions directly improve keyword rankings (Google confirmed they are not a direct ranking signal).
2. Leaving meta descriptions blank on core service pages or duplicating a single boilerplate paragraph across every page.
3. Placing raw double quotes inside `content="..."`, causing browsers and crawlers to terminate the attribute prematurely.
4. Writing 300+ characters of text where the call-to-action is buried at character 240 and truncated on both desktop and mobile.
5. Failing to match user intent (e.g. putting generic corporate branding on an emergency troubleshooting guide).

## Implementation (for Astro / Static Site Stack)
In Astro, pass `description` into a layout or SEO component and escape quotes safely:
```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = "On-demand online tech assistance, remote PC repair, and AI setup services across India. Fast support starting at ₹500."
} = Astro.props;

// Escape double quotes to prevent HTML breaking
const safeDescription = description.replace(/"/g, '&quot;');
---
<meta name="description" content={safeDescription} />
```

## How to Test and Verify
1. **Automated Crawl:** Extract `<meta name="description">` content attribute across all built HTML pages; verify length is between 100 and 160 characters and no duplicates exist.
2. **HTML Syntax Validation:** Check for unescaped double quotes or broken attributes in generated HTML.
3. **SERP Snippet Simulator:** Preview pixel truncation on mobile (680px) and desktop (960px).
4. **Google Search Console:** Check URL Inspection for rendered snippets and monitor organic CTR for key landing pages.

## Official vs General Advice
- **Official (Google):** There is no character limit. Google creates snippets dynamically; it will freely rewrite meta descriptions over 60% of the time based on user search queries. Google says having no description is better than having duplicate boilerplate descriptions across pages.
- **General SEO Advice:** Maintain a strict length of 150–160 characters (and under 120 chars for mobile). Always craft a custom description with a CTA for every important page to capture the ~37% of queries where Google does display the exact author-provided description.

## Research Log
| Query | Date | Source URL | What it Confirmed |
|---|---|---|---|
| Google Search Central control your snippets in search results meta descriptions | 2026-11-10 | https://developers.google.com/search/docs/appearance/snippet | Confirmed Google creates snippets from page content and meta descriptions; requires unique, descriptive, non-boilerplate descriptions; supports robots directives `nosnippet`, `max-snippet`, and `data-nosnippet`. |
| does meta description affect Google rankings directly ranking factor SEO | 2026-11-10 | https://searchenginejournal.com | Confirmed meta description is not a direct ranking signal for Google; impact is indirect via SERP CTR and user engagement. |
| Ahrefs study Google rewrites meta descriptions how often causes | 2026-11-10 | https://ahrefs.com/blog/google-rewrites-meta-descriptions/ | Confirmed Google rewrites meta descriptions 62.78% of the time (65.62% for long-tail queries); rewrites are driven by query relevance rather than character length alone; 25% of top pages lack descriptions entirely. |
| meta description length character count pixel width desktop mobile Google limits | 2026-11-10 | https://spotibo.com / https://wscubetech.com | Confirmed no official character limit exists; truncation occurs by pixel width (~920-1024px desktop = ~150-160 chars; ~680px mobile = ~110-120 chars). |
| missing empty meta descriptions impact SEO Google crawlability ranking | 2026-11-10 | https://unlighthouse.dev / https://cognitiveseo.com | Confirmed missing/empty meta descriptions do not block crawlers or cause direct ranking drops, but force Google to extract arbitrary text snippets, damaging SERP CTR. |
| duplicate meta descriptions Google Search Central better to have none than duplicate | 2026-11-10 | https://seroundtable.com / https://semrush.com | Confirmed Google states unique descriptions are ideal, but if pages are programmatic/similar, leaving them blank for Google to generate dynamic snippets is better than site-wide duplicate boilerplate. |
| meta description call to action value proposition CTR best practice SEO | 2026-11-10 | https://teamlewis.com / https://aioseo.com | Confirmed best practices: front-load value proposition in first 120 chars, include active verb CTA, align with search intent, and incorporate target keywords for bolding in SERP. |
| programmatic SEO dynamic meta descriptions template e-commerce services best practices | 2026-11-10 | https://ecomseo.co / https://seomatic.ai | Confirmed templated formulas using variables (service, city, price) with conditional logic prevent thin content and maintain unique value across catalog pages. |
| meta description double quotes HTML breaking entity SEO tag | 2026-11-10 | https://theseosystem.com / https://seobility.net | Confirmed raw double quotes (`"`) prematurely terminate the HTML `content` attribute, breaking the tag and truncating snippets in search crawlers; must use `&quot;` or single quotes. |
| Google Search Central robots meta tag max-snippet nosnippet data-nosnippet | 2026-11-10 | https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | Confirmed usage and syntax for `nosnippet` (blocks all snippets and AI Overviews), `max-snippet:[number]` (caps snippet characters), and `data-nosnippet` (HTML attribute to exclude specific page sections). |

## Sources (URLs)
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- https://ahrefs.com/blog/google-rewrites-meta-descriptions/
- https://searchenginejournal.com/meta-description-seo/
- https://theseosystem.com/how-to-fix-broken-meta-descriptions/
