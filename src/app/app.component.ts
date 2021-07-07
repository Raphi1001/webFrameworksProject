import { tokenReference } from '@angular/compiler';
import { Component } from '@angular/core';
import { GlobalConstants } from './global-constants';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogInService } from './shared/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isLogedIn = false;

  constructor(private logInService: LogInService, private router: Router) { }

  ngOnInit() {
    let logedInSubscription = this.logInService.logedIn.subscribe(m => {
      this.isLogedIn = m;
    })
  }

  logOut(){
    GlobalConstants.token = 100000;
    this.logInService.setMessage(false);
    this.router.navigate(['/login'])
  }
}


