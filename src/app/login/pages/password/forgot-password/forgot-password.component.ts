import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../../../../models/user/user';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  signupForm!: FormGroup;

  userId: number = 0;
  userData: User;
  display1 = true;
  display2 = false;
  // basePath = 'http://localhost:3000/api/v1/users';
  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userData = {} as User;
    this.signupForm = this.formBuilder.group({
      typeofuser: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
    });
  }

  ngOnInit(): void {}

  getInputValue(email: any) {
    console.log(email);
    // if (this.signupForm.value.typeofuser == 'client') {
    this.http
      .get<any>(`${this.basePath}/client`, this.httpOptions)
      .subscribe((res) => {
        const data = res.find((user: any) => {
          if (user.email === email) {
            this.userId = user.id;
            this.userData = user;
            return true;
          } else return false;
        });

        if (data) {
          this.display1 = false;
          this.display2 = true;
        } else {
          alert('Unregistered email');
        }
      });
  }
  /*
    else{
      this.http
      .get<any>(`${this.basePath}/drivers`, this.httpOptions)
      .subscribe((res) => {
        const data = res.find((user: any) => {
          if (user.email === email) {
            this.userId = user.id;
            this.userData = user;
            return true;
          } else return false;
        });

        if (data) {
          this.display1 = false;
          this.display2 = true;
        } else {
          alert('Unregistered email');
        }
      });
    }


  }*/

  updatePassword(password: any) {
    console.log(password);
    this.userData.password = password;
    this.http
      .put<User>(
        `${this.basePath}/${this.userId}`,
        JSON.stringify(this.userData),
        this.httpOptions
      )
      .subscribe((res) => {
        alert('Password changed');
        this.router.navigate(['/login']);
      });
  }
}
