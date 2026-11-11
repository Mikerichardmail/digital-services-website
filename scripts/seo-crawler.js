import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const OUTPUT_CSV = path.resolve('SEO-AUDIT/data/pages.csv');
const OUTPUT_JSON = path.resolve('SEO-AUDIT/data/pages.json');

// Ensure output dir exists
fs.mkdirSync(path.dirname(OUTPUT_CSV), { recursive: true });

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

function filePathToUrl(filePath) {
  const relative = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');
  if (relative === 'index.html') return 'https://helpit.in/';
  if (relative === '404.html') return 'https://helpit.in/404';
  if (relative.endsWith('/index.html')) {
    return `https://helpit.in/${relative.slice(0, -'/index.html'.length)}`;
  }
  if (relative.endsWith('.html')) {
    return `https://helpit.in/${relative.slice(0, -'.html'.length)}`;
  }
  return `https://helpit.in/${relative}`;
}

function extractTagContent(html, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1].replace(/<[^>]+>/g, '').trim());
  }
  return matches;
}

function extractMeta(html, nameOrProperty, value) {
  const regex = new RegExp(`<meta[^>]+${nameOrProperty}=["']${value}["'][^>]+content=["']([^"']*)["']`, 'i');
  const match = regex.exec(html);
  if (match) return match[1].trim();
  const reverseRegex = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${nameOrProperty}=["']${value}["']`, 'i');
  const reverseMatch = reverseRegex.exec(html);
  return reverseMatch ? reverseMatch[1].trim() : null;
}

function extractCanonical(html) {
  const match = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i.exec(html);
  if (match) return match[1].trim();
  const reverseMatch = /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i.exec(html);
  return reverseMatch ? reverseMatch[1].trim() : null;
}

function extractImages(html) {
  const imgRegex = /<img\b([^>]*)>/gi;
  const images = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1];
    const srcMatch = /src=["']([^"']*)["']/i.exec(attrs);
    const altMatch = /alt=["']([^"']*)["']/i.exec(attrs);
    const hasAlt = /alt=/i.test(attrs);
    const widthMatch = /width=["']([^"']*)["']/i.exec(attrs);
    const heightMatch = /height=["']([^"']*)["']/i.exec(attrs);
    const loadingMatch = /loading=["']([^"']*)["']/i.exec(attrs);
    const fetchpriorityMatch = /fetchpriority=["']([^"']*)["']/i.exec(attrs);
    
    images.push({
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : (hasAlt ? '' : null),
      hasAltAttr: hasAlt,
      width: widthMatch ? widthMatch[1] : null,
      height: heightMatch ? heightMatch[1] : null,
      loading: loadingMatch ? loadingMatch[1] : null,
      fetchpriority: fetchpriorityMatch ? fetchpriorityMatch[1] : null
    });
  }
  return images;
}

function extractLinks(html) {
  const linkRegex = /<a\b([^>]*)href=["']([^"']*)["']([^>]*)>([\s\S]*?)<\/a>/gi;
  const links = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[2].trim();
    const fullTag = match[0];
    const anchorText = match[4].replace(/<[^>]+>/g, '').trim();
    const relMatch = /rel=["']([^"']*)["']/i.exec(fullTag);
    const rel = relMatch ? relMatch[1] : '';
    links.push({ href, anchorText, rel });
  }
  return links;
}

function extractSchemas(html) {
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const schemas = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push(parsed);
    } catch (e) {
      schemas.push({ error: 'invalid JSON' });
    }
  }
  return schemas;
}

