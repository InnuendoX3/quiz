// Classes
class Quiz {
   constructor(cQuestions) {
      this.questions = [];
      this.addQuestions(cQuestions);
      this.username;
      this.questionsChosen;
      this.currentQuestionNr = 0;
      this.rightQuestionsQty;
      this.wrongQuestionsQty;

   }

   addQuestions(cQuestions) {
      for (const i of cQuestions) {
         let q = new Question(i.category, i.question, i.answers);
         this.questions.push(q);
      }
   }

   setUsername(username) {
      this.username = username;
   }

   setQuestionsChosen(qChosen) {
      qChosen = qChosen == "" ? 5 : qChosen; // If no "Nr. of questions" input from user set 5 as default
      this.questionsChosen = qChosen;
   }

   getQuestionsChosen() {
      return this.questionsChosen;
   }

   getCurrentQuestionNr() {
      return this.currentQuestionNr;
   }

   setCurrentQuestionNr(newCurrent) {
      this.currentQuestionNr = newCurrent;
   }

   getQuestion() {
      return this.questions[this.currentQuestionNr].question;
   }
   
   getAnswers() {
      return this.questions[this.currentQuestionNr].answers;
   }
}

class Question {
   constructor(cCategory, cQuestion, cAnswers) {
      this.category = cCategory;
      this.question = cQuestion;
      this.answers = [];
      this.addAnswers(cAnswers);
      this.isAnswered = false;
      this.rightAnswered = false;
      this.checkboxes = [false, false, false, false]; // Save users checkbox answer per question (true/flase)
   }

   addAnswers(cAnswers) {
      for (const i of cAnswers) {
         let a = new Answer(i.answer, i.isRight);
         this.answers.push(a);
      }
   }

   // Read users answers on checkboxes
   setCheckboxesAnswers(userAnswers) {
      this.checkboxes = userAnswers;
      this.isQuestionAnswered();
   }

   // Send how user had answered the question
   getCheckboxesAnswers() {
      return this.checkboxes;
   }

   getRightAnswered() {
      return this.rightAnswered;
   }

   isQuestionAnswered() {
      let counter = 0;
      for (const check of this.checkboxes) {
         if(!check) {
            counter++;
         }
      }
      this.isAnswered = counter != 4 ? true : false;
   }

   // Take this.checkboxes (answers by user) and COMPARE with this.answers (correct answers)
   // Return false or true into this.rightAnswered
   correct() {
      let fourIsCorrect = 0
      for (let i = 0; i <= 3; i++) {
         if (this.answers[i].isRight == this.checkboxes[i])
            fourIsCorrect++;
      }
      console.log(fourIsCorrect);
      this.rightAnswered = fourIsCorrect == 4 ? true : false;
   }
   
}

class Answer {
   constructor(cAnswer, cIsRight) {
      this.answer = cAnswer;
      this.isRight = cIsRight;
   }
}


// Paste here from Mocky!!!
let fromJson = getJSON("http://www.mocky.io/v2/5d9a42133100006b1397da86");
let theWholeQuiz = new Quiz(fromJson);


