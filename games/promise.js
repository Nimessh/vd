const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

let cards = [
    "❤️", "❤️", "🤞", "🤞", "💍", "💍", "🎁", "🎁",
    "💕", "💕", "💖", "💖", "💌", "💌", "🌹", "🌹"
];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let canFlip = true;
let score = 0;
let timeLeft = 60;
let timer;

function shuffleCards() {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
}

function createBoard() {
    gameBoard.innerHTML = "";
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.innerText = "❓";
        card.addEventListener("click", () => flipCard(card, emoji));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, emoji) {
    if (!canFlip || card.classList.contains("matched")) return;

    card.innerText = emoji;

    if (!firstCard) {
        firstCard = { card, emoji };
    } else if (!secondCard) {
        secondCard = { card, emoji };
        canFlip = false;

        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    if (firstCard.emoji === secondCard.emoji) {
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");
        score += 10;
        scoreDisplay.innerText = score;
    } else {
        firstCard.card.innerText = "❓";
        secondCard.card.innerText = "❓";
    }

    firstCard = null;
    secondCard = null;
    canFlip = true;

    if (document.querySelectorAll(".matched").length === cards.length) {
        clearInterval(timer);
        alert("Congratulations! You've matched all promises!");
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up! Try again.");
            restartGame();
        }
    }, 1000);
}

function restartGame() {
    clearInterval(timer);
    timeLeft = 60;
    score = 0;
    timerDisplay.innerText = timeLeft;
    scoreDisplay.innerText = score;
    firstCard = null;
    secondCard = null;
    canFlip = true;

    shuffleCards();
    createBoard();
    startTimer();
}

// Initialize game
shuffleCards();
createBoard();
startTimer();
