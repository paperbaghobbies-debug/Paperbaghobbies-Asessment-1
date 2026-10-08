/**
 * Paperbag Hobbies - Main JavaScript
 * Handles mobile navigation toggle and accessibility states.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (!navToggle || !primaryNav) return;

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
});