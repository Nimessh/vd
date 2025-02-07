document.addEventListener("DOMContentLoaded", () => {
    const piecesContainer = document.getElementById("pieces");
    const checkButton = document.getElementById("check-button");
    const message = document.getElementById("message");

    let correctOrder = ["1", "2", "3", "4"];
    let shuffledOrder = [...correctOrder].sort(() => Math.random() - 0.5);

    shuffledOrder.forEach(num => {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url('images/letter-piece-${num}.png')`;
        piece.setAttribute("data-id", num);
        piece.draggable = true;
        piecesContainer.appendChild(piece);
    });

    let draggedPiece = null;

    document.querySelectorAll(".piece").forEach(piece => {
        piece.addEventListener("dragstart", (e) => {
            draggedPiece = e.target;
        });

        piece.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        piece.addEventListener("drop", (e) => {
            e.preventDefault();
            let target = e.target;
            if (target.classList.contains("piece")) {
                let tempBg = draggedPiece.style.backgroundImage;
                let tempId = draggedPiece.getAttribute("data-id");
                draggedPiece.style.backgroundImage = target.style.backgroundImage;
                draggedPiece.setAttribute("data-id", target.getAttribute("data-id"));
                target.style.backgroundImage = tempBg;
                target.setAttribute("data-id", tempId);
            }
        });
    });

    checkButton.addEventListener("click", () => {
        let currentOrder = Array.from(piecesContainer.children).map(piece => piece.getAttribute("data-id"));
        if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
            message.classList.remove("hidden");
        }
    });
});
