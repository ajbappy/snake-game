const gameBoard = document.querySelector('.game-board');
let foodX;
let foodY;

let snake = [{ x: 10, y: 12 }]; // Initial snake with one segment
let moveX = 0;
let moveY = 0;

// Food direction change
const handleFoodDirection = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Snake direction change
const handleSnake = (e) => {
  console.log(e);

  if (e.key === 'ArrowUp') {
    moveX = 0;
    moveY = -1;
  } else if (e.key === 'ArrowDown') {
    moveX = 0;
    moveY = 1;
  } else if (e.key === 'ArrowRight') {
    moveX = 1;
    moveY = 0;
  } else if (e.key === 'ArrowLeft') {
    moveX = -1;
    moveY = 0;
  }
  gameInit();
};

document.addEventListener('keydown', handleSnake);

// Game initialization
const gameInit = () => {
  // Check if the snake's head hits the food
  if (snake[0].x === foodX && snake[0].y === foodY) {
    handleFoodDirection();
    console.log('hit');

    // Add a new segment to the snake's body at the tail
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }

  // Update snake's position
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }
  snake[0].x += moveX;
  snake[0].y += moveY;

  // Check if the snake hits the game border then game is over
  if (
    snake[0].x < 1 ||
    snake[0].x > 30 ||
    snake[0].y < 1 ||
    snake[0].y > 30 ||
    checkCollision()
  ) {
    alert('Game Over!');
    location.reload();
  }

  // Render food and snake on the game board
  let htmlMarkup = <div class="food" style="grid-area: ${foodY} / ${foodX}"></div>;
  snake.forEach((segment) => {
    htmlMarkup += <div class="snake" style="grid-area: ${segment.y} / ${segment.x}"></div>;
  });

  gameBoard.innerHTML = htmlMarkup;
};

// Check if the snake collides with itself
const checkCollision = () => {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
};

handleFoodDirection();
gameInit();