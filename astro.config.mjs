import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://helpit.in',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude thank-you page, 404, or internal utility routes from sitemap
        const isExcluded = 
          page.includes('/thank-you') || 
          page.includes('/404') ||
          page.endsWith('/404.html');
        return !isExcluded;
      },
      serialize: (item) => {
        // Enforce canonical trailing slash consistency
        if (!item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }

        // Apply truthful, content-accurate W3C lastmod dates & tiered priority for search engines
        if (item.url === 'https://helpit.in/' || item.url === 'https://helpit.in/services/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (
          item.url.includes('/solutions/') || 
          item.url.includes('/tell-us-what-youre-stuck-on/')
        ) {
          // High-intent solution landing pages
          item.priority = 0.9;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (item.url.includes('/services/')) {
          // Core service & category directories
          item.priority = 0.8;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (
          item.url.includes('/pricing/') || 
          item.url.includes('/locations') || 
          item.url.includes('/monthly-plans/') || 
          item.url.includes('/custom-projects/') || 
          item.url.includes('/free-audit/')
        ) {
          // Locations & commercial package pages
          item.priority = 0.7;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-18');
        } else if (
          item.url.includes('/about/') || 
          item.url.includes('/contact/') || 
          item.url.includes('/portfolio/')
        ) {
          // Brand trust pages
          item.priority = 0.5;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-18');
        } else if (
          item.url.includes('/privacy/') || 
          item.url.includes('/terms/') || 
          item.url.includes('/refund-policy/') || 
          item.url.includes('/delivery-policy/')
        ) {
          // Compliance and legal policy pages
          item.priority = 0.3;
          item.changefreq = 'yearly';
          item.lastmod = new Date('2026-10-18');
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-19');
        }

        return item;
      }
    })
  ]
});
