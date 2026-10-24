const body = document.body;
const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.nav-links a');
const openGiftButton = document.querySelector('#openGift');
const heartButton = document.querySelector('#heartButton');
const finaleReveal = document.querySelector('#finaleReveal');
const heartRain = document.querySelector('#heartRain');
const progress = document.querySelector('#scrollProgress');
const cursorGlow = document.querySelector('.cursor-glow');
const tiltCard = document.querySelector('.tilt-card');

body.classList.add('js-ready');

// The hero is the first gift, so it should never wait for a scroll to reveal itself.
document.querySelectorAll('.hero .reveal').forEach((element) => element.classList.add('is-visible'));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${percentage}%`;
  nav?.classList.toggle('nav-scrolled', window.scrollY > 28);
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .13, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

menuButton?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

openGiftButton?.addEventListener('click', () => {
  openGiftButton.classList.add('is-open');
  const label = openGiftButton.querySelector('.button-label');
  if (label) label.textContent = 'gift opened ♡';
  burstHearts(16);
  document.querySelector('#letter')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
});

heartButton?.addEventListener('click', () => {
  finaleReveal?.classList.add('is-visible');
  heartButton.innerHTML = '<span>♥</span><b>always, always</b>';
  burstHearts(34);
});

if (cursorGlow && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '.9';
  }, { passive: true });
}

if (tiltCard && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('pointermove', (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    tiltCard.style.transform = `rotate(3.3deg) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-5px)`;
  });
  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = '';
  });
}

function burstHearts(amount) {
  if (!heartRain || reduceMotion) return;

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = index % 5 === 0 ? '✦' : '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--size', `${.6 + Math.random() * 1.15}rem`);
    heart.style.setProperty('--duration', `${3.2 + Math.random() * 2.6}s`);
    heart.style.setProperty('--delay', `${Math.random() * .35}s`);
    heart.style.setProperty('--drift', `${-110 + Math.random() * 220}px`);
    heartRain.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}
