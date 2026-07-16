/**
 * CYBER RAGE - Main Application Script
 * Handles all interactions, animations, and dynamic content
 */

'use strict';

// =============================================
// DOM Ready
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCursorGlow();
  initNavbar();
  initMobileMenu();
  initTypewriter();
  initCounters();
  initScrollReveal();
  initRepoFilter();
  initNavLinks();
  initActiveNav();
});

// =============================================
// Loading Screen
// =============================================
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  const statuses = [
    'Initializing System...',
    'Loading Modules...',
    'Connecting to Grid...',
    'Syncing Data...',
    'Ready!'
  ];
  const sub = screen.querySelector('.loading-sub');
  let i = 0;

  const interval = setInterval(() => {
    i++;
    if (i < statuses.length) {
      sub.textContent = statuses[i];
    }
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2500);

  document.body.style.overflow = 'hidden';
}

// =============================================
// Cursor Glow Effect
// =============================================
function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

// =============================================
// Navbar
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  });
}

// =============================================
// Mobile Menu
// =============================================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

// =============================================
// Typewriter Effect
// =============================================
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Next-Gen Code Collaboration Platform',
    'Build the Future with Cyber Rage',
    'Where Code Meets Innovation',
    'Quantum-Secure Development',
    'The Ultimate Developer Experience'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      setTimeout(type, 2000);
      isPaused = false;
      return;
    }

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 3000);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isPaused = true;
        setTimeout(type, 1000);
        return;
      }
    }

    const speed = isDeleting ? 30 : 60;
    setTimeout(type, speed + Math.random() * 40);
  }

  setTimeout(type, 3000);
}

// =============================================
// Animated Counters
// =============================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = isFloat ? (eased * target).toFixed(1) + 'k' : current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isFloat ? target.toFixed(1) + 'k' : target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

// =============================================
// Scroll Reveal Animations
// =============================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay')) || 0;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// =============================================
// Repository Filter
// =============================================
function initRepoFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.repo-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeIn 0.4s ease forwards';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Add fadeIn animation style
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(fadeInStyle);

// =============================================
// Smooth Scroll for Nav Links
// =============================================
function initNavLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// =============================================
// Active Nav Link on Scroll
// =============================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// =============================================
// Toast Notifications
// =============================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Expose to global scope
window.showToast = showToast;
