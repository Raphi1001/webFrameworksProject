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

    this.loadList();
  }

  logOut() {
    GlobalConstants.token = 100000;
    this.router.navigate(['/login'])
  }

  loadList() {
    this.http.get<{ highscoreList: object }>('http://localhost:3000/getHighscoreList', this.httpOptions)
      .subscribe({
        next: (responseData) => {
          var list: Object = responseData.highscoreList;

          let tempList = [];                    //create temporary list and store all values in it
          let uname: keyof typeof list;
          for (uname in list) {
            tempList.push(list[uname]);
          }

          tempList.sort(function (a: any, b: any) { return b - a });   //sorts the temporary list in descending order
          let counter = 0;

          tempList.every(element => {
            for (uname in list) {
              if (element == list[uname]) {
                let newLi = document.createElement("li");
                let newContent = document.createTextNode(String(uname) + ": " + String(list[uname]));
                delete list[uname];
                newLi.appendChild(newContent);
               
                let highscoreList = document.getElementById("highscoreList");
                if (highscoreList)
                  highscoreList.append(newLi);
                break;
              }
            }
            ++counter;
            if(counter > 9) return false;
            return true;
          });
        },
        error: (err) => {
          alert("Invalid User Input");
        }
      });
  }
}
