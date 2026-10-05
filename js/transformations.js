/* District Barbell V2 — Transformations Page JS */
document.addEventListener('DOMContentLoaded', () => {
  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.tf-stats__item h3');
  statNumbers.forEach(el => {
    const text = el.textContent;
    const match = text.match(/[\d,.]+/);
    if (!match) return;
    const target = parseFloat(match[0].replace(/,/g, ''));
    const suffix = text.replace(match[0], '');
    const hasComma = match[0].includes(',');
    const isDecimal = match[0].includes('.') && !match[0].includes(',');
    let counter = { val: 0 };
    gsap.to(counter, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      val: target, duration: 2, ease: 'power2.out',
      onUpdate: function() {
        let v = counter.val;
        let display;
        if (isDecimal) { display = v.toFixed(1); }
        else { display = Math.round(v); if (hasComma) display = display.toLocaleString(); }
        el.textContent = display + suffix;
      }
    });
  });

  // Parallax on story images
  document.querySelectorAll('.tf-story__img img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: { trigger: img.closest('.tf-story'), start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      y: -30, scale: 1.05, ease: 'none',
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