// ContentLoader
document.addEventListener('DOMContentLoaded', function () {
   // HTML sections/areas
   let userInputArea = document.getElementById('user-input-area');
   let questionArea = document.getElementById('q-container');
   let navigationArea = document.getElementById('navigation-area');
   let informationArea = document.getElementById('information-area');

   // HTML elements
   let formulario = document.getElementById("formulario");
   let usernameEl = document.getElementById("username");
   let infoCorrect = document.getElementById("info-correct");
   let infoAnswered = document.getElementById("info-answered");
   let qtyEl = document.getElementById("qty-questions");   
   let qButtonsDiv = document.getElementById("q-buttons");
   let qNumberH2 = document.getElementById("q-number");
   let questionHere = document.getElementById("question-here");
   let finishButton = document.getElementById("finish-button");
   let labelA1 = document.getElementById("labelA1"); // Nedeed?
   let labelA2 = document.getElementById("labelA2"); // Nedeed?
   let labelA3 = document.getElementById("labelA3"); // Nedeed?
   let labelA4 = document.getElementById("labelA4"); // Nedeed?
   let answer0 = document.getElementById("answer0"); // Needed?
   let answer1 = document.getElementById("answer1"); // Needed?
   let answer2 = document.getElementById("answer2"); // Needed?
   let answer3 = document.getElementById("answer3"); // Needed?



   // Empieza todo
   displayIntro();

   // Event listeners
   formulario.addEventListener("submit", startQuiz);
   finishButton.addEventListener("click", showResults);

   function startQuiz(event) {
      // Stop refreshig page because of Form / 3 hours to fix it!
      event.preventDefault();
      displayGame();
      getInfoForm();

      printNavButtons();
      printEverything();
      showInformation();
   }

   function displayIntro() {
      userInputArea.style.display = "flex";
      questionArea.style.display = "none";
      navigationArea.style.display = "none";
      informationArea.style.display = "none";
      infoCorrect.style.display = "none";
   }

   function displayGame() {
      userInputArea.style.display = "none";
      questionArea.style.display = "flex";
      navigationArea.style.display = "flex";
      informationArea.style.display = "flex";
   }

   function displayResults() {
      questionArea.style.display = "none";
      navigationArea.style.display = "none";
   }

   // Get username and questions chosen and save them into the object
   function getInfoForm() {
      //Name
      theWholeQuiz.setUsername(usernameEl.value);

      //Quantity questions
      theWholeQuiz.setQuestionsChosen(qtyEl.value);
   }

   // Create a button per question... to navigate. Add event listener per button.
   function printNavButtons() {
      for (let i=0; i < theWholeQuiz.getQuestionsChosen(); i++) {
         // Create button with text and ID
         var newButton = document.createElement("button");
         newButton.innerHTML = i + 1;
         newButton.id = "button-answer" + i; // create an ID per button: butAns0...
         newButton.classList.add("myButton");
         qButtonsDiv.appendChild(newButton);

         // Add to the button an event listener
         let temp = document.getElementById("button-answer" + i);
         temp.addEventListener("click", function() { 
            readCheckboxes();
            clearCheckboxes();
            changeQuestion(temp.innerHTML - 1); // Send the "index" of the question
            printEverything();  // Here?
            writeOnCheckboxes();
            showInformation();
         });
      }
   }

   // Read users answers from checkboxes
   function readCheckboxes() {
      let answersChecked = [];
      for (let count = 0; count <= 3; count++) {      
         let answerFake = eval("answer" + count) // Makes variabel's name: answer0... answer1
         if (answerFake.checked)
            answersChecked[count] = true;
         else
            answersChecked[count] = false;
      }

      theWholeQuiz.questions[theWholeQuiz.getCurrentQuestionNr()].setCheckboxesAnswers(answersChecked);    
   }

   // Reset all checkboxes 
   function clearCheckboxes() {
      for (let count = 0; count <= 3; count++) {
         let answerFake = eval("answer" + count);
         answerFake.checked = false;
      }
   }

   // Load checkboxes with the answer the user answered.
   function writeOnCheckboxes() {
      let checkboxesSaved = theWholeQuiz.questions[theWholeQuiz.getCurrentQuestionNr()].getCheckboxesAnswers();
      for (let count = 0; count <= 3; count++) {
         let answerFake = eval("answer" + count);
         answerFake.checked = checkboxesSaved[count];
      }
   }

   // Display how many questions are answered.
   function showInformation() {
      let answered = countAnswered();
      infoAnswered.innerHTML = "Answered: " + answered + " / " + theWholeQuiz.getQuestionsChosen();      
   }

   // Count how many has been answered
   function countAnswered() {
      let counter = 0;
      for (const temp of theWholeQuiz.questions) {
         if(temp.isAnswered)
            counter++;
      }
      return counter;
   }

   // Display a new question/answers depend on navigation-button
   function changeQuestion(i) {
      theWholeQuiz.setCurrentQuestionNr(i);
   }

   function printEverything() {
      //Titulo
      qNumberH2.innerHTML = "Question nr. " + (theWholeQuiz.getCurrentQuestionNr() + 1);

      //Pregunta
      questionHere.innerHTML = theWholeQuiz.getQuestion();

      //Respuestas
      let count = 0;
      for (const iterator of theWholeQuiz.getAnswers()) {
         let labelFake = eval("labelA" + count) //Makes label's name: labelA1... labelA2... to capture them
         labelFake.innerHTML = iterator.answer; 
         //console.log(temp.innerHTML);
         count++;
      }      
   }

   function showResults() {
      displayResults();
      readCheckboxes(); // To ensure the last question's answers are beign saved on 'checkboxes'
      showInformation();
      trigerCorrectMethod();      
      infoCorrect.innerHTML = "Correct answers: " + countRightAnswers() + " / " + theWholeQuiz.getQuestionsChosen();
      infoCorrect.style.display = "block";
      finishButton.style.display = "none";

      console.log(theWholeQuiz);
   }

   function trigerCorrectMethod() {
      for (const iterator of theWholeQuiz.questions) {
         iterator.correct();
      }
   }

   function countRightAnswers() {
      let counter = 0;
      for (const iterator of theWholeQuiz.questions) {
         if (iterator.getRightAnswered())
            counter++;
      }
      return counter;
   }

})