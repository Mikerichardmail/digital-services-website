# SEO MASTER PLAN: Research → Rules → Audit → Fix

> **For the AI agent:** Follow this file exactly, in order. Do not skip steps, merge factors, or invent anything. If something is unclear or risky, stop and ask me.

---

## 0. Inputs (I fill these before you start)

| Item | Value |
|---|---|
| Website URL | https://helpit.in |
| Project folder / repo path | c:\all sorce code\online service website |
| Framework / CMS | Astro 5.4.2 + Tailwind CSS |
| Hosting | Cloudflare Workers / Cloudflare Pages Static Assets |
| Language and target country | English (en-IN) / India |
| Business / niche + 3–5 main keywords | On-demand digital help & tech assistance (Keywords: "remote computer support India", "AI setup assistance", "file format conversion help", "project deadline assistance", "digital business setup consultation") |
| Approx. number of pages | ~51 static pages |
| Build / deploy command | npm run build |
| Search Console / Analytics access | Not provided (CrUX / GSC metrics to be marked NOT TESTED per Section 3) |

If any row is empty, ask me before starting Phase 1.

---

## 1. Golden Rules

1. **Never invent** rules, limits, ranking factors, sources, searches, or test results.
2. **Label every rule:**
   - `[OFFICIAL]` stated in Google documentation (link it)
   - `[RECOMMENDED]` industry best practice, not a Google requirement
   - `[OPTIONAL]` small gain, nice to have
3. If Google has **no official limit**, write "No official limit", then give the common guideline as `[RECOMMENDED]`.
4. **Source priority:** (1) Google Search Central + Search Console Help, (2) web.dev, Lighthouse, schema.org, W3C, RFCs, (3) reputable SEO studies, always labeled as opinion.
5. Use **today's real date** for every "researched on" date.
6. If you cannot search or open web pages, **stop and tell me**. Never write research from memory.
7. If something cannot be tested, mark it **NOT TESTED** with the reason and what is needed. Never guess.
8. Never assume a recommendation is a Google ranking factor.
9. Save every file inside the project folder.
10. Update `PROGRESS.md` after every factor and every step. At the start of every session, read it and resume.

---

## 2. Known Traps (verify during research, do not copy blindly)

These are common mistakes. Confirm each against current Google docs before writing it into a rule file.

- Google has no official character limit for titles or meta descriptions. Results are cut by pixel width, and Google may rewrite the title or snippet.
- The meta keywords tag is ignored. Keyword density and word count have no official target.
- Meta description is not a ranking factor, but it can be used as the snippet.
- robots.txt controls crawling, not indexing. `noindex` must be in a meta tag or X-Robots-Tag, and the page must be crawlable for Google to see it.
- Sitemap `<priority>` and `<changefreq>` are ignored. `<lastmod>` helps only if accurate.
- `rel=next/prev` is no longer used for pagination.
- Multiple H1s are allowed. One clear H1 is the recommended practice.
- Structured data enables rich results. It is not a direct ranking boost.
- Open Graph / Twitter tags are for social previews, not Google ranking.
- Core Web Vitals are one signal among many, and relevance still matters most.

---

## 3. Research Depth

| Tier | Meaning | Minimum research |
|---|---|---|
| **A** | Google's docs are definitive | Read the official doc + at least 4 more searches/pages (recent changes, common mistakes, testing tools) |
| **B** | Contested or recommendation-heavy | At least **10 separate searches**, each from a different angle |

Rules for every search:
- Each search is a different query or angle. No padding.
- Log the **real** query, source URL, date, and what it confirmed.
- If official docs and common advice disagree, record both.
- Never fabricate a search log to reach the minimum.

---

## 4. The 35 SEO Factors

One file per factor in `SEO-RULES/`. Never combine factors.

