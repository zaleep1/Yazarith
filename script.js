const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const questionNumber = document.getElementById("question-number"); // Nuevo elemento
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Lista de preguntas con imágenes y número de pregunta
const questions = [
    { number: 1, text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1 },
    { number: 2, text: "Ya no me quieres...", img: "assets/final.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 3, next2: 1 },
    { number: 3, text: "¿Cómo andas el día de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 5, next2: 4 },
    { number: 4, text: "Recuerda que estoy aquí para ti y puedes contarme el por qué", img: "assets/triste.png", btn1: "Está bien, lo haré", btn2: "Lo pensaré", next1: 5, next2: 5 },
    { number: 5, text: "¿Cómo te ves el día de hoy?", img: "assets/3.png", btn1: "Linda", btn2: "Fea", next1: 6, next2: 5 },
    { number: 6, text: "Como siempre 💖", img: "assets/triste.png", btn1: "Qué lindo", btn2: "Adiós", next1: 0, next2: null }
];

// Estado actual
let currentQuestion = 0;

// Función para cambiar la pregunta
function changeQuestion(nextIndex) {
    if (nextIndex === null) return; // Si es null, termina el juego

    currentQuestion = nextIndex;
    const q = questions[currentQuestion];

    // Sonido de clic
    clickSound.play();

    // Efecto de aparición
    questionText.classList.remove("fade-in");
    questionImg.classList.remove("fade-in");
    questionNumber.classList.remove("fade-in");
    
    setTimeout(() => {
        questionNumber.textContent = `Pregunta ${q.number}`; // Actualiza número de pregunta
        questionText.textContent = q.text;
        questionImg.src = q.img;
        btn1.textContent = q.btn1;
        btn2.textContent = q.btn2;
        
        questionText.classList.add("fade-in");
        questionImg.classList.add("fade-in");
        questionNumber.classList.add("fade-in");
    }, 100); // Pequeño retraso para reiniciar animación

    // Asignar nuevas funciones a los botones
    btn1.onclick = () => changeQuestion(q.next1);
    btn2.onclick = () => changeQuestion(q.next2);
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);

