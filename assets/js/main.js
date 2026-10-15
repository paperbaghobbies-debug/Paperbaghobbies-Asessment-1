/**
 * Paperbag Hobbies - Main JavaScript Architecture
 */

/* ==========================================================================
   1. PRODUCT CATALOG DATASET
   ========================================================================== */

const PRODUCTS = [
  {
    id: "prod-1",
    title: "Grimdark Sci-Fi Squad Commander",
    badge: "RESIN PRINT",
    category: "models",
    price: 12.50,
    image: "assets/images/placeholder.png",
    alt: "High-detail 28mm scale resin miniature",
    description: "High-detail 28mm scale resin miniature. Cleaned, cured, and ready for priming."
  },
  {
    id: "prod-2",
    title: "Gothic Ruins Scatter Terrain Set",
    badge: "PLA TERRAIN",
    category: "models",
    price: 24.00,
    image: "assets/images/placeholder.png",
    alt: "Modular 3D printed terrain set",
    description: "Modular 3D printed terrain set designed for 28mm/32mm tabletop wargaming."
  },
  {
    id: "prod-3",
    title: "Overgrown Citadel Dice Tower",
    badge: "CUSTOM ORDER",
    category: "tools",
    price: 18.00,
    image: "assets/images/placeholder.png",
    alt: "Detailed dice tower",
    description: "Detailed dice tower engineered for smooth rolls with standard D20 and D6 sets."
  }
];

/* ==========================================================================
   2. ROBUST STATE & CART ENGINE (Dictionary Pattern & Persistence)
   ========================================================================== */

const money = n => "£" + n.toFixed(2);
let cartState = {};

function loadCart() {
  try {
    const saved = localStorage.getItem("paperbag_cart");
    if (saved) cartState = JSON.parse(saved);
  } catch { 
    cartState = {}; 
  }
}

function saveCart() {
  try { 
    localStorage.setItem("paperbag_cart", JSON.stringify(cartState)); 
  } catch {
    // Intentionally left blank
  }
  updateCartUI();
}
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    console.error(`Product ID "${productId}" not found.`);
    return false;
  }
  cartState[productId] = (cartState[productId] || 0) + quantity;
  saveCart();
  return true;
}

function updateQuantity(productId, delta) {
  if (!cartState[productId]) return;
  cartState[productId] += delta;
  if (cartState[productId] <= 0) {
    delete cartState[productId];
  }
  saveCart();
}

function removeFromCart(productId) {
  if (cartState[productId]) {
    delete cartState[productId];
    saveCart();
  }
}

function clearCart() {
  cartState = {};
  saveCart();
}

function getTotalCount() {
  return Object.values(cartState).reduce((sum, qty) => sum + qty, 0);
}

function getGrandTotal() {
  return Object.entries(cartState).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
}

function updateCartUI() {
  updateCartBadges();
  renderCartView();
  renderCartPopover();
  updateCartSummaryUI();
}

// ==========================================
// CONFIGURATION FOR VAT & SHIPPING (v2.0)
// ==========================================
const CONFIG = {
  VAT_RATE: 0.20,                   // 20% UK Standard VAT Rate
  SHIPPING_RATES: {
    standard: 3.95,
    express: 6.95
  }
};

/**
 * Calculates complete order totals including Net subtotal, VAT, Shipping, and Grand Total.
 * @param {string} shippingMethod - 'standard' or 'express'
 */
function getCartOrderSummary(shippingMethod = 'standard') {
  let subtotal = 0;

  for (const [productId, quantity] of Object.entries(cartState)) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      subtotal += product.price * quantity;
    }
  }

  const selectedShippingCost = CONFIG.SHIPPING_RATES[shippingMethod] || CONFIG.SHIPPING_RATES.standard;
  const vatAmount = subtotal * CONFIG.VAT_RATE;
  const grandTotal = subtotal + selectedShippingCost + vatAmount;

  return {
    subtotal: subtotal,
    vatAmount: vatAmount,
    shippingCost: selectedShippingCost,
    grandTotal: grandTotal,
  };
}

/**
 * Updates summary text elements and badges on cart.html
 */
