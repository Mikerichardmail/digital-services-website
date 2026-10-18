import { onRequestPost as handleCreatePaymentLink } from './functions/api/create-payment-link.js';
import { onRequestPost as handleRazorpayWebhook } from './functions/api/razorpay-webhook.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. API Route: Create Razorpay Payment Link
    if (url.pathname === '/api/create-payment-link') {
      if (request.method === 'POST') {
        return handleCreatePaymentLink({ request, env, ctx });
      }
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. API Route: Razorpay Webhook
    if (url.pathname === '/api/razorpay-webhook') {
      if (request.method === 'POST') {
        return handleRazorpayWebhook({ request, env, ctx });
      }
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Static Site & Asset Serving (51 Astro Pages, CSS, JS, SVGs, Sitemap)
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Static assets binding not configured.', { status: 500 });
  }
};
