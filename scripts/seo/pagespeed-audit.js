import { runPageSpeedAudit } from '../../functions/api/seo-service.js';

async function main() {
  const targetUrl = process.argv[2] || 'https://helpit.in/';
  const strategy = process.argv[3] || 'mobile';

  console.log(`\n================ GOOGLE PAGESPEED INSIGHTS AUDIT ================`);
  console.log(`Target URL: ${targetUrl}`);
  console.log(`Strategy:   ${strategy.toUpperCase()}\n`);
  console.log('Running Google Lighthouse analysis...');

  try {
    const data = await runPageSpeedAudit(process.env, targetUrl, strategy);

    console.log('\n--- LIGHTHOUSE SCORES ---');
    console.log(`Performance:    ${data.scores.performance} / 100`);
    console.log(`SEO:            ${data.scores.seo} / 100`);
    console.log(`Accessibility:  ${data.scores.accessibility} / 100`);
    console.log(`Best Practices: ${data.scores.bestPractices} / 100`);

    console.log('\n--- CORE WEB VITALS ---');
    console.log(`Largest Contentful Paint (LCP): ${data.webVitals.lcp.display} [${data.webVitals.lcp.status}]`);
    console.log(`First Contentful Paint (FCP):   ${data.webVitals.fcp.display} [${data.webVitals.fcp.status}]`);
    console.log(`Cumulative Layout Shift (CLS):  ${data.webVitals.cls.display} [${data.webVitals.cls.status}]`);
    console.log(`Total Blocking Time (TBT):      ${data.webVitals.tbt.display} [${data.webVitals.tbt.status}]`);
    console.log(`Speed Index (SI):               ${data.webVitals.speedIndex.display} [${data.webVitals.speedIndex.status}]`);
    console.log(`Interaction to Next Paint (INP):${data.webVitals.inp.display}`);

    console.log(`\n--- ACTIONABLE OPPORTUNITIES (${data.recommendations.length} found) ---`);
    if (data.recommendations.length === 0) {
      console.log('✅ Excellent! No major performance bottlenecks detected.');
    } else {
      data.recommendations.forEach((rec, idx) => {
        console.log(`${idx + 1}. [${rec.category}] ${rec.title}`);
        if (rec.displayValue) console.log(`   Impact: ${rec.displayValue}`);
      });
    }

  } catch (err) {
    console.error('❌ PageSpeed Audit Error:', err.message);
  }
}

main();