function updateCartSummaryUI() {
  const shippingSelect = document.getElementById('shipping-select');
  if (!shippingSelect) return; 

  const selectedMethod = shippingSelect.value;
  const summary = getCartOrderSummary(selectedMethod);

  // --- NEW: Render itemized list inside checkout summary card if container exists ---
  const checkoutItemsContainer = document.getElementById('checkout-items-summary');
  if (checkoutItemsContainer) {
    const entries = Object.entries(cartState).filter(([, qty]) => qty > 0);
    
    if (entries.length === 0) {
      checkoutItemsContainer.innerHTML = '<p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">Your cart is empty.</p>';
    } else {
      checkoutItemsContainer.innerHTML = entries.map(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return '';
        const lineTotal = product.price * qty;
       return `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px dashed var(--border-color);">
            <div style="display: flex; align-items: center; gap: 0.5rem; min-width: 0; flex: 1; cursor: pointer;" data-action="open-lightbox" data-product-id="${id}" title="Click to view item details">
              <img src="${product.image}" alt="${product.title}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">
              <div style="min-width: 0; flex: 1;">
                <p style="font-weight: 600; font-size: 0.8rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--accent-text);" title="${product.title}">${product.title}</p>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Qty: ${qty} &times; ${money(product.price)}</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;">
              <strong style="font-size: 0.85rem;">${money(lineTotal)}</strong>
              <button type="button" class="btn remove-btn" data-action="remove-item" data-product-id="${id}" style="background: none; border: none; color: var(--error-color); cursor: pointer; font-size: 1.25rem; line-height: 1; padding: 0.2rem;" aria-label="Remove item">&times;</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const elSubtotal = document.getElementById('summary-subtotal');
  const elShipping = document.getElementById('summary-shipping');
  const elVat = document.getElementById('summary-vat');
  const elTotal = document.getElementById('summary-total');

  if (elSubtotal) elSubtotal.textContent = `£${summary.subtotal.toFixed(2)}`;
  if (elVat) elVat.textContent = `£${summary.vatAmount.toFixed(2)}`;
  
  if (elShipping) {
    elShipping.textContent = summary.shippingCost === 0 
      ? 'FREE' 
      : `£${summary.shippingCost.toFixed(2)}`;
  }

  if (elTotal) elTotal.textContent = `£${summary.grandTotal.toFixed(2)}`;

}

// Global event listener to instantly recalculate totals when shipping method changes (with closing brackets!)
document.addEventListener('change', (e) => {
  if (e.target.id === 'shipping-select') {
    updateCartSummaryUI();
  }
});

/* ==========================================================================
   3. RENDER ENGINES (Catalog, Cart View, & Popover)
   ========================================================================== */

function renderProductGrid(productList) {
  const gridContainer = document.getElementById('product-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  if (!productList || productList.length === 0) {
    gridContainer.innerHTML = '<p class="no-results">No products found matching your filter criteria.</p>';
    return;
  }

  productList.forEach(product => {
    const productCard = document.createElement('article');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);
    productCard.style.cursor = 'pointer';

    productCard.innerHTML = `
      <div class="product-image-wrapper">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.alt}" loading="lazy" class="product-image">
      </div>
      
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        
        <div class="product-footer">
          <span class="product-price">${money(product.price)}</span>
          <div class="card-actions">
            <button type="button" class="btn btn-primary add-to-cart-btn" data-action="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    gridContainer.appendChild(productCard);
  });
}

