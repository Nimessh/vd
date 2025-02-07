// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let score = 0;
let gameOver = false;

// Player object (Heart emoji)
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0,
    emoji: "💖"
};

// Hug object (Hug emoji)
const hug = {
    x: Math.random() * (canvas.width - 40),
    y: -40,
    width: 40,
    height: 40,
    speed: 3,
    emoji: "🤗"
};

// Obstacle object (Stop sign emoji)
const obstacle = {
    x: Math.random() * (canvas.width - 40),
    y: -40,
    width: 40,
    height: 40,
    speed: 4,
    emoji: "🛑"
};

// Draw player (Heart emoji)
function drawPlayer() {
    ctx.font = "40px Arial";
    ctx.fillText(player.emoji, player.x, player.y + 40);
}

// Draw hug (Hug emoji)
function drawHug() {
    ctx.font = "40px Arial";
    ctx.fillText(hug.emoji, hug.x, hug.y + 40);
}

// Draw obstacle (Stop sign emoji)
function drawObstacle() {
    ctx.font = "40px Arial";
    ctx.fillText(obstacle.emoji, obstacle.x, obstacle.y + 40);
}

// Update player position based on key press
function updatePlayer() {
    player.x += player.dx;

    // Prevent player from going outside the canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Move hug and obstacle
function moveHug() {
    hug.y += hug.speed;
    if (hug.y > canvas.height) {
        hug.y = -40;
        hug.x = Math.random() * (canvas.width - 40);
    }
}

function moveObstacle() {
    obstacle.y += obstacle.speed;
    if (obstacle.y > canvas.height) {
        obstacle.y = -40;
        obstacle.x = Math.random() * (canvas.width - 40);
    }
}

// Check collision with hug
function checkHugCollision() {
    if (player.x < hug.x + hug.width && player.x + player.width > hug.x &&
        player.y < hug.y + hug.height && player.y + player.height > hug.y) {
        score++;
        hug.y = -40; // Reset hug position
        hug.x = Math.random() * (canvas.width - 40);
    }
}

// Check collision with obstacle
function checkObstacleCollision() {
    if (player.x < obstacle.x + obstacle.width && player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height && player.y + player.height > obstacle.y) {
        gameOver = true; // End the game
    }
}

// Update the game canvas
function update() {
    if (gameOver) return gameOverScreen();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawHug();
    drawObstacle();
    moveHug();
    moveObstacle();
    updatePlayer();
    checkHugCollision();
    checkObstacleCollision();

    document.getElementById("score").textContent = score;

    requestAnimationFrame(update);
}

// Display "I loveee youuuuuuuu muahhh" message
function gameOverScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#d81b60";
    ctx.fillText("I loveee youuuuuuuu muahhh!", canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Final Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 40);
}

// Key event listeners
function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function stopPlayer() {
    player.dx = 0;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
    if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
});

document.addEventListener('keyup', stopPlayer);

// Start the game
update();
