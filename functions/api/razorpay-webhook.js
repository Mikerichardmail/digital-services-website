async function verifyRazorpaySignature(rawBody, signature, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(rawBody));
  const hashHex = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex === signature;
}

export async function onRequestPost({ request, env }) {
  try {
    const signature = request.headers.get('x-razorpay-signature');
    const rawBody = await request.text();

    const webhookSecret = env?.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      console.warn('Missing signature or RAZORPAY_WEBHOOK_SECRET');
      // Return 200 in dev/mock or 400 if secret configured
      if (webhookSecret) {
        return new Response('Unauthorized webhook signature', { status: 400 });
      }
    } else {
      const isValid = await verifyRazorpaySignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error('Invalid Razorpay webhook signature');
        return new Response('Invalid webhook signature', { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    console.log('Verified Razorpay Webhook Event:', event.event);

    if (event.event === 'payment_link.paid') {
      const paymentLink = event.payload.payment_link.entity;
      const payment = event.payload.payment.entity;

      const orderInfo = {
        paymentLinkId: paymentLink.id,
        amount: paymentLink.amount / 100,
        currency: paymentLink.currency,
        customerName: paymentLink.customer?.name,
        customerEmail: paymentLink.customer?.email,
        customerContact: paymentLink.customer?.contact,
        notes: paymentLink.notes,
        paymentId: payment.id,
        method: payment.method,
        status: payment.status,
        timestamp: new Date().toISOString()
      };

      console.log('Order Paid Successfully:', JSON.stringify(orderInfo, null, 2));
      // In production, integrate email notification or WhatsApp webhook here
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Webhook processing error:', err);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
