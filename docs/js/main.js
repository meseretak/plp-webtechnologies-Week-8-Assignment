/* main.js - slider, nav toggle, form validation */
document.addEventListener('DOMContentLoaded', function () {

  // populate years in footers
  const yearEls = document.querySelectorAll('#year, #year-about, #year-services, #year-contact');
  yearEls.forEach(e => { if (e) e.textContent = new Date().getFullYear(); });

  /* NAV toggle for small screens */
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.site-nav').classList.toggle('open');
    });
  }

  /* SLIDER */
  (function sliderInit() {
    const slider = document.getElementById('mainSlider');
    if (!slider) return;
    const slidesWrapper = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.dots');

    let index = 0;
    const total = slides.length;
    let width = slider.querySelector('.slides-wrapper').clientWidth;
    let autoTimer = null;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    // create dots
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    }
    const dots = dotsContainer.querySelectorAll('button');

    function update() {
      slidesWrapper.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function next() { index = (index + 1) % total; update(); }
    function prev() { index = (index - 1 + total) % total; update(); }
    function goTo(i) { index = i % total; update(); }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // auto play
    function startAuto() { stopAuto(); autoTimer = setInterval(next, 4500); }
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }

    // swipe
    const wrapper = slider.querySelector('.slides-wrapper');
    wrapper.addEventListener('pointerdown', (e) => {
      isDragging = true; startX = e.clientX; stopAuto();
      wrapper.setPointerCapture(e.pointerId);
    });
    wrapper.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      slidesWrapper.style.transform = `translateX(${ -index*100 + (dx / wrapper.clientWidth)*100 }%)`;
    });
    wrapper.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) {
        if (dx < 0) next(); else prev();
      } else update();
      startAuto();
    });
    wrapper.addEventListener('pointercancel', () => { isDragging = false; update(); startAuto(); });

    // init
    update();
    startAuto();

    // responsive: recalc width on resize
    window.addEventListener('resize', () => { width = slider.querySelector('.slides-wrapper').clientWidth; update(); });
  })();

  /* Contact form basic validation + fake submit */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const status = document.getElementById('formStatus');

      // simple checks
      if (!name || !email || !message) {
        status.textContent = 'Please fill name, email and message.';
        return;
      }
      if (!/^.+@.+\..+$/.test(email)) {
        status.textContent = 'Please enter a valid email.';
        return;
      }

      // mimic submit (replace with real API or mailto)
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Thanks! Your message has been received. I will respond shortly.';
        contactForm.reset();
      }, 900);
    });
  }

});
