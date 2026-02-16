const questions = [
  {
    question: "Who defeated Italy at the Battle of Adwa in 1896?",
    answers: [
      { text: "Emperor Tewodros II", correct: false },
      { text: "Emperor Yohannes IV", correct: false },
      { text: "Emperor Menelik II", correct: true },
      { text: "Emperor Haile Selassie", correct: false }
    ]
  },
  {
    question: "In which year did the Battle of Adwa take place?",
    answers: [
      { text: "1889", correct: false },
      { text: "1896", correct: true },
      { text: "1901", correct: false },
      { text: "1935", correct: false }
    ]
  },
  {
    question: "Which emperor was crowned in 1930 and later went into exile during the Italian invasion?",
    answers: [
      { text: "Emperor Menelik II", correct: false },
      { text: "Emperor Haile Selassie", correct: true },
      { text: "Emperor Tewodros II", correct: false },
      { text: "Lij Iyasu", correct: false }
    ]
  },
  {
    question: "What ancient kingdom ruled northern Ethiopia around the first millennium AD?",
    answers: [
      { text: "Zagwe Kingdom", correct: false },
      { text: "Axumite Kingdom", correct: true },
      { text: "Gondarine Kingdom", correct: false },
      { text: "Shewan Kingdom", correct: false }
    ]
  },
  {
    question: "Which legendary Ethiopian king is traditionally associated with the Queen of Sheba?",
    answers: [
      { text: "King Ezana", correct: false },
      { text: "King Lalibela", correct: false },
      { text: "Menelik I", correct: true },
      { text: "Emperor Susenyos", correct: false }
    ]
  },
  {
    question: "Which dynasty built the rock-hewn churches of Lalibela?",
    answers: [
      { text: "Solomonic Dynasty", correct: false },
      { text: "Zagwe Dynasty", correct: true },
      { text: "Axumite Dynasty", correct: false },
      { text: "Gondarine Dynasty", correct: false }
    ]
  },
  {
    question: "What was Emperor Tewodros II known for?",
    answers: [
      { text: "Attempting to modernize Ethiopia", correct: true },
      { text: "Building Lalibela churches", correct: false },
      { text: "Signing the Treaty of Wuchale", correct: false },
      { text: "Defeating Italy at Adwa", correct: false }
    ]
  },
  {
    question: "Which treaty led to the First Italo-Ethiopian War due to differences in interpretation?",
    answers: [
      { text: "Treaty of Versailles", correct: false },
      { text: "Treaty of Wuchale", correct: true },
      { text: "Treaty of Addis Ababa", correct: false },
      { text: "Treaty of Gondar", correct: false }
    ]
  },
  {
    question: "Which king converted the Axumite Kingdom to Christianity in the 4th century?",
    answers: [
      { text: "King Lalibela", correct: false },
      { text: "King Ezana", correct: true },
      { text: "Menelik II", correct: false },
      { text: "Yohannes IV", correct: false }
    ]
  },
  {
    question: "In which year was the Derg regime overthrown?",
    answers: [
      { text: "1974", correct: false },
      { text: "1987", correct: false },
      { text: "1991", correct: true },
      { text: "2000", correct: false }
    ]
  }
];

const questionText = document.querySelector('.question-text');
const options = document.querySelectorAll('.options input');
const nextButton = document.querySelector('.next-btn');
const scoreText = document.querySelector('.score');
const questionNumberText = document.querySelector('.question-number');
const startButton = document.querySelector('.start-quiz');
const feedbackText = document.querySelector('.feedback');

let score = 0;
let currentQuestionIndex = 0;
let answered = false;
let restartButton;

function loadQuestion() {

  if (currentQuestionIndex >= questions.length) {
    showFinalScore();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  answered = false;
  feedbackText.textContent = "";

  questionText.style.fontSize = "18px";
  questionText.textContent = currentQuestion.question;

  questionNumberText.textContent = 
    "Question " + (currentQuestionIndex + 1);

  scoreText.textContent = 
    "Score: " + score + "/" + currentQuestionIndex;

  options.forEach((option, index) => {
    option.checked = false;
    option.disabled = false;
    option.style.display = "inline-block";
    option.nextElementSibling.style.display = "inline-block";
    option.nextElementSibling.style.color = "black";
    option.nextElementSibling.textContent =
      currentQuestion.answers[index].text;
  });

  nextButton.style.display = "block";

  currentQuestionIndex++;
}

function showFinalScore() {

  questionText.style.fontSize = "24px";
  questionText.textContent =
    "Your Final Score is: " + score + "/" + questions.length;

  if (score >= 8) {
    questionText.textContent += 
      " Outstanding performance! You truly know Ethiopian history 🇪🇹";
  } else if (score >= 5) {
    questionText.textContent += 
      " Well done! You have a solid understanding.";
  } else {
    questionText.textContent += 
      " Keep learning and try again.";
  }

  feedbackText.textContent = "";

  options.forEach(option => {
    option.style.display = "none";
    option.nextElementSibling.style.display = "none";
  });

  nextButton.style.display = "none";

  restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.classList.add("button");
  restartButton.addEventListener("click", restartQuiz);

  document.querySelector(".question")
    .appendChild(restartButton);
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;

  restartButton.remove();

  loadQuestion();
}

options.forEach((option, index) => {
  option.addEventListener("change", () => {

    if (answered) return;

    answered = true;

    const currentAnswers =
      questions[currentQuestionIndex - 1].answers;

    if (currentAnswers[index].correct) {
      score++;
      feedbackText.textContent =
        "Correct! 👏 Great choice!";
      feedbackText.className =
        "feedback correct";
    } else {
      feedbackText.textContent =
        "Wrong answer ❌";
      feedbackText.className =
        "feedback wrong";

      currentAnswers.forEach((ans, i) => {
        if (ans.correct) {
          options[i].nextElementSibling
            .style.color = "green";
        }
      });
    }

    scoreText.textContent =
      "Score: " + score + "/" + currentQuestionIndex;

    options.forEach(opt => opt.disabled = true);
  });
});

function startQuiz() {
  startButton.style.display = "none";
  loadQuestion();
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", loadQuestion);
