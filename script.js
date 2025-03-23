const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalImg = document.getElementById("final-img");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

document.body.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => console.log("Autoplay bloqueado:", error));
    }
});

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noButton.clientWidth);
    const y = Math.random() * (window.innerHeight - noButton.clientHeight);
    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

noButton.addEventListener("click", moveNoButton);

yesButton.addEventListener("click", () => {
    clickSound.play();
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("pregunta-img").style.display = "none";
    finalImg.classList.remove("hidden");
    setTimeout(() => finalImg.classList.add("animate"), 100);
});
