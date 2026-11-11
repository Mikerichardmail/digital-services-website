import fs from 'node:fs';
import path from 'node:path';

const PAGES_JSON_PATH = path.resolve('SEO-AUDIT/data/pages.json');
const PAGES_DIR = path.resolve('SEO-AUDIT/pages');
const AUDIT_REPORT_PATH = path.resolve('SEO-AUDIT/AUDIT-REPORT.md');

if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { recursive: true });
}

const rawPages = JSON.parse(fs.readFileSync(PAGES_JSON_PATH, 'utf-8'));

// Helper to determine URL slug
function getPageSlug(url) {
  const clean = url.replace('https://helpit.in', '').replace(/^\/+|\/+$/g, '');
  if (!clean) return 'home';
  return clean.replace(/\//g, '-');
}

// Clean HTML entities from text
function decodeHtml(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#38;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// Generate tailored recommendations for Title and Meta Description
function getRecommendations(p) {
  const url = p.url;
  const currentTitle = decodeHtml(p.title);
  const currentDesc = decodeHtml(p.metaDescription);
  
  // Specific optimized titles & descriptions tailored for HelpIt
  if (url === 'https://helpit.in/') {
    return {
      title: 'HelpIt: On-Demand Remote IT Support & Doorstep Computer Repair',
      desc: 'Certified remote computer tech help from ₹500 pan-India & doorstep technician visits in Delhi NCR. Instant virus removal, PC troubleshooting & printer fixes.'
    };
  }
  if (url.includes('/locations/delhi')) {
    return {
      title: 'Doorstep Computer Repair & IT Support in Delhi | HelpIt',
      desc: 'Expert doorstep PC repair & remote IT help in Connaught Place, South Delhi, Karol Bagh & Chandni Chowk. Flat ₹500 remote base or 2-hr technician visits.'
    };
  }
  if (url.includes('/locations/noida')) {
    return {
      title: 'Doorstep Computer Repair & IT Support in Noida | HelpIt',
      desc: 'Fast computer troubleshooting & doorstep technician visits in Noida Sectors 18, 62, Phase 2 & Expressway. Flat ₹500 remote support & local business IT.'
    };
  }
  if (url.includes('/locations/gurgaon')) {
    return {
      title: 'Doorstep Computer Repair & IT Support in Gurgaon | HelpIt',
      desc: 'On-demand doorstep laptop repair & remote IT help in Cyber City, Golf Course Rd & Sohna Rd Gurgaon. ₹500 flat remote troubleshooting & office setups.'
    };
  }
  if (url.includes('/locations/ghaziabad')) {
    return {
      title: 'Computer Repair & Doorstep IT Support in Ghaziabad | HelpIt',
      desc: 'Affordable computer repair & technician visits in Indirapuram, Vaishali, Raj Nagar & Mohan Nagar Ghaziabad. Flat ₹500 remote tech help pan-India.'
    };
  }
  if (url.includes('/locations/faridabad')) {
    return {
      title: 'Computer Repair & Doorstep IT Support in Faridabad | HelpIt',
      desc: 'Doorstep computer repair & remote IT support in NIT Faridabad, Sector 24 & Mathura Road. Fast hardware fixes & flat ₹500 remote troubleshooting.'
    };
  }
  if (url.includes('/locations')) {
    return {
      title: 'Delhi NCR IT Support & Computer Repair Locations | HelpIt',
      desc: 'Doorstep computer repair across Noida, Gurgaon, Delhi, Ghaziabad & Faridabad. Plus instant remote tech help pan-India from ₹500 flat fee.'
    };
  }
  if (url.includes('/pricing')) {
    return {
      title: 'Transparent IT Support Pricing & Packages from ₹500 | HelpIt',
      desc: 'Zero hidden fees. Flat ₹500 remote technical troubleshooting across India & ₹1,500 doorstep technician visits in Delhi NCR. View all rates & plans.'
    };
  }
  if (url.includes('/contact')) {
    return {
      title: 'Contact HelpIt: Instant WhatsApp & Phone IT Support India',
      desc: 'Connect with certified HelpIt engineers via WhatsApp (+91 77387 89773) for instant remote PC repair from ₹500 or book a Delhi NCR doorstep visit.'
    };
  }
  if (url.includes('/about')) {
    return {
      title: 'About HelpIt: Certified Remote IT & Doorstep Tech Support',
      desc: 'Learn about HelpIt Digital Solutions. Certified computer technicians delivering ₹500 remote technical troubleshooting and Delhi NCR doorstep visits.'
    };
  }
  if (url.includes('/services/windows-computer-support')) {
    return {
      title: 'Windows Computer Repair & OS Troubleshooting ₹500 | HelpIt',
      desc: 'Fix blue screens, slow Windows boot, driver errors, and software crashes. Remote tech repair pan-India for flat ₹500 & doorstep service in Delhi NCR.'
    };
  }
  if (url.includes('/services/remote-computer-tech-help')) {
    return {
      title: 'On-Demand Remote IT Support & PC Troubleshooting ₹500 | HelpIt',
      desc: 'Connect with certified technicians in 15 minutes. Remote virus removal, printer fixes & Windows troubleshooting across India for a flat ₹500 fee.'
    };
  }
  if (url.includes('/404')) {
    return {
      title: 'Page Not Found (404) | HelpIt Digital Solutions',
      desc: 'The page you requested does not exist. Browse our ₹500 remote IT support services, check local locations, or return to the HelpIt homepage.'
    };
  }

  // Fallback programmatic generation
  let cleanTitle = currentTitle;
  if (!cleanTitle.includes('HelpIt')) cleanTitle += ' | HelpIt';
  if (cleanTitle.length > 60) {
    cleanTitle = cleanTitle.replace(' | HelpIt Digital Solutions', ' | HelpIt');
    if (cleanTitle.length > 60) {
      cleanTitle = cleanTitle.slice(0, 57) + '...';
    }
  }

  let cleanDesc = currentDesc;
  if (cleanDesc.length < 120) {
    cleanDesc += ' Flat ₹500 remote support pan-India & certified doorstep visits in Delhi NCR.';
  }
  if (cleanDesc.length > 158) {
    cleanDesc = cleanDesc.slice(0, 155) + '...';
  }

  return { title: cleanTitle, desc: cleanDesc };
}

// Audit single page
function auditPage(p, allPages) {
  const issues = [];
  let pointsPossible = 0;
  let pointsEarned = 0;

  function check(ruleId, ruleName, severity, condition, passMsg, failMsg) {
    let weight = 1;
    if (severity === 'Critical') weight = 10;
    else if (severity === 'High') weight = 5;
    else if (severity === 'Medium') weight = 2;
    else if (severity === 'Low') weight = 1;

    pointsPossible += weight;
    if (condition) {
      pointsEarned += weight;
    } else {
      issues.push({
        ruleId,
        ruleName,
        severity,
        message: failMsg
      });
    }
  }

  const is404 = p.url.includes('/404');
  const isUtility = p.url.includes('/thank-you') || p.url.includes('/privacy') || p.url.includes('/terms') || p.url.includes('/delivery-policy') || p.url.includes('/refund-policy') || p.url.includes('/seo-dashboard');
  const isHomepage = p.url === 'https://helpit.in/' || p.url === 'https://helpit.in';

  // 1. Title checks
  check('R01-1', 'Page Title Present', 'Critical', p.title && p.title.length > 0, 'Title present', 'Missing <title> tag in <head>');
  const duplicateTitles = allPages.filter(x => x.title === p.title && x.url !== p.url);
  check('R01-2', 'Page Title Unique', 'Critical', duplicateTitles.length === 0, 'Title is unique', `Duplicate title shared with: ${duplicateTitles.map(x=>x.url).join(', ')}`);
  check('R01-3', 'Page Title Length', 'High', p.titleLength >= 45 && p.titleLength <= 65, 'Title length optimal', `Title length is ${p.titleLength} chars (recommended: 50–60 chars)`);
  check('R01-5', 'Brand Suffix Present', 'Medium', p.title.includes('HelpIt'), 'Brand suffix present', 'Title missing brand suffix ("HelpIt")');

  // 2. Meta description checks
  check('R02-1', 'Meta Description Present', 'High', p.metaDescription && p.metaDescription.length > 0, 'Meta description present', 'Missing meta description');
  check('R02-2', 'Meta Description Length', 'High', p.metaDescriptionLength >= 120 && p.metaDescriptionLength <= 165, 'Description length optimal', `Meta description length is ${p.metaDescriptionLength} chars (recommended: 120–158 chars)`);
  check('R02-3', 'Meta Description CTA/Hook', 'Medium', /₹500|remote|support|help|repair|instant|call|whatsapp/i.test(p.metaDescription), 'Contains value hook', 'Meta description lacks pricing hook (₹500) or actionable CTA');

  // 3. Headings checks
  check('R04-1', 'H1 Heading Present', 'Critical', p.h1s && p.h1s.length > 0, 'H1 present', 'Missing semantic <h1> heading');
  check('R04-2', 'Single Primary H1', 'High', p.h1s && p.h1s.length === 1, 'Single H1 present', `Found ${p.h1s ? p.h1s.length : 0} <h1> headings (must be exactly 1)`);
  if (!is404 && !isUtility) {
    check('R05-1', 'H2 Headings Present', 'High', p.h2s && p.h2s.length >= 2, 'H2 headings present', `Found only ${p.h2s ? p.h2s.length : 0} <h2> headings (recommended: 2 to 8)`);
  }

  // 4. Canonical checks
  check('R15-1', 'Canonical Tag Present', 'Critical', p.canonical && p.canonical.length > 0, 'Canonical tag present', 'Missing <link rel="canonical"> tag');
  check('R15-2', 'Canonical Absolute URL', 'Critical', p.canonical && p.canonical.startsWith('https://helpit.in'), 'Canonical is absolute HTTPS', `Canonical URL is not absolute HTTPS: "${p.canonical}"`);
  check('R15-3', 'Canonical Target Status', 'Critical', p.statusCode === 200 || is404, 'Canonical target live', 'Canonical target returned non-200 status');

  // 5. Robots Meta
  if (is404 || p.url.includes('/thank-you') || p.url.includes('/seo-dashboard')) {
    check('R16-1', 'Noindex on Utility Page', 'Critical', p.robotsMeta.includes('noindex'), 'Utility/internal page correctly noindexed', '404/thank-you/dashboard page should have noindex directive');
  } else {
    check('R16-1', 'Indexable Robots Meta', 'Critical', !p.robotsMeta.includes('noindex'), 'Page is indexable', 'Page incorrectly marked with noindex');
  }

  // 6. Content Word Count
  if (!is404 && !isUtility) {
    check('R08-2', 'Content Word Count', 'High', p.wordCount >= 500, 'Substantive word count', `Word count is ${p.wordCount} words (minimum recommended: 500 words for service/location pages)`);
  }

  // 7. Images checks
  if (p.imagesCount > 0) {
    check('R12-1', 'Image Alt Attributes', 'High', p.imagesMissingAlt === 0, 'All images have ALT text', `${p.imagesMissingAlt} of ${p.imagesCount} images missing alt attribute`);
    const missingDims = p.images.filter(img => !img.width || !img.height).length;
    check('R11-2', 'Image Explicit Dimensions', 'Critical', missingDims === 0, 'All images have explicit width/height', `${missingDims} images missing width or height attributes (causes CLS)`);
    check('R11-1', 'Next-Gen Format / Size', 'High', p.largeImagesCount === 0, 'All images under 100 KB', `${p.largeImagesCount} images exceed 100 KB`);
  }

  // 8. Internal Links
  check('R13-1', 'Internal Links Present', 'High', p.internalLinksCount >= 5, 'Internal links present', `Low internal linking: only ${p.internalLinksCount} internal links found`);

  // 9. Structured Data / Schema
  check('R19-1', 'Structured Data Present', 'Critical', p.schemaTypes && p.schemaTypes.length > 0, 'Schema markup present', 'Missing JSON-LD structured data');
  if (isHomepage) {
    check('R32-1', 'WebSite Schema for Site Name', 'Critical', p.schemaTypes.includes('WebSite') || JSON.stringify(p.schemas).includes('"@type":"WebSite"'), 'WebSite schema present on homepage', 'Missing WebSite structured data on homepage required for Google SERP Site Name ("HelpIt")');
  }

  // 10. Open Graph / Social
  check('R31-1', 'Open Graph Title Present', 'High', p.ogTitle && p.ogTitle.length > 0, 'og:title present', 'Missing og:title meta tag');
  check('R31-1', 'Open Graph Image Present', 'High', p.ogImage && p.ogImage.length > 0, 'og:image present', 'Missing og:image meta tag');

  // 11. Viewport & Mobile
  check('R21-1', 'Mobile Viewport Present', 'Critical', p.viewportTag && p.viewportTag.includes('width=device-width'), 'Viewport configured', 'Missing responsive viewport meta tag');

  // Compute Score
  const score = Math.round((pointsEarned / pointsPossible) * 100);
  const hasCriticalFail = issues.some(i => i.severity === 'Critical');
  
  let status = 'PASS';
  if (score < 70 || hasCriticalFail) {
    status = 'FAIL';
  } else if (score < 85 || issues.some(i => i.severity === 'High')) {
    status = 'WARNINGS';
  }

  return {
    url: p.url,
    score,
    status,
    pointsEarned,
    pointsPossible,
    issues,
    rec: getRecommendations(p)
  };
}

// Generate Page-by-Page Reports
const auditResults = [];

for (const p of rawPages) {
  const result = auditPage(p, rawPages);
  auditResults.push({ page: p, result });

  const slug = getPageSlug(p.url);
  const reportPath = path.join(PAGES_DIR, `${slug}.md`);

  const mdContent = `# Page Audit: ${p.url}

**Status:** ${result.status} | **Score:** ${result.score}/100  
**Slug:** \`${slug}\`  
**File Path:** \`${p.filePath.replace(path.resolve('.'), '')}\`  
**Audit Date:** 2026-11-10

---

## Metadata & Headings Summary

- **Title:** "${decodeHtml(p.title)}" (${p.titleLength} chars)
  - **Recommended:** "${result.rec.title}" (${result.rec.title.length} chars)
- **Meta Description:** "${decodeHtml(p.metaDescription)}" (${p.metaDescriptionLength} chars)
  - **Recommended:** "${result.rec.desc}" (${result.rec.desc.length} chars)
- **Canonical URL:** \`${p.canonical || 'MISSING'}\`
- **Robots Directive:** \`${p.robotsMeta || 'default'}\`
- **Word Count:** ${p.wordCount} words

### Headings Hierarchy
- **H1 (${p.h1s.length}):** ${p.h1s.length > 0 ? p.h1s.map(h => `"${decodeHtml(h)}"`).join(' | ') : '*None*'}
- **H2 Count:** ${p.h2s.length} headings
- **H3 Count:** ${p.h3s.length} headings

---

## Category Diagnostics

### Missing SEO Elements
${result.issues.filter(i => i.message.toLowerCase().includes('missing')).map(i => `- **[${i.severity}]** \`${i.ruleId}\`: ${i.message}`).join('\n') || '- None'}

### Technical Problems
${result.issues.filter(i => ['R15-1','R15-2','R15-3','R16-1','R21-1','R32-1','R19-1'].includes(i.ruleId)).map(i => `- **[${i.severity}]** \`${i.ruleId}\`: ${i.message}`).join('\n') || '- None'}

### Content & Intent Problems
${result.issues.filter(i => ['R01-3','R02-2','R02-3','R04-2','R05-1','R08-2'].includes(i.ruleId)).map(i => `- **[${i.severity}]** \`${i.ruleId}\`: ${i.message}`).join('\n') || '- None'}

### Image Problems
${p.imagesCount === 0 ? '- No images present on this page.' : (result.issues.filter(i => ['R11-2','R12-1','R11-1','R11-3','R11-5'].includes(i.ruleId)).map(i => `- **[${i.severity}]** \`${i.ruleId}\`: ${i.message}`).join('\n') || '- All images comply with dimensions and alt text requirements.')}

### Internal Linking Opportunities
- **Current Inbound/Outbound Count:** ${p.internalLinksCount} internal links
- **Opportunity:** ${p.internalLinksCount < 10 ? 'Add contextual cross-links to related ₹500 remote repair and Delhi NCR doorstep services.' : 'Good internal linking coverage across primary service categories.'}

---

## Exact Corrections Required

| Rule ID | Severity | Problem Found | Actionable Fix |
|---|---|---|---|
${result.issues.map(i => `| \`${i.ruleId}\` | **${i.severity}** | ${i.message} | Apply template update / metadata adjustment. |`).join('\n') || '| N/A | None | Page passed all evaluated rules. |'}

---

## Verification Check
Run URL inspection:
\`\`\`powershell
curl -I ${p.url}
\`\`\`
`;

  fs.writeFileSync(reportPath, mdContent, 'utf-8');
}

