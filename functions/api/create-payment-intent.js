export async function onRequestPost(context) {
  try {
    // 1. Read the incoming request payload from checkout script
    const body = await context.request.json();
    const amountInPence = Math.round(body.amount * 100); // Convert pounds to pence for Stripe

    // 2. Securely grab the Stripe Secret Key from Cloudflare environment variables
    const stripeSecretKey = context.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Stripe secret key not configured on server." }), 
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. Build url-encoded payload string for Stripe
    const params = new URLSearchParams({
      amount: amountInPence,
      currency: "gbp",
      "automatic_payment_methods[enabled]": "true",
    });

    // 4. Call Stripe API to create a PaymentIntent
    const stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(), // <--- Ensure params are explicitly converted to a string
    });

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      throw new Error(stripeData.error?.message || "Failed to create Stripe payment intent.");
    }

    // 5. Return the client secret back to the frontend checkout script
    return new Response(
      JSON.stringify({ clientSecret: stripeData.client_secret }), 
      {
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}