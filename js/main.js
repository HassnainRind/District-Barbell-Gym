/* ============================================================
   DISTRICT BARBELL V2 — Main JS (Shared across all pages)
   Lenis smooth scroll, navbar, GSAP reveals
   ============================================================ */

// ---------- Lenis Smooth Scroll ----------
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ---------- Loader ----------
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) {
    document.body.classList.remove('is-loading');
    return;
  }

  const words = loader.querySelectorAll('.loader__word');
  const progress = document.getElementById('loaderProgress');
  const counter = document.getElementById('loaderCounter');

  // Animate words in
  gsap.to(words, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.3,
  });

  // Animate progress bar and counter
  let count = { val: 0 };
  gsap.to(count, {
    val: 100,
    duration: 2.2,
    delay: 0.6,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(count.val);
      if (counter) counter.textContent = v;
      if (progress) progress.style.width = v + '%';
    },
    onComplete: () => {
      // Slide loader away
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.3,
        onComplete: () => {
          loader.style.display = 'none';
          document.body.classList.remove('is-loading');
          // Refresh ScrollTrigger after loader removal
          ScrollTrigger.refresh();
        }
      });
    }
  });
}

// ---------- Sticky Navbar ----------
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  if (window.scrollY > 50) navbar.classList.add('scrolled');
}

// ---------- Hamburger Menu ----------
const hamburger = document.querySelector('.navbar__hamburger');
const mobileNav = document.querySelector('.navbar__mobile');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---------- GSAP Reveal Animations ----------
function initReveals() {
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.stagger-children').forEach(parent => {
    const children = parent.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  });
}

// ---------- Active Nav Link ----------
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .navbar__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ---------- Parallax for page hero backgrounds ----------
function initPageHeroParallax() {
  const pageHeroBg = document.querySelector('.page-hero__bg img');
  if (pageHeroBg) {
    gsap.to(pageHeroBg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.page-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}

// ---------- Theme Toggle ----------
function initThemeToggle() {
  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle';
  toggle.setAttribute('aria-label', 'Switch theme');
  toggle.innerHTML = `
    <svg class="icon-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" title="Switch to Red">
      <circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/>
    </svg>
    <svg class="icon-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" title="Switch to Lime">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  `;
  document.body.appendChild(toggle);

  // Load saved theme
  const saved = localStorage.getItem('db-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'red' ? '' : 'red';
    if (next) {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('db-theme', next);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('db-theme');
    }
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initReveals();
  setActiveNav();
  initPageHeroParallax();
  initThemeToggle();
});
