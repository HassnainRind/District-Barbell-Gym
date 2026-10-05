/* ============================================================
   IRON FORGE GYM — Gallery Page JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
            onStart: () => { item.style.display = 'block'; }
          });
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power3.out',
            onComplete: () => { item.style.display = 'none'; }
          });
        }
      });
    });
  });

  // Stagger reveal on scroll for gallery items
  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-masonry',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 40,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power3.out',
  });
});