| # | File | Factor | Tier |
|---|---|---|---|
| 01 | 01-page-title.md | Page title (`<title>`) | B |
| 02 | 02-meta-description.md | Meta description | B |
| 03 | 03-url-slug.md | URL slug / structure | B |
| 04 | 04-h1-heading.md | H1 heading | B |
| 05 | 05-h2-headings.md | H2 headings | B |
| 06 | 06-h3-h6-hierarchy.md | H3–H6 and heading hierarchy | B |
| 07 | 07-keyword-intent.md | Keyword targeting and search intent | B |
| 08 | 08-content-quality.md | Content quality (people-first, E-E-A-T) | B |
| 09 | 09-readability.md | Content readability | B |
| 10 | 10-duplicate-content.md | Duplicate content | B |
| 11 | 11-image-optimization.md | Image size, format, compression | A |
| 12 | 12-image-alt-text.md | Image ALT text and filenames | B |
| 13 | 13-internal-links.md | Internal links and anchor text | B |
| 14 | 14-external-links.md | External links (nofollow / sponsored / ugc) | B |
| 15 | 15-canonical-tags.md | Canonical tags | A |
| 16 | 16-robots-meta.md | Robots meta tag / X-Robots-Tag | A |
| 17 | 17-robots-txt.md | robots.txt | A |
| 18 | 18-xml-sitemap.md | XML sitemap | A |
| 19 | 19-schema-markup.md | Schema / structured data | A |
| 20 | 20-breadcrumbs.md | Breadcrumbs | A |
| 21 | 21-mobile-friendly.md | Mobile responsiveness | A |
| 22 | 22-page-speed.md | Page speed | B |
| 23 | 23-core-web-vitals.md | Core Web Vitals | A |
| 24 | 24-https-security.md | HTTPS and security | A |
| 25 | 25-broken-links-404.md | Broken links, 404s, soft 404s | A |
| 26 | 26-redirects.md | Redirects (301/302, chains) | A |
| 27 | 27-indexing-crawlability.md | Indexing and crawlability | B |
| 28 | 28-pagination-facets.md | Pagination and faceted navigation | A |
| 29 | 29-site-architecture.md | Site architecture and depth | B |
| 30 | 30-navigation.md | Navigation and menus | B |
| 31 | 31-open-graph-social.md | Open Graph / social tags | B |
| 32 | 32-favicon-site-name.md | Favicon and site name | A |
| 33 | 33-hreflang.md | hreflang / international | A |
| 34 | 34-backlinks.md | Backlinks and off-page | B |
| 35 | 35-search-console-setup.md | Search Console and Analytics setup | A |

If a factor does not apply (e.g. hreflang on a single-language site), still create the file with a short "Not applicable because..." note. Do not skip it.

---

## 5. Rule File Template

Every file in `SEO-RULES/` uses this structure:

```
# [NN] Factor Name
Last researched: YYYY-MM-DD | Tier: A/B

## Purpose
## Google Guidelines  [OFFICIAL]
## Limits and Sizes   (min / max / recommended; "No official limit" where true)
## Validation Rules
  R[NN]-1  rule text | [OFFICIAL/RECOMMENDED/OPTIONAL] | severity: Critical/High/Medium/Low
  R[NN]-2  ...
## Good Examples
## Bad Examples
## Common Mistakes
## Implementation (for my stack)
## How to Test and Verify
## Official vs General Advice (where they differ)
## Research Log  (query | date | URL | what it confirmed)
## Sources (URLs)
```

The numbered rule IDs (R01-1, R01-2...) are used later in the audit.

---

## 6. Phases

### Phase 0: Setup
1. Read Section 0. Confirm all inputs.
2. Create `SEO-RULES/`, `SEO-AUDIT/`, and `PROGRESS.md` (checklist of all 35 factors and every phase).
3. Create a git branch `seo-fixes` (or copy the project if there is no git).
4. List which tools you have: web search, page fetching, Lighthouse / PageSpeed API, ability to run a crawler script. Tell me what is missing.

### Phase 1: Research and Rule Files (batches of 5)
Work in batches: 01–05, 06–10, 11–15, 16–20, 21–25, 26–30, 31–35.

For each factor: research (per tier) → write the file → update `PROGRESS.md`.

**CHECKPOINT 1:** After batch 01–05, stop. I review quality before you continue.

### Phase 2: Master Documents
Create in `SEO-RULES/`:
- `MASTER-SEO-GUIDE.md`: how all 35 factors connect (Crawl → Index → Understand → Rank → Click), grouped into 6 areas: Crawl and Index, On-Page, Content, Media, Technical and Speed, Authority and Setup.
- `SEO-CHECKLIST.md`: one pass/fail line per rule ID, `[OFFICIAL]` first.
- `SEO-PRIORITY-PLAN.md`: all rules ordered Critical → High → Medium → Low, with the recommended fix order.
- `RESEARCH-SOURCES.md`: every URL used, which file used it, date, and type (official / other).

**CHECKPOINT 2:** Stop. I review the rule library before the audit starts.

### Phase 3: Audit
**Research is finished. The audit only compares my site against the rule files.**

1. **Crawl with a script**, not by hand. Save results to `SEO-AUDIT/data/pages.csv` with: URL, status code, final URL, title + length, meta description + length, H1/H2/H3, canonical, robots meta, word count, images (count, missing ALT, large files), internal and external links, schema types, OG tags, viewport tag.
2. **Read the source files** (templates, layouts) to find the cause of problems, not only the symptom.
3. **Site-wide checks:** robots.txt, sitemap, HTTPS, www / non-www / http redirects, 404 page, navigation, architecture, duplicate content, indexing signals.
4. **Page-by-page:** every page gets all checks. Create `SEO-AUDIT/pages/[page-slug].md` for each page using the template in Section 7.
   If there are **more than 50 pages**, ask me first. The fallback is full detail for key pages and template-level reports for the rest (every URL still gets a CSV row).
