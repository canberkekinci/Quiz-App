const questions = [
    {
        question: "Dünya üzerindeki en tatlı kişi kimdir?",
        answers: [
            {text: "Dila", correct: true},
            {text: "Canberk", correct: false},
            {text: "Klay Thompson", correct: false},
            {text: "Öyle birisi yok", correct: false},
        ]
    },
    {
        question: "Canberk'in Dila hanıma söylemeyi en çok sevdiği kelime hangisidir?",
        answers: [
            {text: "şapşik", correct: false},
            {text: "aptal", correct: false},
            {text: "boruto", correct: false},
            {text: "hanımefendi", correct: true},
        ]
    },
    {
        question: "Dila hanım neden çok tatlıdır?",
        answers: [
            {text: "Tatlı filan değilki", correct: false},
            {text: "bebekken bala batırmışlar", correct: true},
            {text: "bilmem", correct: false},
        ]
    },
    {
        question: "Canberk'in en sevdigi ödül?",
        answers: [
            {text: "Dila ile birlikte vakit geçirmek", correct: true},
        ]
    },
    {
        question: "Dila iyi ki var mı?",
        answers: [
            {text: "evet", correct: true},
            {text: "evet", correct: true},
        ]
    },
    {
        question: "EN ÖNEMLİ SORU",
        answers: [
            {text: "Dila", correct: true},
            {text: "Boruto", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedAnswer = event.target;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    if(isCorrect) {
        selectedAnswer.classList.add("correct");
        score++;
    }
    else {
        selectedAnswer.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `${score}/${questions.length} yaptın şapşik MÜKEMMELSİNNN`;
    nextButton.innerHTML = "tekrar?";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();