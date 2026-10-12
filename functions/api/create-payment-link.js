import services from '../../src/data/services.json';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { serviceId, name, email, phone, note } = body;

    if (!serviceId) {
      return new Response(JSON.stringify({ error: 'Service ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Lookup service server-side - NEVER trust client price
    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      return new Response(JSON.stringify({ error: 'Service not found in catalog' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const price = service.priceFrom;
    if (!price || price < 500) {
      return new Response(JSON.stringify({ error: 'Invalid service amount for online checkout' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const amountInPaise = price * 100;
    const keyId = env?.RAZORPAY_KEY_ID;
    const keySecret = env?.RAZORPAY_KEY_SECRET;

    // Local dev / test fallback if keys are not yet configured
    if (!keyId || !keySecret) {
      console.warn('Razorpay keys not configured in environment. Returning test redirect.');
      return new Response(JSON.stringify({
        short_url: '/thank-you?test_mode=1',
        notice: 'Test mode active (Razorpay keys not set in environment)'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);
    const callbackUrl = `${url.origin}/thank-you`;
    const formattedPhone = phone?.startsWith('+91') ? phone : `+91${phone?.replace(/^0+/, '')}`;

    const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);

    const razorpayPayload = {
      amount: amountInPaise,
      currency: 'INR',
      accept_partial: false,
      description: service.name,
      customer: {
        name: name || 'Valued Customer',
        email: email || '',
        contact: formattedPhone || ''
      },
      notify: {
        sms: true,
        email: true
      },
      reminder_enable: true,
      notes: {
        serviceId: service.id,
        serviceName: service.name,
        customerNote: note || ''
      },
      callback_url: callbackUrl,
      callback_method: 'get'
    };

    const res = await fetch('https://api.razorpay.com/v1/payment_links', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(razorpayPayload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Razorpay API error:', data);
      return new Response(JSON.stringify({ error: data.error?.description || 'Failed to create Razorpay link' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ short_url: data.short_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Payment link generation exception:', err);
    return new Response(JSON.stringify({ error: 'Internal server error processing payment request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