5. Every finding cites its rule ID (e.g. "fails R01-2").

**What cannot be tested without my data:**

| Item | How | If I haven't provided it |
|---|---|---|
| Core Web Vitals (real users) | CrUX / PageSpeed API / Search Console export | NOT TESTED. Show Lighthouse results labeled "lab data" |
| Indexing status, GSC setup | Search Console export from me | NOT TESTED |
| Backlinks | GSC Links export or a tool export | NOT TESTED. Give opportunity ideas only, labeled "suggestions" |
| Page speed | Lighthouse | Lab data, labeled |

### Phase 4: Scoring and Report
**Severity:**
- **Critical:** blocks crawling or indexing, or breaks the site (wrong noindex, robots.txt blocking, bad canonical, 5xx, no HTTPS)
- **High:** hurts important pages (missing/duplicate title or H1, broken internal links, redirect chains, no mobile viewport)
- **Medium:** optimizations (description length, missing ALT, weak internal links)
- **Low:** polish

**Scoring:**
- Weights: Critical = 10, High = 5, Medium = 2, Low = 1
- Pass = full points, Warning = half, Fail = 0
- NOT TESTED and N/A checks are excluded from the score and listed separately
- **Page score** = points earned ÷ points possible × 100
- **Site score** = average of page scores, with site-wide Critical issues listed at the top

Create `SEO-AUDIT/AUDIT-REPORT.md` with: total pages, passed / failed / warning counts, Critical count, page-wise scores, site score, NOT TESTED list, and the **top 10 improvements**.

### Phase 5: Correction Plan
Create `SEO-AUDIT/CORRECTION-PLAN.md`. Each fix lists: page, rule ID, current value, new value, files touched, risk (Safe / Needs approval), priority.

**CHECKPOINT 3:** Stop. I approve the plan before any change.

### Phase 6: Implementation
**Rules:** no design changes, preserve functionality, do not remove useful content, do not risk indexing.

| Safe (do in batches of 10 files max) | Needs my approval per item |
|---|---|
| Titles, meta descriptions | Canonical tags |
| ALT text, image compression | robots.txt, noindex / robots meta |
| Heading fixes (no visual change) | URL slug changes + redirects |
| Internal links | Sitemap structure changes |
| OG tags, schema additions | Deleting or merging pages |

After each batch:
1. Run the build and confirm nothing broke.
2. Re-crawl the changed pages and compare before / after.
3. Log every change in `SEO-AUDIT/CHANGELOG.md`: date, file, change, reason, rule ID, verified yes/no.

If a slug must change (with my approval): add a 301 redirect, update internal links, update the sitemap.

### Phase 7: Final Recheck
1. Re-crawl the full site and re-score.
2. Create `SEO-AUDIT/FINAL-REPORT.md`: before vs after scores, what was fixed, what remains, what is NOT TESTED.
3. Give me a short manual to-do list (e.g. submit the sitemap in Search Console, request indexing).

---

## 7. Per-Page Audit Template

```
# Page: [URL]
Status: PASS / WARNINGS / FAIL | Score: NN/100

Title: "[current]" (NN chars)  →  Recommended: "[new]" (NN chars)
Meta description: "[current]" (NN chars)  →  Recommended: "[new]" (NN chars)
Headings: H1 / H2 / H3 structure as found

Missing SEO elements:
Technical problems:
Content problems:
Image problems:
Internal linking opportunities:
Exact corrections: (each with rule ID and severity)
```

---

## 8. Folder Structure

```
PROGRESS.md
SEO-RULES/
  01-page-title.md ... 35-search-console-setup.md
  MASTER-SEO-GUIDE.md
  SEO-CHECKLIST.md
  SEO-PRIORITY-PLAN.md
  RESEARCH-SOURCES.md
SEO-AUDIT/
  data/pages.csv
  pages/[page-slug].md
  AUDIT-REPORT.md
  CORRECTION-PLAN.md
  CHANGELOG.md
  FINAL-REPORT.md
```

---

## 9. Definition of Done

- [ ] All 35 rule files exist, each with a real research log and sources
- [ ] 4 master documents created
- [ ] Every page audited and scored
- [ ] Audit report and correction plan created and approved
- [ ] Fixes applied in batches, each verified and logged
- [ ] Final re-crawl completed with before / after scores
- [ ] NOT TESTED items clearly listed

---

## 10. Start Prompt (paste into the agent)

> Read `SEO-MASTER-PLAN.md` completely and follow it exactly. Start at Phase 0. Check `PROGRESS.md` first if it exists. Stop at every CHECKPOINT and wait for my approval. Never invent anything. If you cannot do something, tell me.
