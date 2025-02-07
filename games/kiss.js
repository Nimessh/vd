document.getElementById("kiss").addEventListener("click", function() {
    let kiss = document.createElement("div");
    kiss.classList.add("kiss");
    kiss.innerText = "💋";
    kiss.style.left = Math.random() * 90 + "vw";
    document.getElementById("kisses").appendChild(kiss);

    gsap.to(kiss, {
        duration: 3,
        y: "-100vh",
        opacity: 0,
        onComplete: () => kiss.remove()
    });
});
