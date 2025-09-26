// main.js - site interactions
// Toggle mobile nav
function initNav(){
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const nav = document.getElementById('site-nav') || document.querySelector('.site-nav');
      if(!nav) return;
      nav.style.display = (nav.style.display==='block')? 'none' : 'block';
    });
  });
}

// Year placeholders
function setYears(){
  const els = Array.from(document.querySelectorAll('[id^="year"]'));
  els.forEach(el=>el.textContent = new Date().getFullYear());
}

// Testimonial slider
function initSlider(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  if(!slides.length) return;
  let idx = slides.findIndex(s=>s.classList.contains('active')) || 0;
  const show = (i)=>{
    slides.forEach(s=>s.classList.remove('active'));
    slides[(i+slides.length)%slides.length].classList.add('active');
  }
  document.getElementById('prev-slide')?.addEventListener('click',()=>{ idx = (idx-1+slides.length)%slides.length; show(idx); });
  document.getElementById('next-slide')?.addEventListener('click',()=>{ idx = (idx+1)%slides.length; show(idx); });
}

// Contact form handling
async function initContact(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const status = document.getElementById('form-status');
  const saveBtn = document.getElementById('save-local');

  saveBtn?.addEventListener('click',()=>{
    const data = Object.fromEntries(new FormData(form));
    localStorage.setItem('contact_draft', JSON.stringify(data));
    status.textContent = 'Saved locally in your browser.';
  });

  // restore draft
  const draft = localStorage.getItem('contact_draft');
  if(draft){
    try{const d=JSON.parse(draft);Object.keys(d).forEach(k=>{const el=form.elements[k]; if(el) el.value=d[k]}); status.textContent='Draft restored.'}catch(e){}
  }

  form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    status.textContent = '';
    // basic validation
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();
    if(name.length<3){ status.textContent='Name must be at least 3 characters.'; return }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ status.textContent='Enter a valid email.'; return }
    if(subject.length<3){ status.textContent='Subject must be at least 3 characters.'; return }
    if(message.length<10){ status.textContent='Message must be at least 10 characters.'; return }

    // Try to send to Firebase if configured
    if(window.firebase && window.firebase.firestore){
      try{
        const db = firebase.firestore();
        await db.collection('contacts').add({name,email,subject,message,createdAt: new Date()});
        status.textContent = 'Message sent — thanks! (stored in Firestore)';
        form.reset();
        localStorage.removeItem('contact_draft');
        return;
      }catch(err){
        console.warn('Firebase error',err);
        status.textContent = 'Could not send to server; saved locally instead.';
      }
    }

    // fallback: save to localStorage
    try{
      const store = JSON.parse(localStorage.getItem('contact_store')||'[]');
      store.push({name,email,subject,message,createdAt:new Date().toISOString()});
      localStorage.setItem('contact_store', JSON.stringify(store));
      status.textContent = 'Saved locally (demo mode).';
      form.reset();
      localStorage.removeItem('contact_draft');
    }catch(e){
      status.textContent = 'Unable to save message.';
    }
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded',()=>{ initNav(); setYears(); initSlider(); initContact(); });

// Expose to non-module environment
window.initSite = { initNav, setYears, initSlider, initContact };
