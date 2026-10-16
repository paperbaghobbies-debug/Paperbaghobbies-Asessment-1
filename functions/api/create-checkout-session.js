import { buildOrder, cleanCustomer, OrderError } from '../_lib/pricing.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export async function onRequestPost({ request, env }) {
  try {
    if (!env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured.');
      return json({ error: 'Payments are temporarily unavailable.' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    // Recompute everything on the server. Client-sent prices/totals are never read.
    const order = buildOrder(body.items, body.shipping);
    const customer = cleanCustomer(body.customer);

    const origin = new URL(request.url).origin;
    const params = new URLSearchParams({
      mode: 'payment',
      customer_email: customer.email,   // pre-fills Stripe, and lets Stripe email the receipt
      success_url: `${origin}/checkout.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout.html`,
      'metadata[name]': customer.name,
      'metadata[address]': customer.address,
      'metadata[city]': customer.city,
      'metadata[postcode]': customer.postcode,
      'metadata[shipping]': order.shipping.key,
      'metadata[basket]': JSON.stringify(Object.fromEntries(order.lines.map((l) => [l.id, l.qty]))),
    });
    // No payment_method_types: Stripe uses the methods enabled in your Dashboard (add PayPal there).

    const addLine = (i, name, unitPence, qty) => {
      params.set(`line_items[${i}][price_data][currency]`, 'gbp');
      params.set(`line_items[${i}][price_data][unit_amount]`, String(unitPence));
      params.set(`line_items[${i}][price_data][product_data][name]`, name);
      params.set(`line_items[${i}][quantity]`, String(qty));
    };
    order.lines.forEach((l, i) => addLine(i, l.name, l.unitPence, l.qty));
    addLine(order.lines.length, order.shipping.name, order.shipping.pence, 1);

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      console.error('Stripe error:', stripeData.error?.message);
      return json({ error: 'Could not start payment. Please try again.' }, 502);
    }
    return json({ url: stripeData.url });
  } catch (err) {
    if (err instanceof OrderError) return json({ error: err.message }, 400);
    console.error('create-checkout-session failed:', err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
