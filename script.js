const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const questionNumber = document.getElementById("question-number");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Lista de preguntas con imágenes y número de pregunta
const questions = [
    { number: 1, text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1 }, /* 0 */


    { number: 2, text: "Ya no me quieres...", img: "assets/final.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 2, next2: 0 },
    { number: 3, text: "¿Cómo andas el día de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 4, next2: 3 },
    { number: 4, text: "Recuerda que estoy aquí para ti y puedes contarme el por qué", img: "assets/triste.png", btn1: "Está bien, lo haré", btn2: "Lo pensaré", next1: 4, next2: 4 },
    { number: 5, text: "¿Cómo te ves el día de hoy?", img: "assets/4.png", btn1: "Linda", btn2: "Fea", next1: 5, next2: 5 },
    { number: 6, text: "Como siempre 💖", img: "assets/5.png", btn1: "Qué lindo", btn2: "Adiós", next1: 0, next2: null }
];

// Estado actual
let currentQuestion = 0;
let isTransitioning = false; // Variable para evitar clics rápidos

// Función para cambiar la pregunta con delay
function changeQuestion(nextIndex) {
    if (nextIndex === null || isTransitioning) return; // Evita clics rápidos

    isTransitioning = true; // Bloquea los botones temporalmente
    btn1.disabled = true;
    btn2.disabled = true;

    currentQuestion = nextIndex;
    const q = questions[currentQuestion];

    // Sonido de clic
    clickSound.play();

    // Efecto de desaparición
    questionText.classList.remove("fade-in");
    questionImg.classList.remove("fade-in");
    questionNumber.classList.remove("fade-in");

    setTimeout(() => {
        // Cambia la pregunta después de un pequeño delay
        questionNumber.textContent = `Pregunta ${q.number}`;
        questionText.textContent = q.text;
        questionImg.src = q.img;
        btn1.textContent = q.btn1;
        btn2.textContent = q.btn2;

        // Reactiva botones con un pequeño retraso para evitar doble clic
        setTimeout(() => {
            isTransitioning = false;
            btn1.disabled = false;
            btn2.disabled = false;
        }, 300); // Evita que se salten preguntas

        // Efecto de reaparición
        questionText.classList.add("fade-in");
        questionImg.classList.add("fade-in");
        questionNumber.classList.add("fade-in");
    }, 200); // Pequeño retraso para la animación

    // Asignar nuevas funciones a los botones
    btn1.onclick = () => changeQuestion(q.next1);
    btn2.onclick = () => changeQuestion(q.next2);
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);
