// Server-side source of truth for prices, shipping and input validation.
// The browser only ever sends product IDs + quantities; it never decides what is charged.
// Keep CATALOG in sync with PRODUCTS in assets/js/main.js (until both read assets/data/products.json).

export const VAT_RATE = 0.2;          // Prices are VAT-INCLUSIVE. Set to 0 if you are not VAT-registered.
export const MAX_QTY_PER_ITEM = 10;

export const CATALOG = {
  'prod-1': { name: 'Stationforge Ork Titan Miniature', pence: 4550 },
  'prod-2': { name: 'Gothic Ruins Scatter Terrain Set', pence: 2400 },
  'prod-3': { name: 'Overgrown Citadel Dice Tower', pence: 1800 },
};

export const SHIPPING = {
  standard: { name: 'Standard UK Delivery (3-5 days)', pence: 395 },
  express: { name: 'Express UK Delivery (1-2 days)', pence: 695 },
};

// Errors we are happy to show to the customer (anything else becomes a generic 500).
export class OrderError extends Error {}

export function buildOrder(items, shippingKey) {
  if (!items || typeof items !== 'object' || Array.isArray(items)) {
    throw new OrderError('Your basket is invalid.');
  }

  const lines = [];
  for (const [id, qty] of Object.entries(items)) {
    if (!Object.hasOwn(CATALOG, id)) throw new OrderError('Your basket contains an unknown product.');
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM) {
      throw new OrderError('Your basket contains an invalid quantity.');
    }
    lines.push({ id, name: CATALOG[id].name, unitPence: CATALOG[id].pence, qty });
  }
  if (lines.length === 0) throw new OrderError('Your basket is empty.');

  if (!Object.hasOwn(SHIPPING, shippingKey)) throw new OrderError('Invalid delivery option.');
  const shipping = { key: shippingKey, ...SHIPPING[shippingKey] };

  const goodsPence = lines.reduce((sum, l) => sum + l.unitPence * l.qty, 0);
  const totalPence = goodsPence + shipping.pence;
  // VAT already contained in the (VAT-inclusive) total, goods + shipping.
  const vatPence = Math.round((totalPence * VAT_RATE) / (1 + VAT_RATE));

  return { lines, shipping, goodsPence, totalPence, vatPence };
}

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanCustomer(raw) {
  const c = raw && typeof raw === 'object' ? raw : {};
  const take = (key, max) => {
    const v = typeof c[key] === 'string' ? c[key].trim() : '';
    if (!v || v.length > max) throw new OrderError('Please check your shipping details.');
    return v;
  };
  const customer = {
    name: take('name', 100),
    email: take('email', 254),
    address: take('address', 150),
    city: take('city', 80),
    postcode: take('postcode', 10).toUpperCase(),
  };
  if (!EMAIL.test(customer.email)) throw new OrderError('Please enter a valid email address.');
  if (!UK_POSTCODE.test(customer.postcode)) throw new OrderError('Please enter a valid UK postcode.');
  return customer;
}

// Human-friendly order reference derived from the Stripe session id (same value everywhere).
export const orderRef = (sessionId) => 'PBH-' + sessionId.slice(-8).toUpperCase();
