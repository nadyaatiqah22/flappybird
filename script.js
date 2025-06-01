const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipe-top');
const pipeBottom = document.getElementById('pipe-bottom');
const scoreDisplay = document.getElementById('score');

let birdTop = 200;
let gravity = 2;
let isGameOver = false;
let score = 0;

document.addEventListener('keydown', () => {
  if (!isGameOver) birdTop -= 40;
});

function moveBird() {
  birdTop += gravity;
  bird.style.top = birdTop + 'px';

  if (birdTop > 470 || birdTop < 0) {
    endGame();
  }
}

let pipeX = 400;
let gap = 120;
let pipeHeight = Math.floor(Math.random() * 200) + 50;

function movePipes() {
  pipeX -= 3;
  if (pipeX < -50) {
    pipeX = 400;
    pipeHeight = Math.floor(Math.random() * 200) + 50;
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }

  pipeTop.style.height = pipeHeight + 'px';
  pipeBottom.style.height = (500 - pipeHeight - gap) + 'px';
  pipeTop.style.left = pipeX + 'px';
  pipeBottom.style.left = pipeX + 'px';

  // Cek tabrakan
  if (
    pipeX < 80 && pipeX > 20 &&
    (birdTop < pipeHeight || birdTop > pipeHeight + gap)
  ) {
    endGame();
  }
}

function endGame() {
  isGameOver = true;
  alert('Game Over! Skor kamu: ' + score);
  location.reload(); // restart game
}

function gameLoop() {
  if (!isGameOver) {
    moveBird();
    movePipes();
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
