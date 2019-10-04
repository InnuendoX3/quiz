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


}

class Question {
   constructor(cCategory, cQuestion, cAnswers) {
      this.category = cCategory;
      this.question = cQuestion;
      this.answers = [];
      this.addAnswers(cAnswers);
      this.rightAnswered = false;  // testing if needed
   }

   addAnswers(cAnswers) {
      for (const i of cAnswers) {
         let a = new Answer(i.answer, i.isRight);
         this.answers.push(a);
      }
   }
}

class Answer {
   constructor(cAnswer, cIsRight) {
      this.answer = cAnswer;
      this.isRight = cIsRight;
   }
}

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

      
   }

   // Create a button per question... to navigate
   function printNavButtons() {
      for (let i=0; i < theWholeQuiz.getQuestionsChosen(); i++) {
         var newButton = document.createElement("button");
         newButton.innerHTML = i + 1;
         qButtonsDiv.appendChild(newButton);
      }
   }

   function printEverything() {
      //Titulo
      
      //Pregunta

      //Respuestas

   }
   


})