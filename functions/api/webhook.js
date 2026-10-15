import Stripe from 'stripe';

export async function onRequest(context) {
  const { request, env } = context;

  // Ensure it's a POST request from Stripe
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded' || event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`Payment successful for Session/Intent ID: ${session.id}`);
    
    // TODO: Save order details to KV / D1 database here if desired
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}