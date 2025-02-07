document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("score");
    const message = document.getElementById("message");

    let score = 0;
    let gameRunning = true;

    // Move basket with arrow keys
    document.addEventListener("keydown", (event) => {
        let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
        
        if (event.key === "ArrowLeft" && basketLeft > 0) {
            basket.style.left = basketLeft - 20 + "px";
        }
        if (event.key === "ArrowRight" && basketLeft < window.innerWidth - 100) {
            basket.style.left = basketLeft + 20 + "px";
        }
    });

    function createFallingItem(type) {
        let item = document.createElement("div");
        item.classList.add(type);
        item.style.left = Math.random() * (window.innerWidth - 30) + "px";
        gameContainer.appendChild(item);

        let fallInterval = setInterval(() => {
            let itemTop = parseInt(window.getComputedStyle(item).getPropertyValue("top"));

            if (itemTop > 450) {
                let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
                let itemLeft = parseInt(window.getComputedStyle(item).getPropertyValue("left"));

                if (itemLeft > basketLeft && itemLeft < basketLeft + 100) {
                    gameContainer.removeChild(item);
                    clearInterval(fallInterval);
                    if (type === "rose") {
                        score++;
                    } else {
                        score = Math.max(0, score - 1); // Lose a point if catching a thorn
                    }
                    scoreDisplay.textContent = "Score: " + score;
                } else {
                    gameContainer.removeChild(item);
                    clearInterval(fallInterval);
                }
            } else {
                item.style.top = itemTop + 5 + "px";
            }
        }, 50);
    }

    function startGame() {
        let gameInterval = setInterval(() => {
            if (gameRunning) {
                createFallingItem(Math.random() > 0.2 ? "rose" : "thorn"); // 80% chance rose, 20% thorn
            }
        }, 800);

        setTimeout(() => {
            clearInterval(gameInterval);
            gameRunning = false;
            message.textContent = `Babyy, even if you only caught ${score} roses! I loveeeeeee youuu moree thann thoseeee, timi vandaa ramroo ful ta aruu chainaa kk. Muahhh !! 🌹💖`;
        }, 30000); // Game runs for 30 seconds
    }

    startGame();
});
