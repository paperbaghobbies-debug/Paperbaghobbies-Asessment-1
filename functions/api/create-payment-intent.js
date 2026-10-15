export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const amountInPence = Math.round(body.amount * 100);
    const stripeSecretKey = context.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Stripe secret key not configured on server." }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the origin dynamically to redirect back after payment
    const url = new URL(context.request.url);
    const successUrl = `${url.origin}/checkout.html?success=true`;
    const cancelUrl = `${url.origin}/checkout.html`;

    // Build payload for a Stripe Checkout Session
    const params = new URLSearchParams({
      "payment_method_types[0]": "card",
      "mode": "payment",
      "line_items[0][price_data][currency]": "gbp",
      "line_items[0][price_data][unit_amount]": amountInPence,
      "line_items[0][price_data][product_data][name]": "Paperbag Hobbies Order",
      "line_items[0][quantity]": "1",
      "success_url": successUrl,
      "cancel_url": cancelUrl,
    });

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      throw new Error(stripeData.error?.message || "Failed to create Stripe Checkout session.");
    }

    // Return the hosted Stripe checkout URL to the frontend
    return new Response(
      JSON.stringify({ url: stripeData.url }), 
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}