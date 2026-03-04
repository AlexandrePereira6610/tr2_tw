const slides = document.querySelectorAll('.carousel-slide');
const progressBar = document.querySelector('.carousel-progress-bar');
let currentIndex = 0;
const interval = 15000;

function nextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
  startProgress();
}

function startProgress() {
  // Reinicia a barra
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';

  // Força o reflow para que o reset seja aplicado antes de animar
  progressBar.offsetHeight;

  // Anima até 100% durante o intervalo definido
  progressBar.style.transition = `width ${interval}ms linear`;
  progressBar.style.width = '100%';
}

startProgress();
setInterval(nextSlide, interval);