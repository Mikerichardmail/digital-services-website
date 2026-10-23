import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
const sitemapZeroPath = path.join(distDir, 'sitemap-0.xml');
const sitemapStandardPath = path.join(distDir, 'sitemap.xml');

// 1. Ensure sitemap.xml exists as an alias/copy of sitemap-index.xml
if (fs.existsSync(sitemapIndexPath)) {
  fs.copyFileSync(sitemapIndexPath, sitemapStandardPath);
  console.log('[post-build] Created dist/sitemap.xml alias from sitemap-index.xml');
} else {
  console.warn('[post-build] Warning: dist/sitemap-index.xml not found');
}

// 2. Validate exclusions
if (fs.existsSync(sitemapZeroPath)) {
  const content = fs.readFileSync(sitemapZeroPath, 'utf8');
  if (content.includes('/thank-you/')) {
    console.error('[post-build] ERROR: /thank-you/ found in sitemap-0.xml!');
    process.exit(1);
  }
  if (content.includes('/404')) {
    console.error('[post-build] ERROR: /404 found in sitemap-0.xml!');
    process.exit(1);
  }
  console.log('[post-build] Verified: /thank-you/ and /404 successfully excluded from sitemap.');
}
