/**
 * Paperbag Hobbies - Main JavaScript
 * Handles mobile navigation, lightbox modal interactions, focus management,
 * dynamic product catalog rendering, and persistent cart state.
 */

/* ==========================================================================
   1. MOCK PRODUCT DATASET
   ========================================================================== */

const products = [
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
   2. DYNAMIC PRODUCT CATALOG & RENDERING ENGINE
   ========================================================================== */

function renderProducts(productList) {
  const gridContainer = document.getElementById('product-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  if (productList.length === 0) {
    gridContainer.innerHTML = '<p class="no-results">No products found matching your filter criteria.</p>';
    return;
  }

  productList.forEach(product => {
    const productCard = document.createElement('article');
    productCard.className = 'product-card';
    productCard.setAttribute('data-id', product.id);
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
          <span class="product-price">£${product.price.toFixed(2)}</span>
          <div class="card-actions">
            <button type="button" class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;

    gridContainer.appendChild(productCard);
  });
}

/* ==========================================================================
   3. PERSISTENT SHOPPING CART STATE (LOCALSTORAGE)
   ========================================================================== */

let cart = JSON.parse(localStorage.getItem('paperbag_cart')) || [];

function saveCart() {
  localStorage.setItem('paperbag_cart', JSON.stringify(cart));
  updateCartBadge();
  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
}

function updateCartBadge() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const badgeElements = document.querySelectorAll('#cart-count, .cart-badge');
  badgeElements.forEach(badge => {
    badge.textContent = totalItems;
  });

  const cartLink = document.querySelector('.cart-link');
  if (cartLink) {
    cartLink.setAttribute('aria-label', `Shopping Cart, ${totalItems} items`);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
}

/* ==========================================================================
   4. CART PAGE RENDERING ENGINE & CONTROLS
   ========================================================================== */

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const summaryEl = document.getElementById('cart-summary');
  if (!container || !summaryEl) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart-msg">Your cart is currently empty. <a href="shop.html">Return to Shop</a></p>';
    summaryEl.innerHTML = '';
    return;
  }

  let grandTotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    return `
      <article class="cart-item-card" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-color); gap: 1rem;">
        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
        <div style="flex-grow: 1;">
          <h3 style="margin: 0; font-size: 1rem;">${item.title}</h3>
          <p style="margin: 0.25rem 0 0; color: var(--text-muted); font-size: 0.875rem;">£${item.price.toFixed(2)} each</p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button type="button" class="btn qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">-</button>
          <span>${item.quantity}</span>
          <button type="button" class="btn qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <div style="font-weight: 700; min-width: 70px; text-align: right;">
          £${itemTotal.toFixed(2)}
        </div>
        <button type="button" class="btn remove-btn" data-action="remove" data-id="${item.id}" style="background: none; border: none; color: var(--error-color); cursor: pointer; font-size: 1.25rem;" aria-label="Remove item">&times;</button>
      </article>
    `;
  }).join('');

  summaryEl.innerHTML = `
    <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Total: £${grandTotal.toFixed(2)}</h2>
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button type="button" class="btn btn-secondary clear-cart-btn">Clear Cart</button>
      <button type="button" class="btn btn-primary checkout-btn">Checkout</button>
    </div>
  `;
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

/* ==========================================================================
   5. EVENT LISTENERS & DOM INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile Navigation Toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* Product Lightbox Modal Setup */
  const lightbox = document.getElementById('product-lightbox');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  let lastFocusedElement = null;

  if (lightbox) {
    lightboxCloseBtn?.addEventListener('click', () => lightbox.close());

    lightbox.addEventListener('close', () => {
      if (lastFocusedElement) lastFocusedElement.focus();
    });

    lightbox.addEventListener('click', (e) => {
      const rect = lightbox.getBoundingClientRect();
      const isInsideDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );

      if (!isInsideDialog) lightbox.close();
    });
  }

  /* Global Dynamic Event Delegation */
  document.addEventListener('click', (e) => {
    // 1. Add To Cart Button Handler
    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn) {
      e.stopPropagation(); // Prevents card click from triggering lightbox
      const productId = addToCartBtn.getAttribute('data-id');
      addToCart(productId);

      const originalText = addToCartBtn.textContent;
      addToCartBtn.textContent = 'Added!';
      addToCartBtn.disabled = true;

      setTimeout(() => {
        addToCartBtn.textContent = originalText;
        addToCartBtn.disabled = false;
      }, 800);
      return;
    }

  // 2. Whole Product Card Click Handler (Triggers Lightbox Modal)
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      const currentLightbox = document.getElementById('product-lightbox');
      if (!currentLightbox) return;

      const productId = productCard.getAttribute('data-id');
      const product = products.find(p => p.id === productId);
      if (product) {
        lastFocusedElement = document.activeElement;

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
        if (priceEl) priceEl.textContent = `£${product.price.toFixed(2)}`;

        const descEl = document.getElementById('lightbox-description');
        if (descEl) descEl.textContent = product.description;

        const addBtn = document.getElementById('lightbox-add-btn');
        if (addBtn) addBtn.setAttribute('data-id', product.id);

        currentLightbox.showModal();
      }
      return;
    }
    
    // 3. Cart Page Controls Handler
    const target = e.target;
    const action = target.getAttribute('data-action');
    const id = target.getAttribute('data-id');

    if (action === 'increase') {
      changeQuantity(id, 1);
    } else if (action === 'decrease') {
      changeQuantity(id, -1);
    } else if (action === 'remove') {
      removeFromCart(id);
    } else if (target.classList.contains('clear-cart-btn')) {
      clearCart();
    } else if (target.classList.contains('checkout-btn')) {
      alert('Checkout integration coming soon!');
    }
  });

  /* Initial Page Mount Execution */
  if (document.getElementById('product-grid')) {
    renderProducts(products);
  }

  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }

  updateCartBadge();
});