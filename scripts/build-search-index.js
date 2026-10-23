import fs from 'node:fs';
import path from 'node:path';

const servicesPath = path.resolve('src/data/services.json');
const outputPath = path.resolve('public/search-index.json');

const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

// Generate lightweight search index for fast client-side filtering
const searchIndex = services.map(s => ({
  id: s.id,
  name: s.name,
  category: s.category,
  priceDisplay: s.priceDisplay,
  deliveryType: s.deliveryType,
  shortDesc: s.shortDesc || '',
  searchTerms: s.searchTerms || ''
}));

fs.writeFileSync(outputPath, JSON.stringify(searchIndex));
console.log(`[build-search-index] Wrote ${searchIndex.length} items to ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
