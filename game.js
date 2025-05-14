const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;  // Kích thước ô vuông
const snakeColor = 'lime';  // Màu rắn
const foodColor = 'red';  // Màu thức ăn

let snake = [
  { x: 5 * grid, y: 5 * grid },
  { x: 4 * grid, y: 5 * grid },
  { x: 3 * grid, y: 5 * grid },
];

let food = { x: 8 * grid, y: 8 * grid };
let dx = grid;  // Di chuyển ban đầu
let dy = 0;
let score = 0;
let gameSpeed = 200;  // Tốc độ game (chậm)

function move(direction) {
  if (direction === 'up' && dy === 0) {
    dx = 0;
    dy = -grid;
  } else if (direction === 'down' && dy === 0) {
    dx = 0;
    dy = grid;
  } else if (direction === 'left' && dx === 0) {
    dx = -grid;
    dy = 0;
  } else if (direction === 'right' && dx === 0) {
    dx = grid;
    dy = 0;
  }
}

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -grid;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = grid;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -grid;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = grid;
    dy = 0;
  }
}

// Thay đổi mức độ khó
function changeDifficulty(difficulty) {
  if (difficulty === "easy") {
    gameSpeed = 200;  // Dễ
  } else if (difficulty === "medium") {
    gameSpeed = 150;  // Trung bình
  } else if (difficulty === "hard") {
    gameSpeed = 100;  // Khó
  }
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Kiểm tra nếu rắn ăn thức ăn
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
  } else {
    snake.pop();  // Xóa đuôi nếu không ăn thức ăn
  }

  // Kiểm tra va chạm với tường hoặc chính mình
  if (
    head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
    checkCollision(head, snake)
  ) {
    alert("Game Over! Điểm của bạn: " + score);
    resetGame();
  }
}

function checkCollision(head, body) {
  for (let i = 1; i < body.length; i++) {
    if (body[i].x === head.x && body[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function spawnFood() {
  const x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
  const y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
  food = { x, y };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ thức ăn
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x, food.y, grid, grid);

  // Vẽ rắn
  ctx.fillStyle = snakeColor;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
  }

  // Vẽ điểm số
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Điểm: " + score, 10, 20);
}

function resetGame() {
  snake = [
    { x: 5 * grid, y: 5 * grid },
    { x: 4 * grid, y: 5 * grid },
    { x: 3 * grid, y: 5 * grid },
  ];
  dx = grid;
  dy = 0;
  score = 0;
  spawnFood();
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, gameSpeed);  // Điều chỉnh tốc độ game
}

spawnFood();
gameLoop();
