/* ============================================================
   IRON FORGE GYM — Main JS (Shared across all pages)
   ============================================================ */

// ---------- Lenis Smooth Scroll ----------
const lenis = new Lenis({
  duration: 1.2,
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
  // Initial check
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

  // Close on link click
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
  // Fade up reveals
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

  // Slide left reveals
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

  // Slide right reveals
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

  // Scale reveals
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

  // Stagger children
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

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  initReveals();
  setActiveNav();
});