function renderCartView() {
  const container = document.getElementById('cart-items-container');
  const summaryEl = document.getElementById('cart-summary');
  if (!container || !summaryEl) return;

  const entries = Object.entries(cartState).filter(([, qty]) => qty > 0);

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. <a href="shop.html">Return to Shop</a></p>';
    summaryEl.innerHTML = '';
    return;
  }

  // Render individual cart item cards
  container.innerHTML = entries.map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return '';
    const itemTotal = product.price * qty;

    return `
      <article class="cart-item-card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-color); gap: 1rem;">
        <img src="${product.image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-size: 1rem;">${product.title}</h3>
          <p style="margin: 0.25rem 0 0; color: var(--text-muted); font-size: 0.875rem;">${money(product.price)} each</p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button type="button" class="btn qty-btn" data-action="decrease-qty" data-product-id="${id}" aria-label="Decrease quantity">-</button>
          <span style="font-weight: 600;">${qty}</span>
          <button type="button" class="btn qty-btn" data-action="increase-qty" data-product-id="${id}" aria-label="Increase quantity">+</button>
        </div>
        <div style="font-weight: 700; min-width: 70px; text-align: right;">
          ${money(itemTotal)}
        </div>
        <button type="button" class="btn remove-btn" data-action="remove-item" data-product-id="${id}" style="background: none; border: none; color: var(--error-color); cursor: pointer; font-size: 1.25rem;" aria-label="Remove item">&times;</button>
      </article>
    `;
  }).join('');

  // Render Order Summary Card cleanly using CSS classes
  summaryEl.innerHTML = `
    <section class="cart-summary-card">
      <h2>Order Summary</h2>
      
      <div class="summary-row">
        <span>Subtotal (excl. tax)</span>
        <span id="summary-subtotal">£0.00</span>
      </div>

      <!-- Postcode Estimator Input -->
      <div class="summary-row">
        <label for="postcode-input">UK Postcode:</label>
        <div class="postcode-input-group">
          <input type="text" id="postcode-input" placeholder="e.g. OX16 1AA">
          <button type="button" id="estimate-postage-btn" class="btn btn-secondary btn-sm">Calculate</button>
        </div>
      </div>

      <!-- Postage Option Selection -->
      <div class="summary-row">
        <label for="shipping-select">Delivery Option:</label>
        <select id="shipping-select">
          <option value="standard">Standard UK Delivery (3-5 Days) - £3.95</option>
          <option value="express">Express UK Delivery (1-2 Days) - £6.95</option>
        </select>
      </div>

      <!-- Postage & Packaging Cost Line -->
      <div class="summary-row">
        <span>Postage & Packaging</span>
        <span id="summary-shipping">£3.95</span>
      </div>

      <!-- VAT Line -->
      <div class="summary-row">
        <span>VAT (20% UK Standard)</span>
        <span id="summary-vat">£0.00</span>
      </div>

      <hr class="summary-divider" />

      <div class="summary-row summary-total">
        <strong>Grand Total</strong>
        <strong id="summary-total">£0.00</strong>
      </div>

      <div class="summary-actions">
        <button type="button" class="btn btn-secondary" data-action="clear-cart">Clear Cart</button>
        <button type="button" class="btn btn-primary" data-action="checkout">Checkout</button>
      </div>
    </section>
  `;

  updateCartSummaryUI();
}

