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
  } catch (e) { 
    cartState = {}; 
  }
}

function saveCart() {
  try { 
    localStorage.setItem("paperbag_cart", JSON.stringify(cartState)); 
  } catch (e) {}
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
}

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

  const entries = Object.entries(cartState).filter(([_, qty]) => qty > 0);

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. <a href="shop.html">Return to Shop</a></p>';
    summaryEl.innerHTML = '';
    return;
  }

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

  summaryEl.innerHTML = `
    <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Total: ${money(getGrandTotal())}</h2>
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button type="button" class="btn btn-secondary" data-action="clear-cart">Clear Cart</button>
      <button type="button" class="btn btn-primary" data-action="checkout">Checkout</button>
    </div>
  `;
}

function renderCartPopover() {
  const container = document.getElementById('popover-items');
  const subtotalEl = document.getElementById('popover-subtotal-price');
  if (!container || !subtotalEl) return;

  subtotalEl.textContent = money(getGrandTotal());
  const entries = Object.entries(cartState).filter(([_, qty]) => qty > 0);

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
          alert('Checkout integration coming soon!');
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
});