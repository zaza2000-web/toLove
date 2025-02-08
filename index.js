const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 50,
    size: Math.random() * 5 + 5,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5,
  };
}

function drawHeart(heart) {
  ctx.beginPath();
  ctx.moveTo(heart.x, heart.y);
  ctx.bezierCurveTo(
    heart.x - heart.size / 2, heart.y - heart.size / 2,
    heart.x - heart.size, heart.y + heart.size / 2,
    heart.x, heart.y + heart.size
  );
  ctx.bezierCurveTo(
    heart.x + heart.size, heart.y + heart.size / 2,
    heart.x + heart.size / 2, heart.y - heart.size / 2,
    heart.x, heart.y
  );
  ctx.fillStyle = `rgba(255, 105, 180, ${heart.opacity})`;
  ctx.fill();
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    if (heart.y < -50) {
      hearts.splice(index, 1);
    }
    drawHeart(heart);
  });

  if (Math.random() < 0.05) {
    hearts.push(createHeart());
  }

  requestAnimationFrame(updateHearts);
}

updateHearts();

const button = document.getElementById('surpriseButton');
const nameSpan = document.getElementById('name');

button.addEventListener('click', () => {
  const name = prompt('Введите имя любимой (или оставьте "Дорогая")');
  if (name) {
    nameSpan.textContent = name; // 
    alert(`С Днём Святого Валентина, ${name}! ❤️`);
  } else {
    alert("Ты ничего не ввёл. Но всё равно поздравляю!");
  }
});
