const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const questionNumber = document.getElementById("question-number");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");

// Guarda la posición inicial exacta de los botones en el HTML
const initialBtn1X = btn1.getBoundingClientRect().left;
const initialBtn1Y = btn1.getBoundingClientRect().top;
const initialBtn2X = btn2.getBoundingClientRect().left;
const initialBtn2Y = btn2.getBoundingClientRect().top;

// Lista de preguntas
const questions = [
    { number: 1, text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1, isTroll: false }, 
    { number: 2, text: "Ya no me quieres...", img: "assets/final.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 2, next2: 0, isTroll: false },
    { number: 3, text: "¿Cómo andas el día de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 4, next2: 3, isTroll: false },
    { number: 4, text: "Recuerda que estoy aquí para ti y puedes contarme el por qué", img: "assets/5s.png", btn1: "Está bien, lo haré", btn2: "Lo pensaré", next1: 4, next2: 4, isTroll: false },
    { number: 5, text: "¿Cómo te ves el día de hoy?", img: "assets/4.png", btn1: "Linda", btn2: "Fea", next1: 5, next2: 5, isTroll: true },
    { number: 6, text: "Como siempre 💖", img: "assets/5.png", btn1: "Qué lindo", btn2: "Adiós", next1: 0, next2: null, isTroll: false }
];

// Estado actual
let currentQuestion = 0;
let isTransitioning = false;

// Función para cambiar la pregunta
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
            moveButtonRandomly(btn2);
        } else {
            resetButtonPosition(btn1);
            resetButtonPosition(btn2);
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
    btn2.onclick = () => {
        if (q.isTroll) {
            moveButtonRandomly(btn2);
        } else {
            changeQuestion(q.next2);
        }
    };
}

// Mueve el botón cuando es pregunta troll
function moveButtonRandomly(button) {
    const maxX = window.innerWidth - button.clientWidth - 20;
    const maxY = window.innerHeight - button.clientHeight - 20;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

// Restaura la posición inicial exacta del HTML
function resetButtonPosition(button) {
    button.style.position = "absolute";
    if (button === btn1) {
        button.style.left = `${initialBtn1X}px`;
        button.style.top = `${initialBtn1Y}px`;
    } else {
        button.style.left = `${initialBtn2X}px`;
        button.style.top = `${initialBtn2Y}px`;
    }
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);
