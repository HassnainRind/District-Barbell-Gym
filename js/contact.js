/* District Barbell V2 — Contact Page JS */
document.addEventListener('DOMContentLoaded', () => {

  // Form submission
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
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

  // Contact info stagger
  gsap.from('.contact-info__item', {
    scrollTrigger: { trigger: '.contact-split', start: 'top 80%', toggleActions: 'play none none none' },
    opacity: 0, x: -30, stagger: 0.12, duration: 0.6, ease: 'power3.out', clearProps: 'all'
  });

  // Smooth scroll to membership
  if (window.location.hash === '#membership') {
    setTimeout(() => {
      const membership = document.getElementById('membership');
      if (membership) {
        if (typeof lenis !== 'undefined') { lenis.scrollTo(membership); }
        else { membership.scrollIntoView({ behavior: 'smooth' }); }
      }
    }, 500);
  }

  // Plan button scroll to form
  const planBtns = document.querySelectorAll('.plan-select-btn');
  planBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const planName = btn.getAttribute('data-plan');
      const goalSelect = document.getElementById('goal');
      if (goalSelect) {
        if (planName === 'Basic' || planName === 'Pro') goalSelect.value = 'general';
        else if (planName === 'Elite') goalSelect.value = 'competition';
      }
      if (targetSection) {
        if (typeof lenis !== 'undefined') { lenis.scrollTo(targetSection, { offset: -100 }); }
        else {
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // CTA parallax
  const ctaBg = document.querySelector('.cta-section__bg img');
  if (ctaBg) {
    gsap.to(ctaBg, {
      yPercent: -20, ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
});
