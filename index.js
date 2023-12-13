

//Träffa submit knapp
let submitBtn = document.querySelector("#submitAnswersBtn");


let selectedAnswersQue3Value=[]; 
let results=[];
let correctResult ;
let incorrectResult ;
let scores;
let resultTable;


//declaring an array of correct answers
let correctAnswers=[
  { question: "Question1", correctAnswer: "yes" },
  { question: "Question2", correctAnswer: "30" },
  { question: "Question3",  correctAnswer: ["option1", "option2"] } ,
  { question: "Question4", correctAnswer: "yes" },
  { question: "Question5", correctAnswer: "30" },
  { question: "Question6",  correctAnswer: ["option1", "option2"] } ,
  { question: "Question7", correctAnswer: "yes" },
  { question: "Question8", correctAnswer: "no" },
  { question: "Question9", correctAnswer: "yes" },
  { question: "Question10", correctAnswer: "no" },
]

   //make a function to compare arrays of useranswers and correctanswers 
   const CompareUserAnsVsCorrectAns = (userAnswers, correctAnswers)=>{
     correctResult = [];
     incorrectResult = [];
     scores=0;

     //compare userAnswers with correctedAnswers
     userAnswers.forEach((userAnswer, index) => {
      //check if the answer property of the userAnswer object is an array.
      if (Array.isArray(userAnswer.answer))
       {
          // multiple-choice compare

  //checks if the length of the user's answer array  equal to  the correct answer array for a  question.
          let isCorrect = userAnswer.answer.length === correctAnswers[index].correctAnswer.length &&
                          userAnswer.answer.every(ans => correctAnswers[index].correctAnswer.includes(ans));

          if (isCorrect) {
              scores++;
              correctResult.push(`Fråga ${index + 1} är korrekt!`);
             
             
          } else {
              incorrectResult.push(`Fråga ${index + 1} är fel!`);
          }
      } else {
          // compare singel choice
          if (userAnswer.answer === correctAnswers[index].correctAnswer) {
              scores++;
              correctResult.push(`Fråga ${index + 1} är korrekt!`);
          } else {
            
              incorrectResult.push(`Fråga ${index + 1} är fel!`);

          }
      }
    });

    // Return the results

    return {
      scores: scores,
      correctResult: correctResult,
      incorrectResult: incorrectResult,

    };
  };



submitBtn.addEventListener("click", () =>{

  selectedAnswersQue3Value=[];

    //1-Get value from users answers

    let SelectedAnserwQue1=document.querySelector("[name='firstQu']:checked").value;
    let SelectedAnswerQue2 = document.querySelector("[name='secondQue']:checked").value;
    let selectedAnswersQue3=document.querySelectorAll("[name='multiQueThree']:checked");
    selectedAnswersQue3.forEach((checkbox)=>{
       selectedAnswersQue3Value.push(checkbox.value);
     });
    let SelectedAnserwQue7= document.querySelector("[name='seventhQu']:checked").value;
    let SelectedAnserwQue8= document.querySelector("[name='eighthQu']:checked").value;
    let SelectedAnserwQue9= document.querySelector("[name='ninthQu']:checked").value;
    let SelectedAnserwQue10= document.querySelector("[name='tenthhQu']:checked").value;
     /// make an array of users input 

    let userAnswers = [
        { question: "Question1", answer: SelectedAnserwQue1 },
        { question: "Question2", answer: SelectedAnswerQue2 },
        { question: "Question3", answer: selectedAnswersQue3Value },
        { question: "Question4", answer: SelectedAnserwQue1 },
        { question: "Question5", answer: SelectedAnswerQue2 },
        { question: "Question6", answer: selectedAnswersQue3Value },
        { question: "Question7", answer: SelectedAnserwQue7 },
        { question: "Question8", answer: SelectedAnserwQue8 },
        { question: "Question9", answer: SelectedAnserwQue9 },
        { question: "Question10", answer: SelectedAnserwQue10 },
    ];


  let questionResults = CompareUserAnsVsCorrectAns(userAnswers, correctAnswers);
 

    // Function to display results
  const displayResults = (questionResults) => {
  const container = document.querySelector('.container');

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

    // Add question and answer to the respective cells
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
        answerCell.style.color = "green"; // Correct answer, color it green
      } else {
        answerCell.style.color = "red"; // Incorrect answer, color it red
      }
    }
 

 
  container.appendChild(resultTable);
  
};

  // Hide questions
  document.querySelectorAll('.question-container').forEach(question => {
    question.style.display = 'none';
    
  });

  //Hide sumbit button

  submitBtn.style.display="none";


  // Calculate the percentage of correct answers
  const percentage = (questionResults.scores / correctAnswers.length) * 100;

  // Display the user's score
  const scoreContainer = document.querySelector('.score-container');
  scoreContainer.textContent = `Ditt resultat: ${questionResults.scores} av ${correctAnswers.length} rätt (${percentage}%)`;

  //  different colors based on the percentage
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

 resultTable = document.getElementById("resultTable");

changeModeBtn.addEventListener("click", () => {
  // Toggle between light and dark mode
  isDarkMode = !isDarkMode;

 

  if (isDarkMode) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'darkGray';
     
      if (resultTable) {
        resultTable.style.backgroundColor = 'black';
    }
    
      // Change the image for dark mode
      changeModeImage.src = "light (1).png";
      changeModeImage.alt = "";
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';

      if (resultTable) {
        resultTable.style.backgroundColor = 'red';
    }
     
      // Change the image source for light mode
      changeModeImage.src = "moon.png";
      changeModeImage.alt = "Light Mode Image";
      
  }

  

  

  
   
   
});







    



  

   

 

   

    
   
  



    
   