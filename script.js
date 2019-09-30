document.addEventListener('DOMContentLoaded', function() {
   // HTML sections/areas
   let userInputArea = document.getElementById('user-input-area');
   let questionArea = document.getElementById('question-area');
   let informationArea = document.getElementById('information-area');
   
   // HTML buttons
   let startButton = document.getElementById("start-button");
   //let formulario = document.getElementById("formulario");
   
   // Event listeners
   //startButton.addEventListener('click', startGame);
   formulario.addEventListener("submit", startGame);


   /* Empieza todo */
   displayIntro();
  

   function startGame(event) {
      event.preventDefault();
      console.log("formulario submitido")
      displayGame();

   }

   function displayIntro() {
      userInputArea.style.display = "flex";
      questionArea.style.display = "none";
      informationArea.style.display = "none";
   }

   function displayGame() {
      userInputArea.style.display = "none";
      questionArea.style.display = "flex";
      informationArea.style.display = "flex";
   }
   

}) 