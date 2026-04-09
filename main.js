/* ============================================================
   PAGO ÁGIL — Scripts principales
   Archivo: js/main.js
   ============================================================ */

// ─── HAMBURGER MENU ───
const ham = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
let menuOpen = false;

ham.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menu.classList.toggle('open', menuOpen);
  ham.children[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  ham.children[1].style.opacity   = menuOpen ? '0' : '1';
  ham.children[2].style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    menu.classList.remove('open');
    ham.children[0].style.transform = '';
    ham.children[1].style.opacity   = '1';
    ham.children[2].style.transform = '';
  });
});

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card').forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});

document.querySelectorAll('.step').forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});

document.querySelectorAll('.city-card').forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});

// ─── ALIADOS CHIPS ANIMATION ───
document.querySelectorAll('.aliado-chip').forEach((el, i) => {
  el.dataset.delay = i;
  observer.observe(el);
});

// ─── FORM SUBMIT ───
function handleSubmit(btn) {
  btn.textContent = '✅ ¡Mensaje enviado!';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje →';
    btn.style.background = '';
  }, 3000);
}

// ─── ANIMATED COUNTERS ───
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const els = entry.target.querySelectorAll('.counter');
      els.forEach(el => {
        const target    = parseInt(el.dataset.target);
        const prefix    = el.dataset.prefix || '';
        const suffix    = el.dataset.suffix || '';
        let current     = 0;
        const duration  = 1600;
        const steps     = 60;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = prefix + target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = prefix + Math.floor(current) + suffix;
          }
        }, duration / steps);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

// ─── ANIMATED COUNTER (legacy helper) ───
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}
