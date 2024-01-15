// Träffa submit knapp
let submitBtn = document.querySelector("#submitAnswersBtn");

let selectedAnswersValue = [];
let scores;
let resultTable;
let currentQuestionIndex = 1;

const container = document.querySelector('.container');

// declaring an array of correct answers
let correctAnswers = [
    { question: "Question1", correctAnswer: "b" },
    { question: "Question2", correctAnswer: "b" },
    { question: "Question3", correctAnswer: ["a", "b"] },
    { question: "Question4", correctAnswer: "a" },
    { question: "Question5", correctAnswer: "b" },
    { question: "Question6", correctAnswer: ["a", "b"] },
    { question: "Question7", correctAnswer: "b" },
    { question: "Question8", correctAnswer: "a" },
    { question: "Question9", correctAnswer: "b" },
    { question: "Question10", correctAnswer: "b" },
];

// make a function to compare arrays of user answers and correct answers
const compareUserAnsVsCorrectAns = (userAnswers, correctAnswers) => {
    scores = 0;

    // compare userAnswers with correctedAnswers
    userAnswers.forEach((userAnswer, index) => {
        // check if the answer property of the userAnswer object is an array.
        if (Array.isArray(userAnswer.answer)) {
            // multiple-choice compare

            // checks if the length of the user's answer array  equal to the correct answer array for a  question.
            let isCorrect =
                userAnswer.answer.length === correctAnswers[index].correctAnswer.length &&
                userAnswer.answer.every(ans => correctAnswers[index].correctAnswer.includes(ans));

            if (isCorrect) {
                scores++;
            }
        } else {
            // compare single choice
            if (userAnswer.answer === correctAnswers[index].correctAnswer) {
                scores++;
            }
        }
    });

    // Return the results
    return {
        scores: scores,
    };
};

// Function to show the current question
const showCurrentQuestion = () => {
    document.querySelectorAll('.question-container').forEach((question, index) => {
        question.style.display = index + 1 === currentQuestionIndex ? 'block' : 'none';
    });
};

// Träffa next question knapp
let nextQuestionBtn = document.querySelector("#nextQuestionBtn");

nextQuestionBtn.addEventListener("click", () => {
    // Hide the current question
    document.getElementById(`question${currentQuestionIndex}`).style.display = 'none';

    // Move to the next question
    currentQuestionIndex++;

    // If all questions are answered, show the submit button
    if (currentQuestionIndex > 10) {
        nextQuestionBtn.style.display = 'none';
        document.querySelector("#submitAnswersBtn").style.display = 'block';
    } else {
        // Show the next question
        showCurrentQuestion();
    }
});

// Initialize by showing the first question
showCurrentQuestion();

submitBtn.addEventListener("click", () => {
    selectedAnswersValue = [];

    // Get value from user answers
    for (let i = 1; i <= 10; i++) {
        const selectedAnswer = document.querySelector(`[name='q${i}']:checked`);
        if (selectedAnswer) {
            selectedAnswersValue.push(selectedAnswer.value);
        }
    }

    // make an array of users input
    let userAnswers = selectedAnswersValue.map((answer, index) => {
        return { question: `Question${index + 1}`, answer };
    });

    let questionResults = compareUserAnsVsCorrectAns(userAnswers, correctAnswers);

    // Function to display results
    const displayResults = (questionResults) => {
        // Create a table for questions and answers
        resultTable = document.createElement("table");
        resultTable.classList.add("result-table");

        for (let index = 0; index < userAnswers.length; index++) {
            const question = correctAnswers[index].question;
            const answer = userAnswers[index].answer;

            // Create a row for the question and answer
            const row = resultTable.insertRow();
            const questionCell = row.insertCell(0);
            const answerCell = row.insertCell(1);

            // Add question and answer
            questionCell.textContent = ` ${index + 1}: ${question}`;
            answerCell.textContent = ` ${answer}`;

            // Change the color based on correctness
            if (
                Array.isArray(userAnswers[index].answer)
                    ? userAnswers[index].answer.length ===
                      correctAnswers[index].correctAnswer.length &&
                      userAnswers[index].answer.every((ans) =>
                          correctAnswers[index].correctAnswer.includes(ans)
                      )
                    : userAnswers[index].answer === correctAnswers[index].correctAnswer
            ) {
                answerCell.style.color = "green";
            } else {
                answerCell.style.color = "red";
            }
        }

        container.appendChild(resultTable);
    };

    // Hide questions
    document.querySelectorAll('.question-container').forEach(question => {
        question.style.display = 'none';
    });

    // Hide submit button
    submitBtn.style.display = "none";

    // Hide title
    let title = document.querySelector('h1');
    title.style.display = "none";

    // Calculate the percentage of correct answers
    const percentage = (questionResults.scores / correctAnswers.length) * 100;

    // Display the user's score
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.textContent = `Ditt resultat: ${questionResults.scores} av ${correctAnswers.length} rätt (${percentage}%)`;

    // different colors based on the percentage
    if (percentage < 50) {
        scoreContainer.style.color = 'red';
        scoreContainer.style.fontWeight = 'bold';
    } else if (percentage >= 50 && percentage <= 75) {
        scoreContainer.style.color = 'orange';
        scoreContainer.style.fontWeight = 'bold';
    } else {
        scoreContainer.style.color = 'green';
        scoreContainer.style.fontWeight = 'bold';
    }

    // Display results
    displayResults(questionResults);
});

let changeModeBtn = document.querySelector("#changeModeBtn");
let changeModeImage = document.querySelector("#modImg");
let isDarkMode = false;

changeModeBtn.addEventListener("click", () => {
  // Toggle between light and dark mode
  isDarkMode = !isDarkMode;

  document.body.classList.toggle('dark-mode', isDarkMode);

  // Change the image source based on mode
  changeModeImage.src = isDarkMode ? "light (1).png" : "moon.png";
  changeModeImage.alt = isDarkMode ? "" : "Light Mode Image";
});



let carElement = document.querySelector('.car');
carElement.classList.add('animation');