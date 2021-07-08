import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  isLoading = false;

  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]);
  password = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9ÄäÖöÜüß]*$'), Validators.minLength(8), Validators.maxLength(100)]);
  pwConfirm = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9ÄäÖöÜüß]*$'), Validators.minLength(8), Validators.maxLength(100)]);
  address = new FormControl('', [Validators.maxLength(100)]);
  city = new FormControl('', [Validators.pattern('^[A-Za-z0-9- ÄäÖöÜüß]*$'), Validators.maxLength(100)]);
  postalCode = new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.maxLength(100)]);
  company = '';
  pwConfirmErr = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

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
    if (this.password.hasError('minlength')) return 'The password you entered is too short.';
    if (this.password.hasError('pattern')) return 'Not a valid password';

    return '';
  }

  getPWConfimErrorMessage() {
    if (this.pwConfirm.hasError('required')) return 'You must enter a value';
    if (this.pwConfirm.hasError('maxlength')) return 'The password you entered is too long.';
    if (this.pwConfirm.hasError('minlength')) return 'The password you entered is too short.';
    if (this.pwConfirm.hasError('pattern')) return 'Not a valid password';

    return '';
  }

  getPWMatchErrorMessage() {
    if (this.pwConfirm.value != this.password.value) {
      this.pwConfirmErr = true;
      return 'The passwords don\'t match.';
    }

    this.pwConfirmErr = false;
    return '';
  }

  getAddressErrorMessage() {
    if (this.address.hasError('maxlength')) return 'The address you entered is too long.';

    return '';
  }

  getCityErrorMessage() {
    if (this.city.hasError('maxlength')) return 'The city you entered is too long.';
    if (this.city.hasError('pattern')) return 'Not a valid city';

    return '';
  }

  getPostalCodeErrorMessage() {
    if (this.postalCode.hasError('maxlength')) return 'The postal code you entered is too long.';
    if (this.postalCode.hasError('pattern')) return 'Not a valid postal code';

    return '';
  }



  onSignUpSubmit() {
    if (!this.email.valid || !this.password.valid || !this.pwConfirm.valid || !this.address.valid || !this.city.valid || !this.postalCode.valid || this.pwConfirmErr) return;
    var company = (<HTMLInputElement>document.getElementById("company")).value;

    if (company != "FH Technikum Wien") return;


    var inputData = { email: this.email.value, password: this.password.value, adress: this.address.value, city: this.city.value, postalCode: this.postalCode.value, pwConfirm: this.pwConfirm.value };
    this.http.post<{ message: string, success: boolean }>('http://localhost:3000/signUp', inputData, this.httpOptions)
      .subscribe({
        next: (responseData) => {
          if (responseData.success) {
            var successMsg = document.getElementById("success");
              if(successMsg) successMsg.textContent = "Sign Up successfull! You will be redirected shortly.";
            setTimeout( () => this.router.navigate(['/login']), 3000 );
          } else {
              var emailErr = document.getElementById("emailErr");
              if(emailErr) emailErr.textContent = "The email you entered is already taken";
          }

        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
