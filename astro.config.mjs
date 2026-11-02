import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://helpit.in',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude thank-you page, 404, seo-dashboard, or internal utility/api routes from sitemap
        const isExcluded = 
          page.includes('/thank-you') || 
          page.includes('/404') ||
          page.endsWith('/404.html') ||
          page.includes('/seo-dashboard') ||
          page.includes('/api/');
        return !isExcluded;
      },
      serialize: (item) => {
        // Enforce canonical trailing slash consistency
        if (!item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }

        // 8 Core Service Categories (Tier 3)
        const coreCategories = [
          'ai-setup-assistance',
          'project-deadline-assistance',
          'file-format-document-help',
          'windows-computer-support',
          'business-consultation-digital',
          'website-seo-services',
          'design-images-video',
          'android-app-digital-tools'
        ];

        const isCoreServiceCategory = coreCategories.some(cat => 
          item.url.includes(`/services/${cat}/`)
        );

        // Apply truthful, content-accurate W3C lastmod dates & tiered priority for search engines
        if (item.url === 'https://helpit.in/' || item.url === 'https://helpit.in/services/') {
          // Tier 1: Core Hub & High-Converting Directory
          item.priority = 1.0;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (
          item.url.includes('/solutions/') || 
          item.url.includes('/instagram-views/') || 
          item.url.includes('/tell-us-what-youre-stuck-on/')
        ) {
          // Tier 2: Targeted Solution Landing Pages (High-Intent SEO)
          item.priority = 0.9;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (isCoreServiceCategory) {
          // Tier 3: 8 Core Service Categories
          item.priority = 0.8;
          item.changefreq = 'weekly';
          item.lastmod = new Date('2026-10-19');
        } else if (
          item.url.includes('/pricing/') || 
          item.url.includes('/locations/') ||
          item.url === 'https://helpit.in/locations/' || 
          item.url.includes('/monthly-plans/') || 
          item.url.includes('/custom-projects/') || 
          item.url.includes('/free-audit/')
        ) {
          // Tier 4: Locations & Commercial Pages
          item.priority = 0.7;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-18');
        } else if (
          item.url.includes('/about/') || 
          item.url.includes('/contact/') || 
          item.url.includes('/portfolio/')
        ) {
          // Tier 5: About & Portfolio
          item.priority = 0.5;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-18');
        } else if (
          item.url.includes('/privacy/') || 
          item.url.includes('/terms/') || 
          item.url.includes('/refund-policy/') || 
          item.url.includes('/delivery-policy/')
        ) {
          // Tier 6: Legal & Compliance Policies
          item.priority = 0.3;
          item.changefreq = 'yearly';
          item.lastmod = new Date('2026-10-18');
        } else {
          // Legacy service categories & secondary archives
          item.priority = 0.6;
          item.changefreq = 'monthly';
          item.lastmod = new Date('2026-10-18');
        }

        return item;
      }
    })
  ]
});
