document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".game-board");
    const status = document.getElementById("status");

    const chocolates = ["🍫", "🍩", "🍪", "🍯", "🍯", "🍩", "🍪", "🍫"]; // Pairs
    let shuffledChocolates = chocolates.sort(() => 0.5 - Math.random());

    let selectedCards = [];
    let matchedPairs = 0;

    // Create game cards
    shuffledChocolates.forEach((choco, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.choco = choco;
        card.dataset.index = index;
        card.textContent = "?";
        board.appendChild(card);

        card.addEventListener("click", () => flipCard(card));
    });

    function flipCard(card) {
        if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            card.textContent = card.dataset.choco;
            selectedCards.push(card);
        }

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        let [card1, card2] = selectedCards;

        if (card1.dataset.choco === card2.dataset.choco) {
            matchedPairs++;
            card1.style.pointerEvents = "none";
            card2.style.pointerEvents = "none";
        } else {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "?";
            card2.textContent = "?";
        }

        selectedCards = [];

        if (matchedPairs === chocolates.length / 2) {
            status.textContent = "Just like chocolate, you’re the perfect blend of sweetness and warmth that melts my heart every day. Life with you is the tastiest treat I could ever ask for. Here’s to stealing bites of happiness together… and sharing endless ‘sweet’ moments. 💖 You’re my favorite flavor of forever. Love you to the last sprinkle!";
        }
    }
});
