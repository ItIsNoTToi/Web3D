const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('signupForm');
const formStatus = document.getElementById('formStatus');

let width = 0;
let height = 0;
let state = 'outside'; // outside | transitioning | inside
let t = 0; // 0..1 transition

function resize() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawOutside(progress) {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#f7e7d7');
  sky.addColorStop(1, '#f6f1ea');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const buildingScale = 1 + progress * 0.25;
  const bw = width * 0.8 * buildingScale;
  const bh = height * 0.6 * buildingScale;
  const bx = (width - bw) / 2;
  const by = height * 0.2 - progress * height * 0.08;

  ctx.fillStyle = '#c11b1b';
  ctx.fillRect(bx, by, bw, bh * 0.18);

  ctx.fillStyle = '#d33a2c';
  ctx.fillRect(bx, by + bh * 0.18, bw, bh * 0.82);

  ctx.fillStyle = '#f9f5ef';
  const glassH = bh * 0.55;
  const glassW = bw * 0.86;
  const glassX = bx + bw * 0.07;
  const glassY = by + bh * 0.25;
  ctx.fillRect(glassX, glassY, glassW, glassH);

  // Door hotspot
  const doorW = glassW * 0.22;
  const doorH = glassH * 0.85;
  const doorX = glassX + glassW * 0.39;
  const doorY = glassY + glassH * 0.12;

  ctx.fillStyle = '#1b1b1b';
  ctx.fillRect(doorX, doorY, doorW, doorH);

  ctx.strokeStyle = '#f2c94c';
  ctx.lineWidth = 3;
  ctx.strokeRect(doorX - 2, doorY - 2, doorW + 4, doorH + 4);

  return { door: { x: doorX, y: doorY, w: doorW, h: doorH } };
}

function drawInside() {
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#f3f0ea');
  bg.addColorStop(1, '#e4ddd2');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const floorH = height * 0.35;
  ctx.fillStyle = '#cbb8a3';
  ctx.fillRect(0, height - floorH, width, floorH);

  // Reception desk
  const deskW = width * 0.35;
  const deskH = height * 0.16;
  const deskX = width * 0.5 - deskW / 2;
  const deskY = height * 0.55;
  ctx.fillStyle = '#8b3c2f';
  ctx.fillRect(deskX, deskY, deskW, deskH);

  ctx.fillStyle = '#f2c94c';
  ctx.fillRect(deskX, deskY - deskH * 0.25, deskW, deskH * 0.25);

  ctx.fillStyle = '#2b2b2b';
  ctx.fillRect(deskX + deskW * 0.1, deskY + deskH * 0.25, deskW * 0.8, deskH * 0.15);

  // Reception hotspot
  const hotX = deskX + deskW * 0.15;
  const hotY = deskY - deskH * 0.45;
  const hotW = deskW * 0.7;
  const hotH = deskH * 0.6;

  ctx.strokeStyle = '#f2c94c';
  ctx.lineWidth = 3;
  ctx.strokeRect(hotX, hotY, hotW, hotH);

  ctx.fillStyle = '#111111';
  ctx.font = '16px "Trebuchet MS", sans-serif';
  ctx.fillText('Qu?y l? tân', hotX + 12, hotY + 28);

  return { reception: { x: hotX, y: hotY, w: hotW, h: hotH } };
}

let hotspots = { door: null, reception: null };

function render() {
  ctx.clearRect(0, 0, width, height);
  if (state === 'outside') {
    hotspots = { door: drawOutside(0), reception: null };
  } else if (state === 'transitioning') {
    hotspots = { door: drawOutside(t), reception: null };
  } else {
    hotspots = { door: null, reception: drawInside() };
  }
}

function animate() {
  if (state === 'transitioning') {
    t += 0.02;
    if (t >= 1) {
      t = 1;
      state = 'inside';
    }
  }
  render();
  requestAnimationFrame(animate);
}

function insideRect(x, y, rect) {
  if (!rect) return false;
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (state === 'outside' && hotspots.door) {
    if (insideRect(x, y, hotspots.door.door)) {
      state = 'transitioning';
      t = 0;
    }
  } else if (state === 'inside' && hotspots.reception) {
    if (insideRect(x, y, hotspots.reception.reception)) {
      openModal();
    }
  }
});

function openModal() {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function close() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

closeModal.addEventListener('click', close);
modal.addEventListener('click', (e) => {
  if (e.target === modal) close();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = 'Ðang g?i...';

  const data = new FormData(form);
  const payload = Object.fromEntries(data.entries());

  try {
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Submit failed');

    formStatus.textContent = 'Ðã g?i. Chúng tôi s? liên h? s?m.';
    form.reset();
  } catch (err) {
    formStatus.textContent = 'G?i th?t b?i. Vui lòng th? l?i.';
  }
});

resize();
window.addEventListener('resize', resize);
animate();
