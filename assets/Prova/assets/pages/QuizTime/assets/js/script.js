import { questions } from "./question.js";

const questionContainer = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const spn_qts = document.querySelector(".spn-qts");
const textFinish = document.querySelector(".finish span");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".btnRestart");

let currentIndex = 0;
let questionCorrect = 0;

btnRestart.onclick = () => {
    questionContainer.style.display = "flex";
    answersContainer.style.display = "block";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionCorrect = 0;
    loadQuestion();
}

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
        questionCorrect++;
    }
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finish();
        questionContainer.style.display = "none";
    }
}

function finish() {
    if (questionCorrect === questions.length) {
        textFinish.innerHTML = `Parabéns! Você acertou todas as ${questions.length} questões!`;
    } else {
        textFinish.innerHTML = `Você acertou ${questionCorrect} de ${questions.length} questões.`;
    }
    questionContainer.style.display = "none";
    answersContainer.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spn_qts.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answersContainer.innerHTML = "";
    questionContainer.innerHTML = item.question;

    item.answers.forEach((answer, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<button class="answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>`;
        answersContainer.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((button) => {
        button.addEventListener("click", nextQuestion);
    });
}

loadQuestion();
