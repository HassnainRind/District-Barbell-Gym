/* District Barbell V2 — Programs Page JS */
document.addEventListener('DOMContentLoaded', () => {
  // Animate program detail sections with parallax images
  gsap.utils.toArray('.program-detail').forEach((section, i) => {
    const image = section.querySelector('.program-detail__image');
    const content = section.querySelector('.program-detail__content');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
    });
    if (i % 2 === 0) {
      tl.from(image, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' })
        .from(content, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    } else {
      tl.from(image, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' })
        .from(content, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }
  });

  // Parallax on program images
  gsap.utils.toArray('.program-detail__image img').forEach(img => {
    gsap.to(img, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // CTA parallax
  const ctaBg = document.querySelector('.cta-section__bg img');
  if (ctaBg) {
    gsap.to(ctaBg, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // Table row hover
  document.querySelectorAll('.comparison-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', () => { row.style.background = 'rgba(206, 249, 82, 0.05)'; });
    row.addEventListener('mouseleave', () => { row.style.background = ''; });
  });
});
