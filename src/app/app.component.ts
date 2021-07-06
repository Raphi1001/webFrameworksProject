import { tokenReference } from '@angular/compiler';
import { Component } from '@angular/core';
import { LogInService } from './shared/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private logger: LogInService) {}

  isLogedIn = this.logger.LoginStatus();
}


