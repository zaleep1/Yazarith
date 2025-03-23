const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const finalImg = document.getElementById("final-img");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");
const preguntaImg = document.getElementById("pregunta-img");
const questionText = document.querySelector("h1");

const preguntas = [
    { texto: "Hola", opciones: { "Hola": 2, "Adios": 1 } },
    { texto: "Ya no me quieles", opciones: { "Sí te quiero": 3, "No": 3 } },
    { texto: "Lo que tú me dijiste hace tiempo estaba bien", opciones: { "Sí": "final", "No": "final" } }
];

let preguntaActual = 0;

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    questionText.textContent = pregunta.texto;

    // Obtener los botones
    const botones = document.querySelectorAll(".buttons button");
    botones.forEach((boton, index) => {
        const textoOpcion = Object.keys(pregunta.opciones)[index];
        boton.textContent = textoOpcion;
        boton.onclick = () => {
            const siguiente = pregunta.opciones[textoOpcion];
            if (siguiente === "final") {
                finalizar();
            } else {
                preguntaActual = siguiente;
                mostrarPregunta();
            }
        };
    });
}

function finalizar() {
    clickSound.play();
    document.querySelector(".buttons").style.display = "none";
    preguntaImg.style.display = "none";
    finalImg.classList.remove("hidden");
    setTimeout(() => finalImg.classList.add("animate"), 100);
}

document.body.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(error => console.log("Autoplay bloqueado:", error));
    }
});

// Iniciar con la primera pregunta
mostrarPregunta();
