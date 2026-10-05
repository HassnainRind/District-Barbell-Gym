/* ============================================================
   IRON FORGE GYM — Contact Page JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Form Submission ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Simulate submission
      btn.innerHTML = 'Sending...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.opacity = '1';
        btn.style.background = '#CEF952';

        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ---------- Plan Card Hover Effects ----------
  const planCards = document.querySelectorAll('.plan-card');
  planCards.forEach(card => {
    // We use inner element or simple CSS transform to avoid conflicts with GSAP ScrollTrigger
    // But since CSS applies transition to transform on hover, we don't need GSAP hover here.
    // The glitch happens because GSAP hover conflicts with CSS hover transition.
    // We remove the GSAP hover completely to let CSS handle it cleanly.
  });

  // ---------- Membership Plan Elements Removed from GSAP to fix flicker ----------
  // We rely fully on CSS hover states for the plan cards now.

  // ---------- Contact Info Stagger ----------
  gsap.from('.contact-info__item', {
    scrollTrigger: {
      trigger: '.contact-split',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    x: -30,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power3.out',
    clearProps: 'all'
  });

  // ---------- Smooth Scroll to Membership ----------
  if (window.location.hash === '#membership') {
    setTimeout(() => {
      const membership = document.getElementById('membership');
      if (membership) {
        // Use Lenis scroll if available, else native
        if (typeof lenis !== 'undefined') {
          lenis.scrollTo(membership);
        } else {
          membership.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 500);
  }

  // ---------- Smooth Scroll from Plan Buttons to Form ----------
  const planBtns = document.querySelectorAll('.plan-select-btn');
  planBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const planName = btn.getAttribute('data-plan');
      
      // Auto-select the goal dropdown
      const goalSelect = document.getElementById('goal');
      if (goalSelect) {
        if (planName === 'Basic' || planName === 'Pro') {
          goalSelect.value = 'general';
        } else if (planName === 'Elite') {
          goalSelect.value = 'competition'; // Or just leave default
        }
      }

      if (targetSection) {
        if (typeof lenis !== 'undefined') {
          lenis.scrollTo(targetSection, { offset: -100 });
        } else {
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }
    });
  });
});
