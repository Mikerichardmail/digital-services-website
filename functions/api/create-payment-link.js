import services from '../../src/data/services.json';
import site from '../../src/data/site.json';

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { 
      serviceId, 
      name, 
      email, 
      phone, 
      note, 
      deliveryMethod = 'remote', 
      pincode = '', 
      area = '' 
    } = body;

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

    // Minimum base service price is ₹500
    let basePrice = Math.max(service.priceFrom || 500, 500);

    // Home visit surcharge logic: +₹1,000
    const isHomeVisit = deliveryMethod === 'home-visit';
    const homeVisitSurcharge = isHomeVisit ? (site.homeVisitSurcharge || 1000) : 0;
    const finalPrice = basePrice + homeVisitSurcharge;

    if (finalPrice < 500) {
      return new Response(JSON.stringify({ error: 'Minimum service charge is ₹500' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validation for home visit pincode
    if (isHomeVisit && (!pincode || pincode.trim().length < 6)) {
      return new Response(JSON.stringify({ error: 'Valid 6-digit area pincode is required for home visit' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const amountInPaise = finalPrice * 100;
    const keyId = env?.RAZORPAY_KEY_ID;
    const keySecret = env?.RAZORPAY_KEY_SECRET;

    const formattedPhone = phone?.startsWith('+91') ? phone : `+91${phone?.replace(/^0+/, '')}`;

    // Local dev / test fallback if keys are not yet configured in Cloudflare environment
    if (!keyId || !keySecret) {
      console.warn('Razorpay keys not configured in environment. Returning test redirect.');
      const testRef = 'HLP-' + Math.floor(100000 + Math.random() * 900000);
      const testUrl = `/thank-you?booking_id=${testRef}&service=${encodeURIComponent(service.name)}&amount=${finalPrice}&delivery=${deliveryMethod}&test_mode=1`;
      return new Response(JSON.stringify({
        short_url: testUrl,
        bookingId: testRef,
        notice: 'Test mode active (Razorpay keys pending in Cloudflare dashboard)'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);
    const callbackUrl = `${url.origin}/thank-you?service=${encodeURIComponent(service.name)}&amount=${finalPrice}&delivery=${deliveryMethod}`;

    const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);

    const razorpayPayload = {
      amount: amountInPaise,
      currency: 'INR',
      accept_partial: false,
      description: `${service.name} (${isHomeVisit ? 'Home Visit' : 'Remote'})`,
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
        deliveryMethod: isHomeVisit ? 'Home Visit (+₹1,000)' : 'Remote Pan-India',
        basePrice: `₹${basePrice}`,
        homeVisitFee: `₹${homeVisitSurcharge}`,
        totalAmount: `₹${finalPrice}`,
        areaPincode: pincode || 'N/A',
        areaLocation: area || 'N/A',
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

    return new Response(JSON.stringify({ short_url: data.short_url, paymentLinkId: data.id }), {
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
