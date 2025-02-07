document.addEventListener("DOMContentLoaded", function() {
    const days = [
        "rose-day", "propose-day", "chocolate-day", "teddy-day",
        "promise-day", "hug-day", "kiss-day", "valentines-day"
    ];
    
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 1, 7); // February 7th

    days.forEach((day, index) => {
        const unlockDate = new Date(startDate);
        unlockDate.setDate(startDate.getDate() + index);

        if (today >= unlockDate) {
            document.getElementById(day).classList.add("unlocked");
        }
    });
});

// Background Music Controls
function playMusic() {
    const music = document.getElementById("bg-music");
    music.volume = 0.5;
    music.play();
}
