import { orderRef } from '../_lib/pricing.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

// GET /api/order-status?session_id=cs_... -> asks Stripe whether this session was really paid.
export async function onRequestGet({ request, env }) {
  const sessionId = new URL(request.url).searchParams.get('session_id');
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return json({ error: 'Invalid session.' }, 400);
  }

  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  if (!res.ok) return json({ error: 'Order not found.' }, 404);

  const s = await res.json();
  if (s.payment_status !== 'paid') return json({ paid: false });

  const m = s.metadata || {};
  return json({
    paid: true,
    orderRef: orderRef(s.id),
    name: m.name || '',
    address: [m.address, m.city, m.postcode].filter(Boolean).join(', '),
    totalPence: s.amount_total,
  });
}
