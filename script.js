const openGiftButton = document.querySelector('#openGift');
const heartButton = document.querySelector('#heartButton');
const finaleReveal = document.querySelector('#finaleReveal');
const heartRain = document.querySelector('#heartRain');

openGiftButton?.addEventListener('click', () => {
  openGiftButton.classList.add('is-open');
  openGiftButton.querySelector('span:nth-child(2)').textContent = 'Gift opened ♡';
  document.querySelector('#letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  createHeartRain(13);
});

heartButton?.addEventListener('click', () => {
  finaleReveal?.classList.add('is-visible');
  heartButton.innerHTML = '<span>♥</span> always, always';
  createHeartRain(28);
});

function createHeartRain(amount) {
  if (!heartRain) return;

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.textContent = index % 4 === 0 ? '✦' : '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--size', `${0.6 + Math.random() * 1.1}rem`);
    heart.style.setProperty('--duration', `${3.2 + Math.random() * 2.4}s`);
    heart.style.setProperty('--delay', `${Math.random() * .45}s`);
    heart.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    heartRain.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}