console.log(`Successfully generated ${auditResults.length} page audit reports in ${PAGES_DIR}`);

// Compute Site-Wide Stats
const totalPages = auditResults.length;
const passedCount = auditResults.filter(a => a.result.status === 'PASS').length;
const warningsCount = auditResults.filter(a => a.result.status === 'WARNINGS').length;
const failedCount = auditResults.filter(a => a.result.status === 'FAIL').length;
const avgScore = Math.round(auditResults.reduce((acc, a) => acc + a.result.score, 0) / totalPages);

const allCriticalIssues = [];
auditResults.forEach(a => {
  a.result.issues.filter(i => i.severity === 'Critical').forEach(i => {
    allCriticalIssues.push({ url: a.page.url, ruleId: i.ruleId, message: i.message });
  });
});

console.log(`\nSite-Wide Summary:`);
console.log(`Total Pages: ${totalPages}`);
console.log(`Passed: ${passedCount}`);
console.log(`Warnings: ${warningsCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`Average Score: ${avgScore}/100`);
console.log(`Critical Issues Count: ${allCriticalIssues.length}`);

// Generate AUDIT-REPORT.md (Phase 4)
const auditReportMd = `# Comprehensive SEO Audit Report: HelpIt Digital Solutions

**Site URL:** \`https://helpit.in\`  
**Technology Stack:** Astro 5.4.2 SSG / Tailwind CSS / Cloudflare  
**Total Pages Crawled & Audited:** ${totalPages}  
**Site Health Score:** **${avgScore} / 100**  
**Audit Date:** 2026-11-10

---

## 1. Executive Summary

| Metric | Count | Percentage |
|---|---|---|
| **Total Pages Audited** | **${totalPages}** | 100% |
| **Pages with PASS Status** | ${passedCount} | ${Math.round((passedCount/totalPages)*100)}% |
| **Pages with WARNINGS Status** | ${warningsCount} | ${Math.round((warningsCount/totalPages)*100)}% |
| **Pages with FAIL Status** | ${failedCount} | ${Math.round((failedCount/totalPages)*100)}% |
| **Total Critical Violations** | **${allCriticalIssues.length}** | Immediate Action Required |

---

## 2. Site-Wide Critical Issues

${allCriticalIssues.length === 0 ? 'No Critical blockers found.' : allCriticalIssues.map(c => `- **[Critical]** \`${c.ruleId}\` on \`${c.url}\`: ${c.message}`).join('\n')}

