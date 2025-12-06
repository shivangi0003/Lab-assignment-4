
const fullQuestions = [
    {
        question: "currency of Japan?",
        options: ["Yen", "Dollar", "Euro", "Peso"],
        answer: 0
    },
    {
        question: "largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "author of '1984'?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "J.K. Rowling"],
        answer: 1
    },
    {
        question: "chemical symbol for gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        answer: 1
    },
    {
        question: "smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    },
    {
        question: "hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        answer: 2
    },
    {
        question: "fastest land animal?",
        options: ["Cheetah", "Lion", "Tiger", "Leopard"],
        answer: 0
    }
];

// Use the first 7 questions as per the requirement in the comment
const questions = fullQuestions.slice(0, 7);
const gameContainer = document.getElementById('game-container');
const resultsElement = document.getElementById('results');
const submitButton = document.getElementById('submit-quiz');

function renderQuiz() {
    questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <h3>${index + 1}. ${q.question}</h3>
            <div class="options" id="q-${index}">
                ${q.options.map((option, optIndex) => `
                    <button data-q-index="${index}" data-opt-index="${optIndex}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
        gameContainer.appendChild(card);
    });

    submitButton.style.display = 'block';
    
    gameContainer.querySelectorAll('.options button').forEach(button => {
        button.addEventListener('click', handleOptionClick);
    });
}

let userAnswers = Array(questions.length).fill(null);

function handleOptionClick(event) {
    const clickedButton = event.target;
    const qIndex = parseInt(clickedButton.getAttribute('data-q-index'));
    const optIndex = parseInt(clickedButton.getAttribute('data-opt-index'));

    userAnswers[qIndex] = optIndex;

    const optionsDiv = document.getElementById(`q-${qIndex}`);
    optionsDiv.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });
    clickedButton.classList.add('correct');
}

function handleSubmit() {
    let score = 0;
    

    gameContainer.querySelectorAll('.options button').forEach(btn => btn.disabled = true);
    submitButton.disabled = true;

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const optionsDiv = document.getElementById(`q-${index}`);

    
        optionsDiv.querySelectorAll('button').forEach(btn => btn.classList.remove('correct'));

        if (userAnswer === q.answer) {
            score++;
          
            optionsDiv.querySelector(`button[data-opt-index="${userAnswer}"]`).classList.add('correct');
        } else {
        
            if (userAnswer !== null) {
                optionsDiv.querySelector(`button[data-opt-index="${userAnswer}"]`).classList.add('incorrect');
            }
           
            optionsDiv.querySelector(`button[data-opt-index="${q.answer}"]`).classList.add('correct');
        }
    });

    resultsElement.textContent = `Quiz Finished! Your score is ${score} out of ${questions.length}.`;
    resultsElement.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    submitButton.addEventListener('click', handleSubmit);
});