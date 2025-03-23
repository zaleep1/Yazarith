const questionText = document.getElementById("question-text");
const questionImg = document.getElementById("question-img");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const finalImg = document.getElementById("final-img");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// 📌 Lista de preguntas con sus imágenes y respuestas
const questions = [
    {
        text: "Hola",
        img: "assets/inicio.png",
        btn1: { text: "Hola", next: 2 },
        btn2: { text: "Adiós", next: 1 }
    },
    {
        text: "Ya no me quieres...",
        img: "assets/2.png",
        btn1: { text: "Sí te quiero", next: 3 },
        btn2: { text: "No es eso...", next: 3 }
    },
    {
        text: "¿Como estas el día de hoy?",
        img: "assets/3.png",
        btn1: { text: "Bien", next: 4 },
        btn2: { text: "Mal", next: 4 }
    },
    {
        text: "Sabía que dirías eso 💖",
        img: "assets/final.png",
        btn1: { text: "Reiniciar", next: 0 },
        btn2: { text: "", next: null } // No hace nada
    }
];

let currentQuestion = 0;

// 📌 Función para actualizar la pregunta
function updateQuestion() {
    const q = questions[currentQuestion];

    // Actualiza el texto y la imagen
    questionText.textContent = q.text;
    questionImg.src = q.img;

    // Botón 1
    btn1.textContent = q.btn1.text;
    btn1.onclick = () => {
        if (q.btn1.next !== null) {
            currentQuestion = q.btn1.next;
            updateQuestion();
        }
    };

    // Botón 2
    if (q.btn2.text === "") {
        btn2.style.display = "none"; // Oculta el botón si no hay respuesta
    } else {
        btn2.style.display = "inline-block";
        btn2.textContent = q.btn2.text;
        btn2.onclick = () => {
            if (q.btn2.next !== null) {
                currentQuestion = q.btn2.next;
                updateQuestion();
            }
        };
    }
}

// 📌 Iniciar con la primera pregunta
updateQuestion();