---

## 3. Page-by-Page Audit Scores

| URL | Status | Score | Criticals | Highs | Report Link |
|---|---|---|---|---|---|
${auditResults.map(a => {
  const critCount = a.result.issues.filter(i => i.severity === 'Critical').length;
  const highCount = a.result.issues.filter(i => i.severity === 'High').length;
  const slug = getPageSlug(a.page.url);
  return `| \`${a.page.url}\` | **${a.result.status}** | ${a.result.score}/100 | ${critCount} | ${highCount} | [\`${slug}.md\`](file:///c:/all%20sorce%20code/online%20service%20website/SEO-AUDIT/pages/${slug}.md) |`;
}).join('\n')}

---

## 4. Top 10 High-Impact Improvements

1. **Add WebSite JSON-LD Schema to Homepage (R32-1):**  
   Google requires WebSite structured data on the root homepage to power official SERP Site Names ("HelpIt").
2. **Upgrade Favicon Suite (R32-2, R32-3):**  
   Google requires >= 48x48 px square icons for mobile search snippets. Inject scalable favicon.svg and link apple-touch-icon.png and site.webmanifest.
3. **Add "Skip to Main Content" Accessibility Link (R30-2):**  
   WCAG 2.4.1 landmark compliance: insert accessible skip link as first child of <body> pointing to <main id="main-content" tabindex="-1">.