function extractWordCount(html) {
  // Strip head, scripts, styles
  let body = html.replace(/<head[\s\S]*?<\/head>/gi, '')
                 .replace(/<script[\s\S]*?<\/script>/gi, '')
                 .replace(/<style[\s\S]*?<\/style>/gi, '')
                 .replace(/<svg[\s\S]*?<\/svg>/gi, '')
                 .replace(/<[^>]+>/g, ' ')
                 .replace(/\s+/g, ' ')
                 .trim();
  const words = body.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

function crawl() {
  const files = getAllHtmlFiles(DIST_DIR);
  console.log(`Found ${files.length} HTML files in ${DIST_DIR}`);

  const pagesData = [];

  for (const filePath of files) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const url = filePathToUrl(filePath);
    const is404 = path.basename(filePath) === '404.html';
    const statusCode = is404 ? 404 : 200;

    // Titles
    const titles = extractTagContent(html, 'title');
    const title = titles.length > 0 ? titles[0] : '';
    const titleLength = title.length;

    // Meta description
    const metaDescription = extractMeta(html, 'name', 'description') || '';
    const metaDescriptionLength = metaDescription.length;

    // Robots meta
    const robotsMeta = extractMeta(html, 'name', 'robots') || '';

    // Viewport
    const viewportTag = extractMeta(html, 'name', 'viewport') || '';

    // Headings
    const h1s = extractTagContent(html, 'h1');
    const h2s = extractTagContent(html, 'h2');
    const h3s = extractTagContent(html, 'h3');

    // Canonical
    const canonical = extractCanonical(html) || '';

    // Word count
    const wordCount = extractWordCount(html);

    // Images
    const images = extractImages(html);
    const imagesCount = images.length;
    const imagesMissingAlt = images.filter(img => !img.hasAltAttr || img.alt === null).length;
    
    // Check local image sizes if src points to public or dist
    let largeImagesCount = 0;
    for (const img of images) {
      if (img.src && !img.src.startsWith('http')) {
        let cleanSrc = img.src.split('?')[0].split('#')[0];
        if (cleanSrc.startsWith('/')) cleanSrc = cleanSrc.slice(1);
        const diskPath = path.join(DIST_DIR, cleanSrc);
        if (fs.existsSync(diskPath)) {
          const size = fs.statSync(diskPath).size;
          if (size > 100 * 1024) { // > 100 KB
            largeImagesCount++;
          }
        }
      }
    }

    // Links
    const links = extractLinks(html);
    const internalLinks = [];
    const externalLinks = [];

    for (const link of links) {
      if (link.href.startsWith('#') || link.href.startsWith('mailto:') || link.href.startsWith('tel:') || link.href.startsWith('javascript:')) {
        continue;
      }
      if (link.href.startsWith('http://') || link.href.startsWith('https://')) {
        if (link.href.includes('helpit.in') || link.href.includes('localhost')) {
          internalLinks.push(link);
        } else {
          externalLinks.push(link);
        }
      } else {
        internalLinks.push(link);
      }
    }

    // Schemas
    const schemas = extractSchemas(html);
    const schemaTypes = schemas.map(s => {
      if (s['@type']) return s['@type'];
      if (s['@graph']) return s['@graph'].map(g => g['@type']).join('+');
      return 'Unknown';
    });

    // Open Graph
    const ogTitle = extractMeta(html, 'property', 'og:title') || '';
    const ogDescription = extractMeta(html, 'property', 'og:description') || '';
    const ogImage = extractMeta(html, 'property', 'og:image') || '';
    const ogUrl = extractMeta(html, 'property', 'og:url') || '';
    const ogSiteName = extractMeta(html, 'property', 'og:site_name') || '';

    const pageRecord = {
      filePath,
      url,
      statusCode,
      finalUrl: url,
      title,
      titleLength,
      metaDescription,
      metaDescriptionLength,
      h1s,
      h2s,
      h3s,
      canonical,
      robotsMeta,
      wordCount,
      imagesCount,
      imagesMissingAlt,
      largeImagesCount,
      images,
      internalLinksCount: internalLinks.length,
      internalLinks: internalLinks.map(l => l.href),
      externalLinksCount: externalLinks.length,
      externalLinks: externalLinks.map(l => l.href),
      schemaTypes,
      schemas,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogSiteName,
      viewportTag
    };

    pagesData.push(pageRecord);
  }

  // Write JSON
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(pagesData, null, 2), 'utf-8');
  console.log(`Saved detailed crawl data to ${OUTPUT_JSON}`);

  // Write CSV
  const csvHeaders = [
    'URL',
    'Status Code',
    'Final URL',
    'Title',
    'Title Length',
    'Meta Description',
    'Meta Description Length',
    'H1',
    'H2 Count',
    'H3 Count',
    'Canonical',
    'Robots Meta',
    'Word Count',
    'Images Count',
    'Missing ALT Count',
    'Large Images Count',
    'Internal Links Count',
    'External Links Count',
    'Schema Types',
    'OG Title',
    'OG Image',
    'Viewport Tag'
  ];

  function escapeCsv(val) {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  }

  const csvRows = [csvHeaders.join(',')];
  for (const p of pagesData) {
    const row = [
      escapeCsv(p.url),
      p.statusCode,
      escapeCsv(p.finalUrl),
      escapeCsv(p.title),
      p.titleLength,
      escapeCsv(p.metaDescription),
      p.metaDescriptionLength,
      escapeCsv(p.h1s.join(' | ')),
      p.h2s.length,
      p.h3s.length,
      escapeCsv(p.canonical),
      escapeCsv(p.robotsMeta),
      p.wordCount,
      p.imagesCount,
      p.imagesMissingAlt,
      p.largeImagesCount,
      p.internalLinksCount,
      p.externalLinksCount,
      escapeCsv(p.schemaTypes.join('; ')),
      escapeCsv(p.ogTitle),
      escapeCsv(p.ogImage),
      escapeCsv(p.viewportTag)
    ];
    csvRows.push(row.join(','));
  }

  fs.writeFileSync(OUTPUT_CSV, csvRows.join('\n'), 'utf-8');
  console.log(`Saved CSV summary to ${OUTPUT_CSV}`);
}

crawl();
