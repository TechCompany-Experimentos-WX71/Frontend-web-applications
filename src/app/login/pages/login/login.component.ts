import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../models/user/user';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormm!: NgForm;
  logged: boolean = false;
  signInForm!: FormGroup;
  public show: boolean=false;

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
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    
    this.http
      .get<Array<User>>(`${this.basePath}/clients`, this.httpOptions)
      .subscribe((res: Array<User>) => {
        console.log(
          '🚀 ~ file: login.component.ts ~ line 43 ~ LoginComponent ~ .subscribe ~ res',
          res
        );
        const data = res.find((client: any) => {
          if (
            client.email === this.signInForm.value.email &&
            client.password === this.signInForm.value.password
          ) {
            localStorage.setItem('currentUser', client.id);
            localStorage.setItem('typeofuser', 'client');
            this.logged = true;
            return true;
          } else return false;
        });

        console.log(this.signInForm.value.email);
        console.log(this.signInForm.value.password);
        if (data) {
          this.router.navigate(['/home-c']);
          
        }

        if (!this.logged) { 
          this.http
            .get<any>(`${this.basePath}/drivers`, this.httpOptions)
            .subscribe((res) => {
              const data = res.find((driver: any) => {
                if (
                  driver.email === this.signInForm.value.email &&
                  driver.password === this.signInForm.value.password
                ) {
                  localStorage.setItem('currentUser', driver.id);
                  localStorage.setItem('typeofuser', 'driver');
                  console.log('prueba');
                  return true;
                } else return false;
              });
              console.log(this.signInForm.value.email);
              console.log(this.signInForm.value.password);

              if (data) {
                this.router.navigate(['/home-d']);
                
              } else {
                this.show = true
              }
            });
        }
      });
    
  }
}
