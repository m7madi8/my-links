/**
 * Personal Bio Link Page — Micro-interactions & utilities
 * - Loader on page load
 * - Theme toggle (dark/light)
 * - Toast on copy (email/number)
 * - Scroll reveal for link cards
 */

(function () {
  'use strict';

  // --- Loader ---
  const loaderEl = document.getElementById('loader');
  function hideLoader() {
    if (!loaderEl) return;
    loaderEl.setAttribute('data-hidden', 'true');
    document.body.classList.add('page-loaded');
    setTimeout(function () {
      loaderEl.remove();
    }, 500);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 4000);
  }

  // --- Theme Toggle ---
  const root = document.documentElement;
  const THEME_KEY = 'bio-link-theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}
  }

  function initTheme() {
    const stored = getStoredTheme();
    setTheme(stored);
  }

  initTheme();

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // --- Toast ---
  const toastEl = document.getElementById('toast');
  const toastText = toastEl && toastEl.querySelector('.toast-text');

  function showToast(message, durationMs = 2500) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.removeAttribute('hidden');
    toastEl.setAttribute('data-visible', 'true');
    clearTimeout(showToast._tid);
    showToast._tid = setTimeout(function () {
      toastEl.setAttribute('data-visible', 'false');
      setTimeout(function () {
        toastEl.setAttribute('hidden', '');
      }, 300);
    }, durationMs);
  }

  // --- Copy to clipboard (email / number) ---
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    } finally {
      document.body.removeChild(ta);
    }
  }

  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (!text) return;
      copyToClipboard(text)
        .then(function () {
          showToast('Copied to clipboard!');
        })
        .catch(function () {
          showToast('Could not copy');
        });
    });
  });

  // Social email button (same copy behavior)
  const emailSocial = document.querySelector('.social-icon-email');
  if (emailSocial && emailSocial.hasAttribute('data-copy')) {
    emailSocial.addEventListener('click', function (e) {
      e.preventDefault();
      const text = emailSocial.getAttribute('data-copy');
      copyToClipboard(text)
        .then(function () {
          showToast('Email copied to clipboard!');
        })
        .catch(function () {
          showToast('Could not copy');
        });
    });
  }

  // --- Scroll reveal for link cards ---
  const linkCards = document.querySelectorAll('.link-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    linkCards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    linkCards.forEach(function (card) {
      card.classList.add('reveal');
    });
  }
})();
