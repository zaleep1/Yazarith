let questions = [
    { text: "Esta bien", image: "", left: "", right: "", nextLeft: null, nextRight: null, autoNext: 5 },
    { text: "Hola", image: "assets/hola.png", left: "Hola", right: "Adios", nextLeft: 3, nextRight: 2 },
    { text: "Ya no me quieles", image: "assets/triste.png", left: "", right: "", nextLeft: null, nextRight: null },
    { text: "¿Cómo te sientes el día de hoy?", image: "assets/dia.png", left: "Bien", right: "Mal", nextLeft: 5, nextRight: 4 },
    { text: "Recuerda que estoy aquí para ti y si necesitas podrías decirme el por qué", image: "assets/apoyo.png", left: "Está bien, lo haré", right: "Lo pensaré", nextLeft: 5, nextRight: 0 },
    { text: "¿Cómo te ves el día de hoy?", image: "assets/autoestima.png", left: "Linda", right: "Fea", nextLeft: 6, nextRight: null }
];

let questionElement = document.getElementById("question");
let questionImage = document.getElementById("question-image");
let leftButton = document.getElementById("left-button");
let rightButton = document.getElementById("right-button");
let clickSound = document.getElementById("click-sound");

function nextQuestion(index) {
    let q = questions[index];

    questionElement.innerText = q.text;
    questionImage.src = q.image;
    leftButton.innerText = q.left || "";
    rightButton.innerText = q.right || "";
    leftButton.onclick = q.nextLeft !== null ? () => nextQuestion(q.nextLeft) : null;
    rightButton.onclick = q.nextRight !== null ? () => nextQuestion(q.nextRight) : null;

    leftButton.style.display = q.left ? "inline-block" : "none";
    rightButton.style.display = q.right ? "inline-block" : "none";

    clickSound.play();

    if (index === 5) {
        document.body.innerHTML += '<div class="fullscreen-block"></div>';
    }

    if (index === 0) {
        setTimeout(() => nextQuestion(5), 5000);
    }
}



// ---- Código del Corazón ----
let e = [], h = [], O = c.width = innerWidth, Q = c.height = innerHeight;
let v = 32, M = Math, R = M.random, C = M.cos, Y = 6.3;

for (let i = 0; i < Y; i += .2) {
    h.push([O / 2 + 180 * M.pow(M.sin(i), 3), Q / 2 + 10 * (-(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)))]);
}

for (let i = 0; i < v; i++) {
    let x = R() * O, y = R() * Q, H = i / v * 80 + 280, S = R() * 40 + 60, B = R() * 60 + 20;
    let f = [];
    
    for (let k = 0; k < v; k++) {
        f[k] = { x, y, X: 0, Y: 0, R: (1 - k / v) + 1, S: R() + 1, q: ~~(R() * v), D: i % 2 * 2 - 1, F: R() * .2 + .7, f: `hsla(${~~H},${~~S}%,${~~B}%,.1)` };
    }
    e[i] = f;
}

function render(_) {
    let a = c.getContext('2d');
    a.fillStyle = _.f;
    a.beginPath();
    a.arc(_.x, _.y, _.R, 0, Y, 1);
    a.closePath();
    a.fill();
}

function loop() {
    let a = c.getContext('2d');
    a.fillStyle = "rgba(0,0,0,.2)";
    a.fillRect(0, 0, O, Q);

    for (let i = 0; i < v; i++) {
        let f = e[i], u = f[0], q = h[u.q], D = u.x - q[0], E = u.y - q[1], G = M.sqrt((D * D) + (E * E));

        if (G < 10) {
            if (R() > .95) u.q = ~~(R() * v);
            else {
                if (R() > .99) u.D *= -1;
                u.q += u.D;
                u.q %= v;
                if (u.q < 0) u.q += v;
            }
        }

        u.X += -D / G * u.S;
        u.Y += -E / G * u.S;
        u.x += u.X;
        u.y += u.Y;

        render(u);

        u.X *= u.F;
        u.Y *= u.F;

        for (let k = 0; k < v - 1; k++) {
            let T = f[k], N = f[k + 1];
            N.x -= (N.x - T.x) * .7;
            N.y -= (N.y - T.y) * .7;
            render(N);
        }
    }
    requestAnimationFrame(loop);
}
loop();
