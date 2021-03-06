import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';
import { LogInService } from '../shared/login.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  selectedPuzzle = this.router.url == "/puzzle1" ? "puzzle1_imgs" : "puzzle2_imgs"; //select puzzle based on url

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private renderer: Renderer2, private router: Router, private loginService: LogInService) { }
  //kann ich nicht im constructor machen
  private passedTime = 0;
  //private timer: NodeJS.Timeout;
  //any weil ich nicht den typen schaffe
  private timer: any;
  scoreVisible = false;
  scorepoints = "";

  ngOnInit(): void {
    this.printPlayingField();
    this.timerStart();
    this.passedTime = 0;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.passedTime = 0;
        clearInterval(this.timer);
      }
    })
  }

  //creates the puzzle
  printPlayingField() {

    let puzzleParts = this.shufflePuzzleParts();
    let puzzlGame = document.getElementById("puzzleGame");
    let allCards = [];
    if (!puzzlGame) return;

    for (let i = 0; i < 9;) { //repeat for 9 cards
      for (let u = 0; u < 3; ++u) { //repeat for 3 rows
        let newCard = this.renderer.createElement("img"); //creates new img element
        newCard.setAttribute("class", "card");
        newCard.setAttribute("id", "card-" + i);
        newCard.setAttribute("src", "assets/pics/" + this.selectedPuzzle + "/img" + puzzleParts[i] + ".jpg");
        puzzlGame.appendChild(newCard);
        allCards.push(newCard);
        ++i;
      }
      let br = document.createElement("br"); //linebreak every 3rd card
      puzzlGame.appendChild(br);
    }

    allCards.forEach(element => this.renderer.listen(element, 'click', () => { this.selectCard(element.id); }));       //clicked at cards call selectCard function with own id as parameter

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
  selectCard(cardId: string) {
    //extract number from string
    let curNumb = cardId.match(/\d/g);
    if (!curNumb) return;
    let id = curNumb.join("");
    let cartToSelect = document.getElementById("card-" + id); //gets the clicked at card
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
    let selectedCards = document.getElementsByClassName("selected"); //creates array of all selected cards

    if (selectedCards.length > 1) { //if more than one card is selected
      let img1 = selectedCards[0].getAttribute("src"); //get img src of first selected card
      let img2 = selectedCards[1].getAttribute("src"); //get img src of second selected card

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
    let solved = true;
    let allCards = document.getElementsByClassName("card"); //creates array of all cards
    for (let i = 0; i < allCards.length - 1; ++i) { //repeat for all cards
      let imgsToCheck = []; //temporarily stores the next two cards
      for (let u = 0; u < 2; ++u) { //repeat process for the next two cards
        let curSrc = allCards[i + u].getAttribute("src"); //gets the card img src
        if (!curSrc) return;
        //extract number from string
        let curNumb = curSrc.match(/\d/g);
        if (!curNumb) return;
        imgsToCheck[u] = curNumb.join("");
      }

      if (parseInt(imgsToCheck[0]) != parseInt(imgsToCheck[1]) - 1) { //checks if the current and the next img should be a next to each other
        solved = false;
        break;
      }
    }

    if (solved) { //if the puzzle is solved
      let puzzlGame = document.getElementById("puzzleGame");
      let solvedTxt = document.createElement("h2"); //create solved txt
      solvedTxt.setAttribute('id', 'solvedTxt');
      puzzlGame?.insertAdjacentElement('afterend', solvedTxt);
      solvedTxt.textContent = "SOLVED :)";
      let score = 100 - this.passedTime;
      if (score < 0) score = 0;
      clearInterval(this.timer);//stops the timer
      //abfrage ob man eingelogt ist, f??r highscore 
      if (this.loginService.getStatus()) {
        this.scorepoints = score.toString();
        this.addHighscore();
      } else {
        this.scorepoints = "Login required";
      }
      this.scoreVisible = true;

      for (let i = 0; i < allCards.length; ++i) { //remove onclick attribute from all cards
        allCards[i].removeAttribute("id");
      }
    }
  }

  timerStart() {
    this.timer = setInterval(() => {
      this.passedTime++;
      let timer = document.getElementById("timer");
      if (timer) {
        timer.textContent = this.passedTime.toString();
      }
    }, 1000); //updates Timer
  }

  addHighscore() {
    var inputData = { points: this.scorepoints, username: GlobalConstants.currentUser.email };
    this.http.post<{ message: string, updated: boolean }>('http://localhost:3000/highscore', inputData, this.httpOptions)
      .subscribe({
        next: (responseData) => {
          let newHighscore = document.getElementById("newHighscore");
          if (responseData.updated) {
            if (newHighscore) newHighscore.textContent = "Congratulations you achieved a new Highscore!";
          } else {
            if (newHighscore) newHighscore.textContent = "No new Highscore. Try again.";
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }



}
