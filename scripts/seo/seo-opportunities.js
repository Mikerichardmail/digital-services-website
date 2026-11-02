import { getSeoOpportunities } from '../../functions/api/seo-service.js';

async function main() {
  console.log('\n================ HELPIT.IN SEO OPPORTUNITIES & DIAGNOSTICS ================');
  console.log('Analyzing Search Console query positions, CTR curve, and traffic trends...\n');

  try {
    const data = await getSeoOpportunities(process.env);

    console.log(`\n1. STRIKING DISTANCE KEYWORDS (Positions 5 - 30) - Count: ${data.strikingDistance.length}`);
    console.log('These queries have proven impressions and can jump to the Top 3 with targeted content & links:\n');
    console.log('Query'.padEnd(45) | 'Page'.padEnd(25) | 'Pos'.padStart(6) | 'Impr'.padStart(8));
    console.log('-'.repeat(90));
    data.strikingDistance.slice(0, 15).forEach((item) => {
      const pageShort = item.page.replace('https://helpit.in', '') || '/';
      console.log(
        `${item.query.padEnd(45).substring(0, 45)} | ${pageShort.padEnd(25).substring(0, 25)} | ${item.position.toFixed(1).padStart(6)} | ${String(item.impressions).padStart(8)}`
      );
    });

    console.log(`\n2. HIGH IMPRESSION, LOW CTR KEYWORDS (Page 1 Title/Meta Optimization) - Count: ${data.lowCtrKeywords.length}`);
    console.log('Users are seeing these results but clicking competitors. Optimize <title> & meta description:\n');
    console.log('Query'.padEnd(45) | 'Page'.padEnd(25) | 'Pos'.padStart(6) | 'Impr'.padStart(8) | 'CTR'.padStart(7));
    console.log('-'.repeat(98));
    data.lowCtrKeywords.slice(0, 10).forEach((item) => {
      const pageShort = item.page.replace('https://helpit.in', '') || '/';
      console.log(
        `${item.query.padEnd(45).substring(0, 45)} | ${pageShort.padEnd(25).substring(0, 25)} | ${item.position.toFixed(1).padStart(6)} | ${String(item.impressions).padStart(8)} | ${(item.ctr * 100).toFixed(1).padStart(6)}%`
      );
    });

    console.log(`\n3. CONTENT DECAY COMPARISON (Current 28d vs Previous 28d) - Count: ${data.contentDecay.length}`);
    if (data.contentDecay.length === 0) {
      console.log('✅ Good news! No pages have experienced critical click decay in this window.');
    } else {
      data.contentDecay.forEach((item) => {
        console.log(`- Page: ${item.page}`);
        console.log(`  Clicks: ${item.previousClicks} -> ${item.currentClicks} (${item.clickChange})`);
        console.log(`  Action: ${item.recommendation}\n`);
      });
    }

  } catch (err) {
    console.error('❌ Error analyzing SEO opportunities:', err.message);
  }
}

main();
