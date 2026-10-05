/* ============================================================
   IRON FORGE GYM — Trainers Page JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Animate trainer cards with alternating slide direction
  gsap.utils.toArray('.trainer-card').forEach((card, i) => {
    const image = card.querySelector('.trainer-card__image');
    const info = card.querySelector('.trainer-card__info');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    if (i % 2 === 0) {
      tl.from(image, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' })
        .from(info, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    } else {
      tl.from(image, { opacity: 0, x: 60, duration: 0.8, ease: 'power3.out' })
        .from(info, { opacity: 0, x: -60, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }

    // Stagger stats
    const stats = card.querySelectorAll('.trainer-card__stat');
    tl.from(stats, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3');
  });

  // Parallax on trainer images
  gsap.utils.toArray('.trainer-card__image img').forEach(img => {
    gsap.to(img, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
});
