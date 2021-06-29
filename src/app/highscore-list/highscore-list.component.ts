import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrls: ['./highscore-list.component.css']
})
export class HighscoreListComponent implements OnInit {
  email = "Max Mustermann";

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
            this.loadList();
            return;
          }
          this.router.navigate(['/login'])
        },
        error: (err) => {
          alert("Invalid User Input");
        }
      });
  }

  logOut() {
    GlobalConstants.token = 100000;
    this.router.navigate(['/login'])
  }

  loadList() {
    this.http.get<{ highscoreList: object }>('http://localhost:3000/getHighscoreList', this.httpOptions)
      .subscribe({
        next: (responseData) => {
          var highscoreList = document.getElementById("highscoreList");
          if (!highscoreList) return;
          var list: Object = responseData.highscoreList;

          let uname: keyof typeof list;  
          for (uname in list) {
            var newLi = document.createElement("li");
            var newContent = document.createTextNode(String(uname) + ": " +String(list[uname]));
            newLi.appendChild(newContent);
            highscoreList.append(newLi);
          }
        },
        error: (err) => {
          alert("Invalid User Input");
        }
      });
  }
}
