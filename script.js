// Initialize canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Initialize ball and paddles
var ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  dx: 5,
  dy: -5,
  radius: 10
};

var leftPaddle = {
  x: 30,
  y: canvas.height/2 - 50,
  width: 10,
  height: 100,
  dy: 0
};

var rightPaddle = {
  x: canvas.width - 40,
  y: canvas.height/2 - 50,
  width: 10,
  height: 100,
  dy: 0
};

// Draw ball and paddles
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

function drawLeftPaddle() {
  context.beginPath();
  context.rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

function drawRightPaddle() {
  context.beginPath();
  context.rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawLeftPaddle();
  drawRightPaddle();
  
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Bounce ball off top and bottom walls
  if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
    ball.dy = -ball.dy;
  }
  
  // Bounce ball off left paddle
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.y > leftPaddle.y &&
      ball.y < leftPaddle.y + leftPaddle.height) {
    ball.dx = -ball.dx;
  }
  
  // Bounce ball off right paddle
  if (ball.x + ball.radius > rightPaddle.x &&
      ball.y > rightPaddle.y &&
      ball.y < rightPaddle.y + rightPaddle.height) {
    ball.dx = -ball.dx;
  }
  
  // Move paddles
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;
  
  // Keep paddles within canvas bounds
  if (leftPaddle.y < 0) {
    leftPaddle.y = 0;
  }
  
  if (leftPaddle.y + leftPaddle.height > canvas.height) {
    leftPaddle.y = canvas.height - leftPaddle.height;
  }
  
  if (rightPaddle.y < 0) {
    rightPaddle.y = 0;
  }
  
  if (rightPaddle.y + rightPaddle.height > canvas.height) {
    rightPaddle.y = canvas.height - rightPaddle.height;
  }
}

// Handle keyboard input
document.addEventListener("keydown", function(event) {
  if (event.key === "w") {
    leftPaddle.dy = -5;
  }
  
  if (event.key === "s") {
    leftPaddle.dy = 5;
  }
  
  if (event.key === "ArrowUp") {
    rightPaddle.dy = -5;
  }
  
  if (event.key === "ArrowDown") {
    rightPaddle.dy = 5;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.key === "w" || event.key === "s") {
    leftPaddle.dy = 0;
  }
  
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    rightPaddle.dy = 0;
  }
});

// Start game loop
setInterval(draw, 10);
