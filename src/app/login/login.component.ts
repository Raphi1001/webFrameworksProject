import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

    if (this.email.value != "test@test.at" || this.password.value != "12345678") {
      console.log("Login failed");
      alert("Login failed");
      return;
    }
    console.log("Login successful");
    alert("Login successful");
  }

  constructor() { }

  ngOnInit(): void {

  }

}
