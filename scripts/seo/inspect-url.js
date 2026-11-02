import { inspectUrl } from '../../functions/api/seo-service.js';

async function main() {
  const targetUrl = process.argv[2] || 'https://helpit.in/';
  console.log(`\n================ GOOGLE SEARCH CONSOLE URL INSPECTION ================`);
  console.log(`Target URL: ${targetUrl}\n`);

  try {
    const data = await inspectUrl(process.env, targetUrl);

    console.log(`Indexing Verdict:           ${data.verdict} (${data.verdictDetails})`);
    console.log(`Coverage State:             ${data.coverageState}`);
    console.log(`Indexing State:             ${data.indexingState}`);
    console.log(`Last Crawled:               ${data.lastCrawlTime || 'Not yet crawled'}`);
    console.log(`Robots.txt State:           ${data.robotsTxtState}`);
    console.log(`Page Fetch State:           ${data.pageFetchState}`);
    console.log('----------------------------------------------------------------------');
    console.log(`User-Declared Canonical:    ${data.userCanonical || 'None'}`);
    console.log(`Google-Selected Canonical:  ${data.googleCanonical || 'None'}`);
    console.log(`Canonical Match:            ${data.canonicalMatch ? '✅ MATCH' : '⚠️ MISMATCH'}`);
  } catch (err) {
    console.error('❌ URL Inspection Error:', err.message);
  }
}

main();
