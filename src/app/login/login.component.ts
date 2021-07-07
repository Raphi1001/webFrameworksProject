import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { LogInService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  isLoading = false;

  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9ÄäÖöÜüß]*$'), Validators.maxLength(100)]);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router, private logInService: LogInService) {}

  ngOnInit(): void {

  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value.';
    if (this.email.hasError('maxlength')) return 'The email you entered is too long.';
    if (this.email.hasError('email')) return 'Not a valid email';

    return '';
  }

  getPWErrorMessage() {
    if (this.password.hasError('required')) return 'You must enter a value';
    if (this.password.hasError('maxlength')) return 'The password you entered is too long.';
    if (this.password.hasError('pattern')) return 'Not a valid password';

    return '';
  }

  onLoginSubmit() {
    if (!this.email.valid || !this.password.valid) return;
    var inputData = { email: this.email.value, password: this.password.value };
    this.http.post<{ message: string, success: boolean, token: number, email:string, adress:string, city:string, postalCode:number}>('http://localhost:3000/login', inputData, this.httpOptions)
      .subscribe({
        next: (responseData) => {
          console.log(responseData.message);
          if(responseData.success == true)
          {
            GlobalConstants.token = responseData.token; 
            this.logInService.setMessage(true);
            GlobalConstants.currentUser.email = responseData.email;
            GlobalConstants.currentUser.adress = responseData.adress;
            GlobalConstants.currentUser.city = responseData.city;
            GlobalConstants.currentUser.postalCode = responseData.postalCode;
            console.log(GlobalConstants.currentUser.postalCode);
            this.router.navigate(['/'])
            return;
          }
          alert("Email oder Passwort nicht korrekt!");
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
  }
}
