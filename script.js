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

let score = 0;
let currentQuestionIndex = 0;

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    options.forEach(option => {
        option.style.display = "inline-block";
        option.nextElementSibling.style.display = "inline-block";
    });
    // delete restart button
    if (restartButton) {
        restartButton.remove();
        nextButton.style.display = 'block';
    }
    loadQuestion();
}


function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestionIndex >= questions.length) {
        questionText.textContent = "Your Final Score is:" + score + "/" + questions.length;
        if (score >= 8) {
            questionText.textContent += " Outstanding performance! You truly know your country's history";
        } else if (score >= 5) {
            questionText.textContent += " Well done! You have a solid understanding of Ethiopian history";
        } else {
            questionText.textContent += " Keep learning and try again — before you go.";
        }
        questionText.style.fontSize = "24px";
        options.forEach(option => {
            option.style.display = "none";
            option.nextElementSibling.style.display = "none";
        });
        nextButton.style.display = "none";
        restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.classList.add("restart-btn");
        restartButton.classList.add("button");
        restartButton.addEventListener("click", restartQuiz);
        document.querySelector(".question").appendChild(restartButton);
        return;
    }


    questionText.textContent = currentQuestion.question;
    scoreText.textContent = "Score: " + Number(score) + "/" + (currentQuestionIndex + 1);
    questionNumberText.textContent = "Question " + (currentQuestionIndex + 1);
    options.forEach((option, index) => {
        option.checked = false;
        option.nextElementSibling.textContent = currentQuestion.answers[index].text;
    });
    currentQuestionIndex++;
}



function startQuiz() {

    loadQuestion();

    // hide start button
    startButton.style.display = 'none';
    nextButton.style.display = 'block';
}


options.forEach((option,index)=>{
    option.addEventListener("change",()=>{
        if (questions[currentQuestionIndex - 1].answers[index].correct) {
            score++;
            scoreText.textContent = "Score: " + score + "/" + (currentQuestionIndex )
        }
        
    })
})


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', loadQuestion);