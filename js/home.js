/* ============================================================
   DISTRICT BARBELL V2 — Home Page JS
   Parallax, smooth reveals, testimonials, drag scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Hero Entrance ----------
  const heroTl = gsap.timeline({ delay: 2.8 });
  heroTl
    .from('.hero__label', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' })
    .from('.hero__title', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.2')
    .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .from('.hero__buttons .btn', { opacity: 0, y: 15, stagger: 0.1, duration: 0.4, ease: 'power3.out', clearProps: 'all' }, '-=0.2')
    .from('.hero__stats', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', clearProps: 'all' }, '-=0.2');

  // ---------- Hero Parallax ----------
  const heroBg = document.querySelector('#heroBg img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: -15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // ---------- Program Cards Parallax ----------
  gsap.utils.toArray('.program-card__image img').forEach(img => {
    gsap.to(img, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: img.closest('.program-card'), start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // ---------- Why Us Image Parallax ----------
  const whyImg = document.querySelector('.why-split__image img');
  if (whyImg) {
    gsap.to(whyImg, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '.why-split', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // ---------- Transformation Parallax ----------
  gsap.utils.toArray('.transformation__card img').forEach(img => {
    gsap.to(img, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // ---------- CTA Parallax ----------
  const ctaBg = document.querySelector('#ctaBg img');
  if (ctaBg) {
    gsap.to(ctaBg, {
      yPercent: -15, ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // ---------- Testimonials Carousel ----------
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoplay;

  function goToSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    currentSlide = i;
  }

  function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }

  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        clearInterval(autoplay);
        autoplay = setInterval(nextSlide, 5000);
      });
    });
    autoplay = setInterval(nextSlide, 5000);
  }

  // ---------- Trainers Drag Scroll ----------
  const track = document.querySelector('.trainers-section__track');
  if (track) {
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', (e) => { isDown = true; track.style.cursor = 'grabbing'; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return; e.preventDefault();
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 2;
    });

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const scrollAmt = 300;
    if (prevBtn) prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
    if (nextBtn) nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmt, behavior: 'smooth' }));
  }
});
