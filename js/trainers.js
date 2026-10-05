/* District Barbell V2 — Trainers Page JS */
document.addEventListener('DOMContentLoaded', () => {
  gsap.utils.toArray('.trainer-card-full').forEach((card, i) => {
    const image = card.querySelector('.trainer-card-full__image');
    const info = card.querySelector('.trainer-card-full__info');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
    });
    if (i % 2 === 0) {
      tl.from(image, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' })
        .from(info, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    } else {
      tl.from(image, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' })
        .from(info, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }
    const stats = card.querySelectorAll('.trainer-card-full__stat');
    tl.from(stats, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
  });

  // Parallax on trainer images
  gsap.utils.toArray('.trainer-card-full__image img').forEach(img => {
    gsap.to(img, {
      yPercent: -8,
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
});
