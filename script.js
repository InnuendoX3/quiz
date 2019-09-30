document.addEventListener('DOMContentLoaded', function() {
   // HTML sections/areas
   let userInputArea = document.getElementById('user-input-area');
   let questionArea = document.getElementById('question-area');
   let informationArea = document.getElementById('information-area');
   
   // HTML elements
   let formulario = document.getElementById("formulario");
   let usernameEl = document.getElementById("username");
   let username = "";
   let nameParagraph = document.getElementById("name-p");
   let qtyEl = document.getElementById("qty-questions");
   let qtyQuestions = 0;
   let qButtonsDiv = document.getElementById("q-buttons");
   
   
   // Event listeners
   formulario.addEventListener("submit", startGame);


   /* Empieza todo */
   displayIntro();
  

   function startGame(event) {
      // Stop refreshig page because of Form / 3 hours to fix it!
      event.preventDefault();
      console.log("Username: " + usernameEl.value);
      displayGame();
      getNameAndQty();

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

   function getNameAndQty() { //works
      //Name printing
      username = usernameEl.value;
      if (username == "")
         username = "Hi";
      nameParagraph.innerHTML = username + nameParagraph.innerHTML;

      //Quantity questions
      qtyQuestions = qtyEl.value;
      console.log(qtyQuestions);
      for (let i=0; i < qtyQuestions; i++) {
         var newButton = document.createElement("button");
         var numNode = document.createTextNode(i +1);
         newButton.appendChild(numNode);
         qButtonsDiv.appendChild(newButton);
      }
   }
   

}) 