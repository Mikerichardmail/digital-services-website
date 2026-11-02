import { getSearchPerformance } from '../../functions/api/seo-service.js';

async function main() {
  const days = parseInt(process.argv[2] || '28', 10);
  console.log(`\n================ HELPIT.IN SEARCH PERFORMANCE (${days} DAYS) ================`);
  console.log('Querying Google Search Console API (sc-domain:helpit.in)...\n');

  try {
    const data = await getSearchPerformance(process.env, days);
    console.log(`Total Organic Clicks:      ${data.summary.totalClicks}`);
    console.log(`Total Search Impressions:  ${data.summary.totalImpressions}`);
    console.log(`Average CTR:               ${(data.summary.averageCtr * 100).toFixed(2)}%`);
    console.log(`Average Search Position:   ${data.summary.averagePosition}`);
    console.log('--------------------------------------------------------------------------------');

    console.log('\nTop 15 Search Queries:');
    console.log('Query'.padEnd(45) | 'Clicks'.padStart(8) | 'Impr'.padStart(8) | 'CTR'.padStart(8) | 'Pos'.padStart(6));
    console.log('-'.repeat(80));
    data.topQueries.slice(0, 15).forEach((q) => {
      console.log(
        `${q.query.padEnd(45).substring(0, 45)} | ${String(q.clicks).padStart(8)} | ${String(q.impressions).padStart(8)} | ${(q.ctr * 100).toFixed(1).padStart(6)}% | ${q.position.toFixed(1).padStart(6)}`
      );
    });

    console.log('\nTop 10 Performing Pages:');
    console.log('Page'.padEnd(50) | 'Clicks'.padStart(8) | 'Impr'.padStart(8) | 'Pos'.padStart(6));
    console.log('-'.repeat(75));
    data.topPages.slice(0, 10).forEach((p) => {
      console.log(
        `${p.page.replace('https://helpit.in', '').padEnd(50).substring(0, 50)} | ${String(p.clicks).padStart(8)} | ${String(p.impressions).padStart(8)} | ${p.position.toFixed(1).padStart(6)}`
      );
    });

    console.log('\nDevice Breakdown:');
    data.devices.forEach((d) => {
      console.log(`- ${d.device}: ${d.clicks} clicks, ${d.impressions} impressions (avg pos ${d.position.toFixed(1)})`);
    });

  } catch (err) {
    console.error('❌ Error retrieving search performance:', err.message);
  }
}

main();