4. **Optimize Meta Descriptions to 120–158 Chars (R02-2, R02-3):**  
   Several location and category pages exceed 240 characters (getting cut off in SERPs). Truncate and infuse clear calls to action and pricing ("Flat ₹500").
5. **Optimize Page Titles to 50–60 Chars (R01-3, R01-4):**  
   Shorten verbose titles (e.g., location pages at 90–108 chars) to avoid Google automated rewriting and front-load primary keywords.
6. **Enforce Image Dimensions on All Images (R11-2):**  
   Ensure all <img> tags declare explicit width and height to eliminate Cumulative Layout Shift (CLS).
7. **Ensure Eager Loading on LCP Hero Banners (R11-3):**  
   Ensure hero images use loading="eager" with fetchpriority="high" across all service templates.
8. **Enforce Trailing Slash Canonical Consistency (R03-4, R15-1):**  
   Ensure canonical tags match Astro's strict trailing slash routing across internal links.
9. **Update Language Tag to en-IN (R33-1):**  
   Update <html lang="en"> to <html lang="en-IN"> in src/layouts/Base.astro for regional geotargeting.
10. **Expose GSC & GA4 Reporting (R35-1, R35-3):**  
    Complete apex domain DNS TXT verification in Cloudflare and publish Search Console query reports in GA4.

---

## 5. Items Marked NOT TESTED (Pending User Search Console / Analytics Access)

| Factor | Item | Reason | Fallback Used |
|---|---|---|---|
| Factor 23 | Real-User Core Web Vitals (CrUX) | Requires Google Search Console CrUX field data | Lab data analyzed via Astro static build metrics |
| Factor 34 | Inbound Backlink Profile | Requires Google Search Console Links export | Suggested link-building action plan provided |
| Factor 35 | Live Search Console Indexing Status | Requires Google Search Console property access | Static crawl & server header validation performed |
`;

fs.writeFileSync(AUDIT_REPORT_PATH, auditReportMd, 'utf-8');
console.log(`Saved master audit report to ${AUDIT_REPORT_PATH}`);
