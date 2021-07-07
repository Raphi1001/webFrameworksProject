import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
            this.loadProfile();
            return;
          }
          this.router.navigate(['/login'])      //if user ist not logged in
        },
        error: (err) => {
          alert("Invalid User Input");
        }
      });
  }

  loadProfile() {
    this.http.get<{ highscoreList: object }>('http://localhost:3000/getHighscoreList', this.httpOptions)
      .subscribe({
        next: (responseData) => {
          var list: Object = responseData.highscoreList;

          let uname: keyof typeof list;;
          for (uname in list) {
            let highscore = document.getElementById("highscore");
            console.log(uname);
            if (uname == GlobalConstants.currentUser.email && highscore) {
              highscore.textContent = String(list[uname]);
              break;
            }
          }
        },
        error: (err) => {
          alert("Invalid User Input");
        }
      });

    let email = document.getElementById("email");
    if (email) email.textContent = GlobalConstants.currentUser.email;

    let adress = document.getElementById("adress");
    if (adress) adress.textContent = GlobalConstants.currentUser.adress;

    let city = document.getElementById("city");
    if (city) city.textContent = GlobalConstants.currentUser.city;

    let postalCode = document.getElementById("postalCode");
    if (postalCode) postalCode.textContent = String(GlobalConstants.currentUser.postalCode);

  }
}
