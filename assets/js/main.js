/**
 * Paperbag Hobbies - Main JavaScript
 * Handles mobile navigation, lightbox modal interactions, and focus management.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      // Toggle navigation drawer state
      const isOpen = primaryNav.classList.toggle('is-open');

      // Update ARIA attribute for screen readers
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when pressing the Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ==========================================================================
     2. PRODUCT LIGHTBOX / QUICK VIEW MODAL
     ========================================================================== */
  const lightbox = document.getElementById('product-lightbox');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  let lastFocusedElement = null;

  if (lightbox) {
    // Attach click listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent lightbox opening if the user clicks directly on the "Add to Cart" button
        if (e.target.closest('.btn-primary')) return;

        // Save trigger focus element for accessibility return on close
        lastFocusedElement = document.activeElement;

        // Extract product card details
        const img = card.querySelector('.product-image');
        const title = card.querySelector('.product-title')?.textContent || '';
        const price = card.querySelector('.product-price')?.textContent || '';
        const desc = card.querySelector('.product-description')?.textContent || '';
        const badge = card.querySelector('.product-badge');

        // Populate lightbox modal content
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg && img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || title;
        }

        const titleEl = document.getElementById('lightbox-title');
        if (titleEl) titleEl.textContent = title;

        const priceEl = document.getElementById('lightbox-price');
        if (priceEl) priceEl.textContent = price;

        const descEl = document.getElementById('lightbox-description');
        if (descEl) descEl.textContent = desc;

        const badgeEl = document.getElementById('lightbox-badge');
        if (badgeEl) {
          if (badge && badge.textContent.trim() !== '') {
            badgeEl.textContent = badge.textContent;
            badgeEl.style.display = 'inline-block';
          } else {
            badgeEl.style.display = 'none';
          }
        }

        // Open native modal (handles background focus lock & ESC key natively)
        lightbox.showModal();
      });
    });

    // Close modal via close button
    lightboxCloseBtn?.addEventListener('click', () => {
      lightbox.close();
    });

    // Return focus to the original triggering element when closed
    lightbox.addEventListener('close', () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    });

    // Close modal when clicking on the backdrop area
    lightbox.addEventListener('click', (e) => {
      const rect = lightbox.getBoundingClientRect();
      const isInsideDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );

      if (!isInsideDialog) {
        lightbox.close();
      }
    });
  }

});