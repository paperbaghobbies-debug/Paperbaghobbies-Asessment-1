import Stripe from 'stripe';
import { orderRef } from '../_lib/pricing.js';

export async function onRequest(context) {
  const { request, env } = context;
  
  // Diagnostic log to verify if secrets are loaded correctly
  console.log('--- WEBHOOK DEBUG ---');
  console.log('Available env keys:', Object.keys(env || {}));
  console.log('Secret Key exists:', !!env.STRIPE_SECRET_KEY);
  console.log('Webhook Secret exists:', !!env.STRIPE_WEBHOOK_SECRET);

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!env.STRIPE_SECRET_KEY) {
    return new Response('Server Error: STRIPE_SECRET_KEY is missing from environment', { status: 500 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  const sig = request.headers.get('stripe-signature');
  const body = await request.text(); // must be the raw, unparsed body

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object;
    if (session.payment_status === 'paid') {
      const m = session.metadata || {};
      const order = {
        ref: orderRef(session.id),
        sessionId: session.id,
        email: session.customer_details?.email ?? session.customer_email ?? null,
        totalPence: session.amount_total,
        currency: session.currency,
        customer: { name: m.name, address: m.address, city: m.city, postcode: m.postcode },
        shipping: m.shipping,
        basket: m.basket,
        paidAt: new Date().toISOString(),
      };
      
      if (env.ORDERS) {
        await env.ORDERS.put(`order:${session.id}`, JSON.stringify(order));
        console.log(`Order stored: ${order.ref}`);
      } else {
        console.warn(`ORDERS KV binding missing - order ${order.ref} was NOT stored`);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}