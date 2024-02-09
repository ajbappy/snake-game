const gameBoard = document.querySelector(".game-board");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

let gameScore = 0;
let foodX;
let foodY;

let snake = [{ x: 10, y: 12 }];
let moveX = 0;
let moveY = 0;

// food derection change

const handleFoodDerection = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// snake deraction change

const handelSnake = (e) => {
  console.log(e);

  if (e.key === "ArrowUp") {
    moveX = 0;
    moveY = -1;
  } else if (e.key === "ArrowDown") {
    moveX = 0;
    moveY = 1;
  } else if (e.key === "ArrowRight") {
    moveX = 1;
    moveY = 0;
  } else if (e.key === "ArrowLeft") {
    moveX = -1;
    moveY = 0;
  }
  gameInit();
};

document.addEventListener("keydown", handelSnake);

// game init
const gameInit = () => {
  let htmlMarkap = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  //   if snake hit food change the food position

  if (snake[0].x === foodX && snake[0].y === foodY) {
    handleFoodDerection();
    console.log("hit");

    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });

    gameScore++;
  }

  //   update snake position

  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  snake[0].x += moveX;
  snake[0].y += moveY;

  // update game score

  score.innerHTML = ` <span class="score">Score :${gameScore} </span>`;

  // get high score from local storage

  const getScore = localStorage.getItem("high-score");

  if (gameScore > getScore) {
    localStorage.setItem("high-score", gameScore);
  }

  highScore.innerHTML = ` <span class="score">Highest-Score :${getScore} </span>`;

  //   if snake hit the game border then game is over

  if (
    snake[0].x < 1 ||
    snake[0].x > 30 ||
    snake[0].y < 1 ||
    snake[0].y > 30 ||
    checkCollision()
  ) {
    alert("Game  Over !");
    location.reload();
  }

  snake.forEach((segment) => {
    htmlMarkap += `<div class="snake" style = "grid-area: ${segment.y} / ${segment.x}"></div>`;
  });

  gameBoard.innerHTML = htmlMarkap;
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

handleFoodDerection();
gameInit();
