const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Lista de preguntas con imágenes y número de pregunta
const questions = [
    { number: 1, text: "Hola", img: "assets/inicio.png", btn1: "Hola", btn2: "Adiós", next1: 2, next2: 1, isTroll: false }, 
    { number: 2, text: "Ya no me quieres...", img: "assets/triste.png", btn1: "Sí te quiero", btn2: "No 😢", next1: 2, next2: 0, isTroll: false },
    { number: 3, text: "¿Cómo andas el día de hoy?", img: "assets/2.png", btn1: "Bien", btn2: "Mal", next1: 10, next2: 3, isTroll: false },
    { number: 4, text: "Recuerda que estoy aquí para ti y puedes contarme el por qué", img: "assets/5s.png", btn1: "Está bien, lo haré", btn2: "Lo pensaré", next1: 10, next2: 10, isTroll: false },
    { number: 5, text: "¿Cómo te ves el día de hoy?", img: "assets/4.png", btn1: "Linda", btn2: "Fea", next1: 5, next2: null, isTroll: true },
    { number: 6, text: "Como siempre 💖", img: "assets/5.png", btn1: "💖", btn2: "🖕", next1: 6, next2: 6, isTroll: false },
    { number: 7, text: "¿Y al final si gustas ir a cine?", img: "assets/5s.png", btn1: "Si", btn2: "No tengo tiempo", next1: 7, next2: 8, isTroll: false },
    { number: 8, text: "Esta bien, espero tu mensaje 😺", img: "assets/2.png", btn1: "", btn2: "", next1: 9, next2: 9, isTroll: false, isMiniMsg: true },
    { number: 9, text: "Vale, entiendo 😔", img: "assets/triste.png", btn1: "", btn2: "", next1: 9, next2: 9, isTroll: false, isMiniMsg: true },
    { number: 10, text: "Espero que tengas un lindo día", img: "assets/final.png", btn1: "Dale", btn2: "No", next1: null, next2: null, isTroll: true },
    { number: 11, text: "¿Si fuiste a misa hoy?", img: "assets/4.png", btn1: "Si", btn2: "No", next1: 10, next2: 11, isTroll: false },
    { number: 12, text: "MalMal", img: "assets/triste.png", btn1: "", btn2: "", next1: 4, next2: 4, isTroll: false, isMiniMsg: true },
    { number: 13, text: "Eso espero", img: "assets/5s.png", btn1: "", btn2: "", next1: 4, next2: 4, isTroll: false, isMiniMsg: true }
];

// Estado actual
let currentQuestion = 0;
let isTransitioning = false;

// Guardar la posición original de los botones
const btn1OriginalPosition = { left: btn1.offsetLeft, top: btn1.offsetTop };
const btn2OriginalPosition = { left: btn2.offsetLeft, top: btn2.offsetTop };

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

    setTimeout(() => {
        questionText.textContent = q.text;
        questionImg.src = q.img;
        btn1.textContent = q.btn1;
        btn2.textContent = q.btn2;

        resetButtonPosition(btn1, btn1OriginalPosition);
        resetButtonPosition(btn2, btn2OriginalPosition);

        setTimeout(() => {
            isTransitioning = false;
            btn1.disabled = false;
            btn2.disabled = false;
        }, 300);

        questionText.classList.add("fade-in");
        questionImg.classList.add("fade-in");

        // Si es un mini mensaje, cambiar automáticamente después de 5 segundos
        if (q.isMiniMsg) {
            setTimeout(() => {
                if (currentQuestion === nextIndex) {
                    changeQuestion(q.next1);
                }
            }, 5000);
        }
    }, 200);

    btn1.onclick = () => {
        if (questions[currentQuestion].number === 10) { // Verifica si es la pregunta 10
            window.location.href = "https://zaleep1.github.io/Yazarith/function-heart.html";
        } else {
            changeQuestion(questions[currentQuestion].next1);
        }
    };
    
    btn2.onclick = () => {
        if (q.isTroll) {
            moveButtonRandomly(btn2);
        } else {
            changeQuestion(q.next2);
        }
    };
}

// Función para mover el botón aleatoriamente SOLO en preguntas troll
function moveButtonRandomly(button) {
    button.style.position = "absolute"; // Hacer que se mueva
    const maxX = window.innerWidth - button.clientWidth - 20;
    const maxY = window.innerHeight - button.clientHeight - 20;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

// Función para reiniciar la posición de los botones
function resetButtonPosition(button, originalPosition) {
    if (button === btn2) {
        button.style.position = "static"; // Restablece la distribución normal
    }
    button.style.left = "";
    button.style.top = "";
}

// Iniciar la primera pregunta
btn1.onclick = () => changeQuestion(questions[0].next1);
btn2.onclick = () => changeQuestion(questions[0].next2);

