

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initDarkMode();
  initMobileNav();
  initScrollReveal();
  initNavScroll();
  setActiveNavLink();
  initParticles();
  initRoadmapSteps();
});

/* ---------- Scroll Progress Indicator ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

/* ---------- Dark Mode Toggle ---------- */
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
  } else {
    toggle.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '☀️';
    }
  });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Navbar scroll shadow ---------- */
function initNavScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ---------- Active Nav Link ---------- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---------- Hero Particles ---------- */
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  const colors = ['#6c5ce7', '#a29bfe', '#00cec9', '#fd79a8', '#81ecec'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

/* ---------- Roadmap Step Toggle ---------- */
function initRoadmapSteps() {
  document.querySelectorAll('.roadmap-step').forEach(step => {
    step.addEventListener('click', () => {
      // Close all others
      document.querySelectorAll('.roadmap-step.expanded').forEach(other => {
        if (other !== step) other.classList.remove('expanded');
      });
      step.classList.toggle('expanded');
    });
  });
}
