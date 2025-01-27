const questions = [
    {
        question: "Cual es el animal terrestre mas grande del mundo:",
        answers:[
            {text: "Elefante", correct: true},
            {text: "Jirafa", correct: false},
            {text: "Ballena", correct: false},
            {text: "Anaconda", correct: false}
        ]
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers:[
            {text: "Júpiter", correct: true},
            {text: "Saturno", correct: false},
            {text: "Marte", correct: false},
            {text: "Neptuno", correct: false}
        ]
    },
    {
        question: "¿Quién pintó la Mona Lisa?",
        answers:[
            {text: "Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Vincent van Gogh", correct: false},
            {text: "Claude Monet", correct: false}
        ]
    },
    {
        question: "¿Cuál es el océano más grande del mundo?",
        answers:[
            {text: "Océano Pacífico", correct: true},
            {text: "Océano Atlántico", correct: false},
            {text: "Océano Índico", correct: false},
            {text: "Océano Ártico", correct: false}
        ]
    },
    {
        question: "¿Cuál es el metal más abundante en la corteza terrestre?",
        answers:[
            {text: "Aluminio", correct: true},
            {text: "Hierro", correct: false},
            {text: "Cobre", correct: false},
            {text: "Oro", correct: false}
        ]
    },
    {
        question: "¿En qué año llegó el hombre a la Luna?",
        answers:[
            {text: "1969", correct: true},
            {text: "1955", correct: false},
            {text: "1975", correct: false},
            {text: "1980", correct: false}
        ]
    },
    {
        question: "¿Cuál es la capital de Australia?",
        answers:[
            {text: "Canberra", correct: true},
            {text: "Sídney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Brisbane", correct: false}
        ]
    },
    {
        question: "¿Cuál es el hueso más largo del cuerpo humano?",
        answers:[
            {text: "Fémur", correct: true},
            {text: "Húmero", correct: false},
            {text: "Radio", correct: false},
            {text: "Tibia", correct: false}
        ]
    },
    {
        question: "¿Cuántos corazones tiene un pulpo?",
        answers:[
            {text: "Tres", correct: true},
            {text: "Uno", correct: false},
            {text: "Dos", correct: false},
            {text: "Cuatro", correct: false}
        ]
    },
    {
        question: "¿Cuál es el país más grande del mundo por superficie?",
        answers:[
            {text: "Rusia", correct: true},
            {text: "Canadá", correct: false},
            {text: "China", correct: false},
            {text: "Estados Unidos", correct: false}
        ]
    }
];

const questionElement = document.querySelector('#question');
const answerButton = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    // currentQuestionIndex es un número que indica la posición actual dentro del array.
    let currentQuestion = questions[currentQuestionIndex];
    // Así que questionNo se usa para mostrar el número de pregunta de forma más intuitiva (1, 2, 3... en lugar de 0, 1, 2...).
    let questionNo = currentQuestionIndex + 1;
    // Se concatena questionNo + ". " + currentQuestion.question, lo que significa que se mostrará algo como:
    //1. ¿Cuál es la capital de Francia?
    //2. ¿Cuánto es 2 + 2?
    //3. ¿Qué color tiene el cielo?
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.text
        button.classList.add("btn");
        answerButton.appendChild(button)
        if (element.correct) {
            button.dataset.correct = element.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(element => {
        if (element.dataset.correct === "true") {
            element.classList.add("correct")
        }
        element.disabled = true
    });
    nextButton.style.display = "block"; // el boton aparece después de responder

}

function showScore(params) {
    resetState();
    questionElement.innerHTML = `Tu puntuación ${score} de ${questions.length} preguntas`
    nextButton.innerHTML = "Jugar Otra vez";
    nextButton.style.display = "block"

}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    }else{
        showScore()
    }
}

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        }else{
            startQuiz();
        }
    } )
startQuiz()
