// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 200);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.25,
  rootMargin: "0px 0px -100px 0px"
});

faders.forEach(fade => appearOnScroll.observe(fade));

// Scroll tilt
window.addEventListener('scroll', () => {
  document.querySelectorAll('.scroll-tilt').forEach(el => {
    const speed = el.getAttribute('data-speed') || 0.2;
    const offset = window.scrollY * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
});

// Stars + Lightning
const canvas = document.getElementById("lightning-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.2,
    alpha: Math.random()
  });
}

function drawStars() {
  for (let star of stars) {
    ctx.beginPath();
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "white";
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
}

function flashScreen() {
  document.body.classList.add('flash');
  setTimeout(() => document.body.classList.remove('flash'), 80);
}

function drawLightning() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();

  if (Math.random() > 0.985) {
    flashScreen();
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "white";
    ctx.strokeStyle = `rgba(255,255,255,${Math.random()})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    let x = Math.random() * canvas.width;
    let y = 0;
    ctx.moveTo(x, y);
    for (let i = 0; i < 10; i++) {
      x += (Math.random() - 0.5) * 50;
      y += canvas.height / 10;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  requestAnimationFrame(drawLightning);
}

drawLightning();
