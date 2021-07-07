import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  email = "Max Mustermann";
  hide = true;
  isLoading = false;

  points = new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.maxLength(100)]);
  username = new FormControl('', [Validators.pattern('^[A-Za-z0-9ÄäÖöÜüß]*$'), Validators.maxLength(100)]);


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    var inputData = { token: GlobalConstants.token };
    this.http.post<{ success: boolean, email: string }>('http://localhost:3000/verifyToken', inputData, this.httpOptions)
      .subscribe({
        next: (responseData) => {
          if (responseData.success == true) {
            this.email = responseData.email;

            loadGame();
            return;
          }
          this.router.navigate(['/login'])      //if user ist not logged in
        },
        error: (err) => {
          alert("Invalid User Input");      
        }
      });
  }

  getPointsErrorMessage() {
    if (this.points.hasError('required')) return 'You must enter a value.';
    if (this.points.hasError('maxlength')) return 'The number you entered is too long.';
    if (this.points.hasError('pattern')) return 'Invalid Input';

    return '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) return 'You must enter a value.';
    if (this.username.hasError('maxlength')) return 'The Username you entered is too long.';
    if (this.username.hasError('pattern')) return 'Invalid Username';

    return '';
  }

  addHighscore() {
    if (!this.points.valid || !this.username.valid) return;

    var inputData = { points: this.points.value, username: this.username.value};
    this.http.post<{ message: string }>('http://localhost:3000/highscore', inputData, this.httpOptions)
    .subscribe({
      next: (responseData) => {
        alert(responseData.message);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logOut() {
    GlobalConstants.token = 100000;
    this.router.navigate(['/login'])
  }
}


function loadGame() {
  var defaultToolbar = document.getElementById("defaultToolbar");
  if (defaultToolbar) {
    defaultToolbar.style.display = "none";
  }
}
