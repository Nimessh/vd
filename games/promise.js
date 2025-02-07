const questions = [
    {
        question: "What is a promise?",
        options: ["A commitment", "A gift", "A secret", "A secret gesture"],
        answer: 0
    },
    {
        question: "When do you break a promise?",
        options: ["Never", "When it's too difficult", "When you forget", "When you’re bored"],
        answer: 0
    },
    {
        question: "A promise shows?",
        options: ["Trust", "Respect", "Love", "All of the above"],
        answer: 3
    },
    {
        question: "Which of these is NOT a promise?",
        options: ["I’ll try", "I will", "I might", "I promise"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        document.getElementById("question").textContent = question.question;
        const buttons = document.querySelectorAll(".answer-btn");
        question.options.forEach((option, index) => {
            buttons[index].textContent = option;
        });
    } else {
        showFinalScore();
    }
}

function checkAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedIndex === correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.querySelector(".question-container").classList.add("hidden");
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.classList.remove("hidden");
    document.getElementById("score").textContent = score;

    let finalMessage = '';
    if (score === questions.length) {
        finalMessage = "You're a Promise Day Pro! I loveeee youuuuu 💖";
    } else if (score >= questions.length / 2) {
        finalMessage = "Great! You understand the essence of promises. I loveeeeeeee youuuuuuuuuu 💝";
    } else {
        finalMessage = "You might need to work on your promises. Don’t worry, you’ll get there! I loveeeeeeeee youuuuuuuuuuuuuuuu 💗";
    }
    document.getElementById("final-message").textContent = finalMessage;
}

loadQuestion();
