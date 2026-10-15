import Stripe from 'stripe';

export async function onRequestPost(context) {
  const { request, env } = context;
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const sig = request.headers.get('stripe-signature');
  
  const body = await request.text();

  let event;
  try {
    // Verify the event actually came from Stripe using your webhook secret
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the successful payment event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // --- THIS IS WHERE YOU FINISH THE CHECKOUT SYSTEM ---
    console.log(`Payment successful for Intent ID: ${paymentIntent.id}`);
    
    // Here you can:
    // 1. Save the order details to a database or KV store.
    // 2. Trigger automated dispatch/email notifications.
    // ---------------------------------------------------
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}