document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const bgMusic = document.getElementById("bg-music");
    const scoreDisplay = document.getElementById("score");

    canvas.width = 400;
    canvas.height = 500;

    let score = 0;
    let ringX = canvas.width / 2 - 30;
    let ringSpeed = 7;
    let hearts = [];
    let obstacles = [];
    let gameRunning = true;

    class Heart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 20;
            this.speed = 3;
        }

        draw() {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.y += this.speed;
        }
    }

    class Obstacle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 25;
            this.speed = 4;
        }

        draw() {
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.y += this.speed;
        }
    }

    function createHeart() {
        const x = Math.random() * (canvas.width - 20);
        hearts.push(new Heart(x, 0));
    }

    function createObstacle() {
        const x = Math.random() * (canvas.width - 25);
        obstacles.push(new Obstacle(x, 0));
    }

    function updateGame() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "gold";
        ctx.fillRect(ringX, canvas.height - 40, 60, 10);

        hearts.forEach((heart, index) => {
            heart.update();
            heart.draw();

            if (
                heart.y > canvas.height - 50 &&
                heart.x > ringX &&
                heart.x < ringX + 60
            ) {
                hearts.splice(index, 1);
                score += 10;
                scoreDisplay.innerText = score;
            }

            if (heart.y > canvas.height) {
                hearts.splice(index, 1);
            }
        });

        obstacles.forEach((obstacle, index) => {
            obstacle.update();
            obstacle.draw();

            if (
                obstacle.y > canvas.height - 50 &&
                obstacle.x > ringX &&
                obstacle.x < ringX + 60
            ) {
                gameRunning = false;
                alert("Oops! You hit an obstacle. Try again.");
                restartGame();
            }

            if (obstacle.y > canvas.height) {
                obstacles.splice(index, 1);
            }
        });

        requestAnimationFrame(updateGame);
    }

    function moveRing(event) {
        if (event.key === "ArrowLeft" && ringX > 0) {
            ringX -= ringSpeed;
        } else if (event.key === "ArrowRight" && ringX < canvas.width - 60) {
            ringX += ringSpeed;
        }
    }

    function restartGame() {
        score = 0;
        scoreDisplay.innerText = score;
        ringX = canvas.width / 2 - 30;
        hearts = [];
        obstacles = [];
        gameRunning = true;
        startGame();
    }

    function startGame() {
        hearts = [];
        obstacles = [];
        bgMusic.volume = 0.5;
        bgMusic.play();

        setInterval(createHeart, 1000);
        setInterval(createObstacle, 2000);
        updateGame();
    }

    document.addEventListener("keydown", moveRing);
    startGame();
});
