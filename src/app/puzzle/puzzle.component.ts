import { Component, OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  constructor( private renderer:Renderer2) { }

  ngOnInit(): void {
    this.printPlayingField();
  }


  //creates the puzzle
  printPlayingField() {
  console.log("ja");
      var puzzleParts = this.shufflePuzzleParts();
      var puzzlGame = document.getElementById("puzzleGame");
      if(!puzzlGame) return;

      for (var i = 0; i < 9;) { //repeat for 9 cards
          for (var u = 0; u < 3; ++u) { //repeat for 3 rows
              var newCard = this.renderer.createElement("img"); //creates new img element
              newCard.setAttribute("class", "card");
              newCard.setAttribute("id", "card-" + i);
              newCard.setAttribute("src", "assets/pics/puzzle1_imgs/img"+ puzzleParts[i] + ".jpg");
              this.renderer.listen(newCard, 'click', () => {this.selectCard(i);});

              puzzlGame.appendChild(newCard);
              ++i;
          }
          var br = document.createElement("br"); //linebreak every 3rd card
          puzzlGame.appendChild(br);
      }
  
      this.checkIfSolved();
  }
  
  //creates an random card arrangement
  shufflePuzzleParts() {
      const puzzleParts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
      let counter = puzzleParts.length;
      while (counter > 0) {
          const index = Math.floor(Math.random() * counter);
          counter--;
          const temp = puzzleParts[counter];
          puzzleParts[counter] = puzzleParts[index];
          puzzleParts[index] = temp;
      }
  
      return puzzleParts;
  }
  
  //selectes/deselectes clicked at cards
  selectCard(cardId: number) {
    console.log(cardId);
      var cartToSelect = document.getElementById("card-" + cardId); //gets the clicked at card
      if (!cartToSelect) return;
      if (cartToSelect.classList.contains("selected")) { //if clicked at card is already selected
          cartToSelect.classList.remove("selected"); //deselect selected card
      }
      else {
          cartToSelect.classList.add("selected"); //select card
      }
  
      this.swapselectedCards();
  }
  
  
  //swaps selected cards
  swapselectedCards() {
      var selectedCards = document.getElementsByClassName("selected"); //creates array of all selected cards
  
      if (selectedCards.length > 1) { //if more than one card is selected
          var img1 = selectedCards[0].getAttribute("src"); //get img src of first selected card
          var img2 = selectedCards[1].getAttribute("src"); //get img src of second selected card
  
          if (!img1 || !img2) return;
          //swap img srcs of first and second card
          selectedCards[0].setAttribute("src", img2);
          selectedCards[1].setAttribute("src", img1);
  
          while (selectedCards.length > 0) { //deselect all cards
              selectedCards[0].classList.remove("selected");
          }
  
          this.checkIfSolved();
      }
  }
  
  //checks if the puzzle is solved
  checkIfSolved() {
      var solved = true;
      var allCards = document.getElementsByClassName("card"); //creates array of all cards
      for (var i = 0; i < allCards.length - 1; ++i) { //repeat for all cards
          var imgsToCheck = []; //temporarily stores the next two cards
          for (var u = 0; u < 2; ++u) { //repeat process for the next two cards
              var curSrc = allCards[i + u].getAttribute("src"); //gets the card img src
              if (!curSrc) return;
              //extract number from string
              var curNumb = curSrc.match(/\d/g);
              if (!curNumb) return;
              imgsToCheck[u] = curNumb.join("");
          }
  
          if (parseInt(imgsToCheck[0]) != parseInt(imgsToCheck[1]) - 1) { //checks if the current and the next img should be a next to each other
              solved = false;
              break;
          }
      }
  
      if (solved) { //if the puzzle is solved
          var solvedTxt = document.createElement("h2"); //create solved txt
          solvedTxt.textContent = "SOLVED :)";
          document.body.appendChild(solvedTxt);
  
          for (var i = 0; i < allCards.length; ++i) { //remove onclick attribute from all cards
              allCards[i].removeAttribute("onclick");
          }
      }
  }






}
