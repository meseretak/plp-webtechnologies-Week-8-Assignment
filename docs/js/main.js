// main.js - slider, nav toggle, contact form
document.addEventListener('DOMContentLoaded', () => {

  // ===== Update footer year dynamically =====
  const yearEls = document.querySelectorAll('#year, #year-about, #year-services, #year-contact');
  yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

  // ===== NAV toggle for small screens =====
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.site-nav').classList.toggle('open');
    });
  }

  // ===== SLIDER FUNCTIONALITY =====
  const slider = document.getElementById('mainSlider');
  if (slider) {
    const slidesWrapper = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.dots');

    let index = 0;
    const total = slides.length;
    let autoTimer = null;
    let isDragging = false;
    let startX = 0;

    // Create slider dots
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll('button');

    // ===== Functions =====
    const updateSlider = () => {
      slidesWrapper.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const nextSlide = () => { index = (index + 1) % total; updateSlider(); };
    const prevSlide = () => { index = (index - 1 + total) % total; updateSlider(); };
    const goToSlide = (i) => { index = i % total; updateSlider(); };

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // ===== Autoplay =====
    const startAuto = () => { stopAuto(); autoTimer = setInterval(nextSlide, 4500); };
    const stopAuto = () => { if (autoTimer) clearInterval(autoTimer); };

    // ===== Drag / Swipe support =====
    const wrapper = slider.querySelector('.slides-wrapper');

    wrapper.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      stopAuto();
      wrapper.setPointerCapture(e.pointerId);
    });

    wrapper.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      slidesWrapper.style.transform = `translateX(${-index*100 + (dx / wrapper.clientWidth) * 100}%)`;
    });

    wrapper.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) dx < 0 ? nextSlide() : prevSlide();
      else updateSlider();
      startAuto();
    });

    wrapper.addEventListener('pointercancel', () => { isDragging = false; updateSlider(); startAuto(); });

    // Init
    updateSlider();
    startAuto();

    // Responsive: recalc width on resize
    window.addEventListener('resize', updateSlider);
  }

  // ===== CONTACT FORM VALIDATION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const status = document.getElementById('formStatus');

      // Validation
      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = 'red';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = 'red';
        return;
      }

      // Simulate submit
      status.textContent = 'Sending...';
      status.style.color = '#0f766e';
      setTimeout(() => {
        status.textContent = 'Thank you! Your message has been received. I will respond shortly.';
        contactForm.reset();
      }, 1000);
    });
  }

});
