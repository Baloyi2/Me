// Small interactive helpers: theme toggle, copy email, menu
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const copyEmail = document.getElementById('copyEmail');
  const year = document.getElementById('year');

  // set year
  if(year) year.textContent = new Date().getFullYear();

  // theme: remember in localStorage
  function setTheme(dark){
    if(dark){
      document.documentElement.classList.add('dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','true');
      localStorage.setItem('theme','dark');
    } else {
      document.documentElement.classList.remove('dark');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','false');
      localStorage.setItem('theme','light');
    }
  }

  // init
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') setTheme(true);

  themeToggle.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('dark')));

  // mobile menu toggle
  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // close mobile menu on outside click or Escape
  document.addEventListener('click', (e)=>{
    if(!nav.contains(e.target) && menuToggle.getAttribute('aria-expanded') === 'true'){
      menuToggle.setAttribute('aria-expanded','false');
      nav.classList.remove('open');
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && nav.classList.contains('open')){
      menuToggle.setAttribute('aria-expanded','false');
      nav.classList.remove('open');
      menuToggle.focus();
    }
  });

  // copy email helper
  copyEmail.addEventListener('click', async ()=>{
  const email = 'baloyinwayitelo6@gmail.com';
    try{
      await navigator.clipboard.writeText(email);
      copyEmail.textContent = 'Copied ✓';
      setTimeout(()=> copyEmail.textContent = 'Copy email', 1800);
    }catch(e){
      const ta = document.createElement('textarea');
      ta.value = email; document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); copyEmail.textContent = 'Copied ✓'; setTimeout(()=> copyEmail.textContent = 'Copy email',1800);}catch(e){alert('Copy not supported. Email: '+email)} ta.remove();
    }
  });

  // smooth scroll for intra-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); target.focus({preventScroll:true}); }
    });
  });

  // close mobile menu when a nav link is clicked (mobile UX)
  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', ()=>{
      if(nav.classList.contains('open')){
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded','false');
      }
    });
  });

  // form submit — POST to Netlify Forms when deployed
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);

    // honeypot check
    if(formData.get('bot-field')){
      // silently fail
      console.log('Bot submission blocked');
      return;
    }

    // encode as application/x-www-form-urlencoded
    const encode = (data) => {
      return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
    };

    const payload = {};
    for(const [k,v] of formData.entries()) payload[k] = v;

    // show sending state
    if(formStatus){ formStatus.textContent = 'Sending...'; formStatus.className = 'form-status'; }

    // determine endpoint: if the form has an explicit action (e.g. Formspree), use it; otherwise post to '/' (Netlify capture)
    const explicitAction = (form.getAttribute('action') || '').trim();
    const endpoint = explicitAction && explicitAction !== '#' ? explicitAction : '/';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(payload)
    }).then((response)=>{
      // treat 200-299 as success; Formspree may redirect/return 200
      if(response && response.ok || endpoint === '/'){
        if(formStatus){ formStatus.textContent = 'Thanks — your message was sent.'; formStatus.className = 'form-status success'; }
        form.reset();
      } else {
        throw new Error('Network response not ok');
      }
    }).catch((err)=>{
      console.error(err);
      if(formStatus){ formStatus.textContent = 'Sorry — there was a problem sending your message.'; formStatus.className = 'form-status error'; }
    });
  });

})();