function renderCartPopover() {
  const container = document.getElementById('popover-items');
  const subtotalEl = document.getElementById('popover-subtotal-price');
  if (!container || !subtotalEl) return;

  subtotalEl.textContent = money(getGrandTotal());
  const entries = Object.entries(cartState).filter(([, qty]) => qty > 0);

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-msg" style="margin:0; font-size:0.85rem; color:var(--text-muted);">Your cart is empty.</p>';
    return;
  }

  container.innerHTML = entries.map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return '';
    return `
      <div class="popover-item">
        <img src="${product.image}" alt="${product.title}" class="popover-item-img">
        <div class="popover-item-details">
          <p class="popover-item-title">${product.title}</p>
          <p class="popover-item-price">${qty} &times; ${money(product.price)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function updateCartBadges() {
  const totalCount = getTotalCount();
  const badges = document.querySelectorAll('#cart-count, .cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalCount;
  });

  const cartLink = document.querySelector('.cart-link');
  if (cartLink) {
    cartLink.setAttribute('aria-label', `Shopping Cart, ${totalCount} items`);
  }
}

function openProductModal(productId) {
  const lightbox = document.getElementById('product-lightbox');
  if (!lightbox) return;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) {
    lightboxImg.src = product.image;
    lightboxImg.alt = product.alt;
  }

  const badgeEl = document.getElementById('lightbox-badge');
  if (badgeEl) {
    if (product.badge) {
      badgeEl.textContent = product.badge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  const titleEl = document.getElementById('lightbox-title');
  if (titleEl) titleEl.textContent = product.title;

  const priceEl = document.getElementById('lightbox-price');
  if (priceEl) priceEl.textContent = money(product.price);

  const descEl = document.getElementById('lightbox-description');
  if (descEl) descEl.textContent = product.description;

  const addBtn = document.getElementById('lightbox-add-btn');
  if (addBtn) {
    addBtn.setAttribute('data-product-id', product.id);
  }

  lightbox.showModal();
}

/* ==========================================================================
   4. EVENT LISTENERS & DELEGATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartUI();

  // Cross-Tab Storage Sync
  window.addEventListener('storage', (e) => {
    if (e.key === 'paperbag_cart') {
      loadCart();
      updateCartUI();
    }
  });

  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Lightbox Close Handlers
  const lightbox = document.getElementById('product-lightbox');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  if (lightbox) {
    lightboxCloseBtn?.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => {
      const rect = lightbox.getBoundingClientRect();
      const isInside = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInside) lightbox.close();
    });
  }

  // Cart Popover Hover & Focus Controls
  const popover = document.getElementById('cart-popover');
  const popoverWrapper = document.querySelector('.cart-popover-wrapper');

  if (popover && popoverWrapper) {
    popoverWrapper.addEventListener('mouseenter', () => {
      renderCartPopover();
      popover.classList.add('is-active');
      popover.setAttribute('aria-hidden', 'false');
    });

    popoverWrapper.addEventListener('mouseleave', () => {
      popover.classList.remove('is-active');
      popover.setAttribute('aria-hidden', 'true');
    });
  }

  // Universal Dynamic Event Delegation
  document.addEventListener('click', (e) => {
    // 1. Add to Cart Handler
    const addBtn = e.target.closest('[data-action="add-to-cart"], .add-to-cart-btn');
    if (addBtn) {
      e.stopPropagation();
      const productId = addBtn.getAttribute('data-product-id') || 
                        addBtn.getAttribute('data-id') || 
                        addBtn.closest('.product-card')?.getAttribute('data-product-id');

      if (productId && addToCart(productId, 1)) {
        const originalText = addBtn.textContent;
        addBtn.textContent = 'Added!';
        addBtn.disabled = true;

        if (popover) {
          popover.classList.add('is-active');
          setTimeout(() => popover.classList.remove('is-active'), 2500);
        }

        setTimeout(() => {
          addBtn.textContent = originalText;
          addBtn.disabled = false;
        }, 1800);
      }
      return;
    }

    // 2. Open Lightbox via Product Card Click
    const card = e.target.closest('.product-card');
    if (card) {
      const productId = card.getAttribute('data-product-id') || card.getAttribute('data-id');
      if (productId) {
        openProductModal(productId);
      }
      return;
    }

    // 3. Cart Page & Popover Action Controls
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const action = actionBtn.getAttribute('data-action');
      const productId = actionBtn.getAttribute('data-product-id');

      switch (action) {
        case 'increase-qty':
          updateQuantity(productId, 1);
          break;
        case 'decrease-qty':
          updateQuantity(productId, -1);
          break;
        case 'remove-item':
          removeFromCart(productId);
          break;
        case 'clear-cart':
          clearCart();
          break;
        case 'checkout':
          window.location.href = 'checkout.html';
          break;
        case 'open-lightbox':
          if (productId) {
            openProductModal(productId);
          }
          break;
      }
    }
  });

 // Initial Page Mount Execution
  if (document.getElementById('product-grid')) {
    renderProductGrid(PRODUCTS);
  }
  if (document.getElementById('cart-items-container')) {
    renderCartView();
  }

// Check if returning from a successful Stripe payment redirect
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    const checkoutGrid = document.querySelector('.checkout-grid');
    const successContainer = document.getElementById('checkout-success-container');
    
    if (checkoutGrid) checkoutGrid.style.display = 'none';
    if (successContainer) successContainer.style.display = 'block';
    
    clearCart();
    return;
  }

  // Checkout Button Click Guardrail & Order Completion Handler
  const checkoutBtn = document.getElementById('stripe-checkout-btn');
  const errorMsgEl = document.getElementById('checkout-error-msg');
  // ... rest of your code ...


  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async (e) => { 
      e.preventDefault();

      // 1. Guardrail: Block checkout if basket is empty
      if (getTotalCount() === 0) {
        if (errorMsgEl) {
          errorMsgEl.textContent = 'Your basket is empty. Please add items to your cart before proceeding to checkout.';
          errorMsgEl.style.display = 'block';
        }
        return;
      }

      // 2. Guardrail: Check HTML5 form validity for required inputs
      const requiredInputs = ['shipping-name', 'shipping-email', 'shipping-address', 'shipping-city', 'shipping-postcode'];
      let allValid = true;

      for (const inputId of requiredInputs) {
        const inputEl = document.getElementById(inputId);
        if (inputEl && !inputEl.checkValidity()) {
          allValid = false;
          inputEl.reportValidity();
          break;
        }
      }

      if (!allValid) {
        if (errorMsgEl) {
          errorMsgEl.textContent = 'Please fill out all required shipping details above before proceeding with payment.';
          errorMsgEl.style.display = 'block';
        }
        return;
      }

      // Clear error message if validation passes
      if (errorMsgEl) {
        errorMsgEl.style.display = 'none';
      }

      // Call the Cloudflare serverless function to generate a Stripe PaymentIntent
      const shippingSelectEl = document.getElementById('shipping-select');
      const shippingMethod = shippingSelectEl ? shippingSelectEl.value : 'standard';
      const summary = getCartOrderSummary(shippingMethod);

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: summary.grandTotal })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to initialize payment intent.');
        }

        console.log('PaymentIntent created successfully! Client Secret:', data.clientSecret);

      } catch (err) {
        console.error('Payment error:', err);
        if (errorMsgEl) {
          errorMsgEl.textContent = 'Payment Error: ' + err.message;
          errorMsgEl.style.display = 'block';
        }
        return; // Stops execution if payment setup fails
      }

      // 3. Extract Order Data & Generate Reference
      const orderId = 'PBH-' + Math.floor(100000 + Math.random() * 900000);
      
      const nameEl = document.getElementById('shipping-name');
      const name = nameEl ? nameEl.value : 'Valued Customer';
      
      const addressEl = document.getElementById('shipping-address');
      const address = addressEl ? addressEl.value : '';
      
      const cityEl = document.getElementById('shipping-city');
      const city = cityEl ? cityEl.value : '';
      
      const postcodeEl = document.getElementById('shipping-postcode');
      const postcode = postcodeEl ? postcodeEl.value : '';

      // 4. Populate On-Screen Receipt (reusing the 'summary' object calculated above)
      const receiptIdEl = document.getElementById('receipt-order-id');
      const receiptNameEl = document.getElementById('receipt-customer-name');
      const receiptAddrEl = document.getElementById('receipt-customer-address');
      const receiptTotalEl = document.getElementById('receipt-grand-total');

      if (receiptIdEl) receiptIdEl.textContent = orderId;
      if (receiptNameEl) receiptNameEl.textContent = name;
      if (receiptAddrEl) receiptAddrEl.textContent = `${address}, ${city} (${postcode})`;
      if (receiptTotalEl) receiptTotalEl.textContent = money(summary.grandTotal);



      // 6. Reset Cart State
      clearCart();
    });
  }

}); // Closes DOMContentLoaded safely

// Live UK Postcode Validation using postcodes.io API
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'estimate-postage-btn') {
    const input = document.getElementById('postcode-input');
    if (!input) return;

    const postcode = input.value.trim().toUpperCase();

    if (!postcode) {
      alert('Please enter a UK postcode to calculate postage.');
      return;
    }

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}/validate`);
      const data = await response.json();

      if (data.result === true) {
        alert(`Success! Valid UK postcode verified. Standard shipping rates applied.`);
        updateCartSummaryUI();
      } else {
        alert('That postcode could not be verified. Please check the format (e.g., OX16 1AA).');
      }
    } catch (error) {
      console.error('Postcode verification failed:', error);
      alert('Network error verifying postcode. Please try again.');
    }
  }
});