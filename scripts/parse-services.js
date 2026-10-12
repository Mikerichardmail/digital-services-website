import fs from 'node:fs';
import path from 'node:path';

const planFile = path.resolve('services_website_plan-1.md');
const content = fs.readFileSync(planFile, 'utf-8');

const heroKeywords = [
  'local business package',
  'basic package',
  'standard package',
  'premium package',
  'business website',
  'google business profile creation and setup',
  'google business profile optimization',
  'local seo setup',
  'local ranking optimization',
  'custom android app for clients',
  'simple utility',
  'chrome extension development',
  'pdf toolkit bundle',
  'laptop care bundle',
  'slow pc / laptop optimization',
  'new laptop setup bundle',
  'wifi router setup',
  'logo design',
  'visiting card design',
  'channel setup and branding',
  'wordpress error fixing',
  'technical consultation',
  'monthly technical support plan'
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parsePrice(raw) {
  // e.g. "3,000–6,000", "25,000+", "500", "1,000–3,000 /mo", "Quote", "24,999 + 5,999 /mo"
  const clean = raw.trim();
  const nums = clean.replace(/,/g, '').match(/\d+/g);
  if (!nums || nums.length === 0) {
    return { from: 0, to: 0, display: clean };
  }
  const from = parseInt(nums[0], 10);
  const to = nums.length > 1 ? parseInt(nums[1], 10) : from;
  return { from, to, display: clean.includes('₹') ? clean : `₹${clean}` };
}

// Category map
const categoryMap = {
  '1. website development': 'website-development',
  '2. website support & fixes': 'website-support-fixes',
  '3. domain, hosting & technical setup': 'domain-hosting-setup',
  '4. android app development': 'android-app-development',
  '5. chrome extensions': 'chrome-extensions',
  '6. seo & local seo': 'seo-local-seo',
  '7. google business profile & google maps': 'google-business-maps',
  '8. local business packages': 'local-business-packages',
  '9. graphic & ad design': 'graphic-ad-design',
  '10. ai content & image services': 'ai-content-image-services',
  '11. youtube services': 'youtube-services',
  '12. instagram & social media': 'instagram-social-media',
  '13. content writing': 'content-writing',
  '14. pdf & document services': 'pdf-document-services',
  '15. remote computer & tech help': 'remote-computer-tech-help',
  '16. account & digital setup assistance': 'account-digital-setup',
  '17. technical consultation': 'technical-consultation'
};

const lines = content.split('\n');
let currentCategory = null;
const services = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('### ')) {
    const header = line.replace('### ', '').toLowerCase().trim();
    for (const [k, v] of Object.entries(categoryMap)) {
      if (header.includes(k) || k.includes(header)) {
        currentCategory = v;
        break;
      }
    }
  }

  if (line.startsWith('## 2. Filtered views')) {
    break; // Stop at section 2
  }

  if (line.startsWith('|') && currentCategory) {
    const parts = line.split('|').map(s => s.trim()).filter(Boolean);
    // Table format: | Service | Price (₹) | Type | Pay |
    if (parts.length >= 4 && parts[0] !== 'Service' && !parts[0].includes('---')) {
      const name = parts[0];
      const priceRaw = parts[1];
      const typeRaw = parts[2].toLowerCase(); // one-time, monthly, custom
      const payRaw = parts[3].toLowerCase();   // link, quote, sub, custom

      const priceInfo = parsePrice(priceRaw);
      const id = slugify(name);

      const isHero = heroKeywords.some(keyword => name.toLowerCase().includes(keyword));

      services.push({
        id,
        category: currentCategory,
        name,
        priceFrom: priceInfo.from,
        priceTo: priceInfo.to,
        priceDisplay: priceInfo.display,
        type: typeRaw.includes('monthly') ? 'monthly' : (typeRaw.includes('custom') ? 'custom' : 'one-time'),
        pay: payRaw.includes('link') ? 'link' : (payRaw.includes('quote') ? 'quote' : (payRaw.includes('sub') ? 'sub' : 'custom')),
        hero: isHero
      });
    }
  }
}

// deduplicate IDs if any collisions
const seen = new Set();
services.forEach(s => {
  let uniqueId = s.id;
  let counter = 2;
  while (seen.has(uniqueId)) {
    uniqueId = `${s.id}-${counter++}`;
  }
  seen.add(uniqueId);
  s.id = uniqueId;
});

const outPath = path.resolve('src/data/services.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(services, null, 2), 'utf-8');

console.log(`Successfully parsed ${services.length} services across 17 categories.`);
