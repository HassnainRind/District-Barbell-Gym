/* ============================================================
   IRON FORGE GYM — Transformations Page JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Counter Animation for Stats ----------
  const statNumbers = document.querySelectorAll('.tf-stats__item h3');

  statNumbers.forEach(el => {
    const text = el.textContent;
    // Extract numeric value
    const match = text.match(/[\d,.]+/);
    if (!match) return;

    const target = parseFloat(match[0].replace(/,/g, ''));
    const suffix = text.replace(match[0], '');
    const hasComma = match[0].includes(',');
    const isDecimal = match[0].includes('.') && !match[0].includes(',');

    let counter = { val: 0 };
    gsap.to(counter, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function() {
        let currentVal = counter.val;
        let displayVal;
        
        if (isDecimal) {
          displayVal = currentVal.toFixed(1);
        } else {
          displayVal = Math.round(currentVal);
          if (hasComma) {
            displayVal = displayVal.toLocaleString();
          }
        }
        
        el.textContent = displayVal + suffix;
      }
    });
  });

  // ---------- Parallax on story images ----------
  document.querySelectorAll('.tf-story__img img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.closest('.tf-story'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -30,
      scale: 1.05,
      ease: 'none',
    });
  });


});
