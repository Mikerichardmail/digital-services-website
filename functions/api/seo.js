import {
  getSearchPerformance,
  getSeoOpportunities,
  inspectUrl,
  getSitemapStatus,
  submitSitemap,
  runPageSpeedAudit
} from './seo-service.js';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

function errorResponse(message, status = 500) {
  return jsonResponse({ error: true, message }, status);
}

export async function onRequest({ request, env }) {
  try {
    const url = new URL(request.url);

    // POST Actions
    if (request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const action = body.action || url.searchParams.get('action');

      if (action === 'submit-sitemap') {
        const sitemapUrl = body.sitemapUrl || 'https://helpit.in/sitemap-index.xml';
        const res = await submitSitemap(env, sitemapUrl);
        return jsonResponse(res);
      }

      return errorResponse(`Unsupported POST action: ${action}`, 400);
    }

    // GET Actions
    if (request.method === 'GET') {
      const action = url.searchParams.get('action') || 'overview';

      // 1. Search Performance Overview & Trends
      if (action === 'overview') {
        const days = parseInt(url.searchParams.get('days') || '28', 10);
        const data = await getSearchPerformance(env, days);
        return jsonResponse(data);
      }

      // 2. SEO Opportunities & Content Decay
      if (action === 'opportunities') {
        const data = await getSeoOpportunities(env);
        return jsonResponse(data);
      }

      // 3. Search Console URL Inspection API
      if (action === 'url-inspection') {
        const targetUrl = url.searchParams.get('url') || 'https://helpit.in/';
        const data = await inspectUrl(env, targetUrl);
        return jsonResponse(data);
      }

      // 4. Sitemap status & coverage check
      if (action === 'sitemaps') {
        const data = await getSitemapStatus(env);
        return jsonResponse(data);
      }

      // 5. Google PageSpeed Insights Audit
      if (action === 'pagespeed') {
        const targetUrl = url.searchParams.get('url') || 'https://helpit.in/';
        const strategy = url.searchParams.get('strategy') || 'mobile';
        const data = await runPageSpeedAudit(env, targetUrl, strategy);
        return jsonResponse(data);
      }

      return errorResponse(`Unknown SEO action: ${action}`, 400);
    }

    return errorResponse('Method Not Allowed', 405);
  } catch (err) {
    console.error('SEO API Error:', err);
    return errorResponse(err.message || 'Internal Server Error', 500);
  }
}
