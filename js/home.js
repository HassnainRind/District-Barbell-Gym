/* ============================================================
   IRON FORGE GYM — Home Page JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Hero Animation ----------
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .from('.hero__label', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: 'power3.out',
    })
    .from('.hero__title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.hero__subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .from('.hero__buttons .btn', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.5,
      ease: 'power3.out',
      clearProps: 'all'
    }, '-=0.3')
    .from('.hero__image', {
      opacity: 0,
      x: 80,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    }, '-=0.8')
    .from('.hero__stat', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out',
      clearProps: 'all'
    }, '-=0.5');

  // Hero background subtle zoom
  gsap.to('.hero__bg img', {
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ---------- Testimonials Carousel ----------
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoplayInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
      });
    });

    autoplayInterval = setInterval(nextSlide, 5000);
  }

  // ---------- Horizontal Scroll Drag Function ----------
  function initDragScroll(trackSelector, prevBtnSelector, nextBtnSelector) {
    const track = document.querySelector(trackSelector);
    if (!track) return;

    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    let isDown = false;
    let startX;
    let scrollLeft;
    let isMoved = false;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      isMoved = false;
      track.style.cursor = 'grabbing';
      track.style.scrollSnapType = 'none';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      track.style.cursor = 'grab';
      track.style.scrollSnapType = '';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
      track.style.scrollSnapType = '';
      
      if (isMoved) {
        setTimeout(() => isMoved = false, 10);
      }
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      
      if (Math.abs(walk) > 5) {
        isMoved = true;
        e.preventDefault();
        track.scrollLeft = scrollLeft - walk;
      }
    });

    track.addEventListener('click', (e) => {
      if (isMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Button Controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const firstItem = track.querySelector(':first-child');
        const scrollAmount = firstItem ? firstItem.offsetWidth + 24 : 300;
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const firstItem = track.querySelector(':first-child');
        const scrollAmount = firstItem ? firstItem.offsetWidth + 24 : 300;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    track.style.cursor = 'grab';
  }

  initDragScroll('.programs-scroll__track', '.programs-scroll__controls .prev-btn', '.programs-scroll__controls .next-btn');
  initDragScroll('.trainers-preview__track', '.trainers-preview__controls .prev-btn', '.trainers-preview__controls .next-btn');

  // ---------- Parallax on transformation images ----------
  gsap.utils.toArray('.transformation__card img').forEach(img => {
    gsap.to(img, {
      yPercent: -10,
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
