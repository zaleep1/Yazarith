const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const questionNumber = document.getElementById("question-number");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Lista de preguntas con imágenes y número de pregunta
const questions = [
    { number: 1, text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1, isTroll: false }, 

    { number: 2, text: "Ya no me quieres...", img: "assets/final.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 2, next2: 0, isTroll: false },
    { number: 3, text: "¿Cómo andas el día de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 4, next2: 3, isTroll: false },
    { number: 4, text: "Recuerda que estoy aquí para ti y puedes contarme el por qué", img: "assets/5s.png", btn1: "Está bien, lo haré", btn2: "Lo pensaré", next1: 4, next2: 4, isTroll: false },
    { number: 5, text: "¿Cómo te ves el día de hoy?", img: "assets/4.png", btn1: "Linda", btn2: "Fea", next1: 5, next2: null, isTroll: true },
    { number: 6, text: "Como siempre 💖", img: "assets/5.png", btn1: "Qué lindo", btn2: "Adiós", next1: 0, next2: null, isTroll: false }
];

// Estado actual
let currentQuestion = 0;
let isTransitioning = false;

// Función para cambiar la pregunta con delay
function changeQuestion(nextIndex) {
    if (nextIndex === null || isTransitioning) return;

    isTransitioning = true;
    btn1.disabled = true;
    btn2.disabled = true;

    currentQuestion = nextIndex;
    const q = questions[currentQuestion];

    clickSound.play();

    questionText.classList.remove("fade-in");
    questionImg.classList.remove("fade-in");
    questionNumber.classList.remove("fade-in");

    setTimeout(() => {
        questionNumber.textContent = `Pregunta ${q.number}`;
        questionText.textContent = q.text;
        questionImg.src = q.img;
        btn1.textContent = q.btn1;
        btn2.textContent = q.btn2;

        if (q.isTroll) {
            makeButtonMove(btn2); // Hace que el botón 2 se mueva si es un botón troll
        } else {
            resetButton(btn2); // Restaura su posición si no es troll
        }

        setTimeout(() => {
            isTransitioning = false;
            btn1.disabled = false;
            btn2.disabled = false;
        }, 300);

        questionText.classList.add("fade-in");
        questionImg.classList.add("fade-in");
        questionNumber.classList.add("fade-in");
    }, 200);

    btn1.onclick = () => changeQuestion(q.next1);
    btn2.onclick = () => changeQuestion(q.next2);
}

// Función para hacer que el botón se mueva
function makeButtonMove(button) {
    button.style.position = "absolute";

    button.onmouseover = () => {
        const x = Math.random() * (window.innerWidth - button.clientWidth);
        const y = Math.random() * (window.innerHeight - button.clientHeight);
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    };
}

// Función para restaurar el botón
function resetButton(button) {
    button.style.position = "";
    button.style.left = "";
    button.style.top = "";
    button.onmouseover = null;
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);
