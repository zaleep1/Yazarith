const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Lista de preguntas con sus imágenes
const questions = [
    { text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1 },
    { text: "Ya no me quieres...", img: "assets/final.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 3, next2: 0 },
    { text: "¿Como andas el dia de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 5, next2: 4 },
    { text: "¿Como te ves el dia de hoy?", img: "assets/3.png", btn1: "Linda", btn2: "Fea", next1: 5, next2: 5 },
    { text: "Bueno... Adiós 😭", img: "assets/triste.png", btn1: "Reiniciar", btn2: "Cerrar", next1: 0, next2: null }
];

// Estado actual
let currentQuestion = 0;

// Función para cambiar la pregunta
function changeQuestion(nextIndex) {
    if (nextIndex === null) return; // Si es null, no hace nada (Ejemplo: cerrar el juego)

    currentQuestion = nextIndex;
    const q = questions[currentQuestion];

    // Sonido de clic
    clickSound.play();

    // Efecto de aparición
    questionText.classList.remove("fade-in");
    questionImg.classList.remove("fade-in");
    setTimeout(() => {
        questionText.textContent = q.text;
        questionImg.src = q.img;
        btn1.textContent = q.btn1;
        btn2.textContent = q.btn2;
        questionText.classList.add("fade-in");
        questionImg.classList.add("fade-in");
    }, 100); // Pequeño retraso para reiniciar animación

    // Asignar nuevas funciones a los botones
    btn1.onclick = () => changeQuestion(q.next1);
    btn2.onclick = () => changeQuestion(q.next2);
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);
