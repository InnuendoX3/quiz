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
   getUsername() { //Needed?
      return this.username;
   }

   setQuestionsChosen(qChosen){
      this.questionsChosen = qChosen;
   }
   getQuestionsChosen() { //Nedded?
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
      this.rightAnswered = false;  // testing if needed
      this.checkboxes = []; // Save users checkbox answer per question (true/flase)
   }

   addAnswers(cAnswers) {
      for (const i of cAnswers) {
         let a = new Answer(i.answer, i.isRight);
         this.answers.push(a);
      }
   }

   // Read users answers on checkboxes
   setCheckboxesAnswers(userAnswers) {
      
   }

   // Clear all HTML checkboxes to could reload the question's answers (this.checkboxes)
   clearCheckboxes() {
      // Aqui no.
   }

   // Send how user had answered the question
   getCheckboxesAnswers() {
      return checkboxes;
   }
}

class Answer {
   constructor(cAnswer, cIsRight) {
      this.answer = cAnswer;
      this.isRight = cIsRight;
   }
}

/*class Checkboxes {
   constructor() {
      this.checkboxes = [];
   }

   makeDiv() {
      let div = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      let label = document.createElement("label");
      /* aqui voy -- imprimirlos aqui sirve? 
   }


}*/

// Paste here from Mocky!!!
let fromJson = getJSON("http://www.mocky.io/v2/5d9647d233000003cd2f9028");
let theWholeQuiz = new Quiz(fromJson);

console.log(theWholeQuiz);






// ContentLoader

document.addEventListener('DOMContentLoaded', function () {
   // HTML sections/areas
   let userInputArea = document.getElementById('user-input-area');
   let questionArea = document.getElementById('q-container');
   let informationArea = document.getElementById('information-area');

   // HTML elements
   let formulario = document.getElementById("formulario");
   let usernameEl = document.getElementById("username");   
   let nameParagraph = document.getElementById("name-p");
   let qtyEl = document.getElementById("qty-questions");   
   let qButtonsDiv = document.getElementById("q-buttons");
   let qNumberH2 = document.getElementById("q-number");
   let questionHere = document.getElementById("question-here");
   let labelA1 = document.getElementById("labelA1"); // Nedeed?
   let labelA2 = document.getElementById("labelA2"); // Nedeed?
   let labelA3 = document.getElementById("labelA3"); // Nedeed?
   let labelA4 = document.getElementById("labelA4"); // Nedeed?


   // Variables

   // Empieza todo
   displayIntro();

   // Event listeners
   formulario.addEventListener("submit", startQuiz);



   function startQuiz(event) {
      // Stop refreshig page because of Form / 3 hours to fix it!
      event.preventDefault();
      console.log("Username: " + usernameEl.value); //Borrar
      displayGame();
      getInfoForm();

      printNavButtons();
      printEverything();

   }

   function displayIntro() { // works
      userInputArea.style.display = "flex";
      questionArea.style.display = "none";
      informationArea.style.display = "none";
   }

   function displayGame() { //works
      userInputArea.style.display = "none";
      questionArea.style.display = "flex";
      informationArea.style.display = "flex";
   }

   // Get username and questions chosen and save them into the object
   function getInfoForm() { //works
      //Name
      theWholeQuiz.setUsername(usernameEl.value);
      nameParagraph.innerHTML = theWholeQuiz.getUsername() + nameParagraph.innerHTML; //Do better

      //Quantity questions
      theWholeQuiz.setQuestionsChosen(qtyEl.value);
      console.log("Preguntas unidades: " + theWholeQuiz.getQuestionsChosen());
      console.log("Preguntas unidades directas: " + theWholeQuiz.getQuestion());


      
   }

   // Create a button per question... to navigate. Add event listener per button.
   function printNavButtons() {
      for (let i=0; i < theWholeQuiz.getQuestionsChosen(); i++) {
         // Create button with text and ID
         var newButton = document.createElement("button");
         newButton.innerHTML = i + 1;
         newButton.id = "button-answer" + i; // create an ID per button: butAns0...
         qButtonsDiv.appendChild(newButton);

         // Add to the button an event listener
         let temp = document.getElementById("button-answer" + i);
         temp.addEventListener("click", function() { 
            changeQuestion(temp.innerHTML - 1); // Send the "index" of the question 
         });
      }

      

   }

   // Display a new question/answers depend on navigation-button
   function changeQuestion(i) {
      theWholeQuiz.setCurrentQuestionNr(i);
      printEverything();  // Here?
   }

   function printEverything() {
      //Titulo
      qNumberH2.innerHTML = "Question nr. " + (theWholeQuiz.getCurrentQuestionNr() + 1);

      //Pregunta
      questionHere.innerHTML = theWholeQuiz.getQuestion();

      //Respuestas
      let count = 0;
      for (const iterator of theWholeQuiz.getAnswers()) {
         let temp = eval("labelA" + count) //Makes each label: labelA1... labelA2...
         temp.innerHTML = iterator.answer; 
         console.log(temp.innerHTML);
         count++;
      }

      
   }
   


})