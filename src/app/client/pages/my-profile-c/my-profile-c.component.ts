import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { DescriptionData } from 'src/app/components/add-info-one/add-info-one.component';
import { MatDialog } from '@angular/material/dialog';
import { AddInfoOneComponent } from 'src/app/components/add-info-one/add-info-one.component';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-my-profile-c',
  templateUrl: './my-profile-c.component.html',
  styleUrls: ['./my-profile-c.component.css'],
})
export class MyProfileCComponent implements OnInit {
  jobs: any;
  user: any;
  comments: any;
  user_id: any;
  Edit!: FormGroup;
  show: boolean = false;
  result: any;
  descriptionData:DescriptionData;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.descriptionData={} as DescriptionData;
  }

  //basePath = 'http://localhost:3000/api/v1/';

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };
  openDialog(): void {
    this.show= true;
    
  }
  closeDialog(): void{
    this.show= false;

  }

  searchDialog(): void{
    this.result = this.Edit.value.description;
    
    this.user.description = this.result;
      console.log(this.user);
      this.saveDescription().subscribe((data: any) => {
        console.log(data);
        this.ngOnInit();
      })

      this.show= false;
  }
  

  
  ngOnInit(): void {
    this.Edit = this.formBuilder.group({
      description: [''],
      password: [''],
    });
    this.user_id = localStorage.getItem('currentUser');
    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data;
    });

    this.getJobs(this.user_id).subscribe((data: any) => {
      this.jobs = data;
      console.log(this.jobs);
    });
    this.getComments(this.user_id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
    
  }
  openDescriptionModal() {
    this.Edit.value.description = this.user.description;
    this.show= true;
  }
  saveDescription() {

    return this.http.put(
      `${this.basePath}/clients/${this.user_id}`, 
      this.user, 
      this.httpOptions);
  }
  getUser(id: any) {
    return this.http.get(`${this.basePath}/clients/${id}`);
  }
  getJobs(id: any) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}/comments/client/${id}`);
  }

  calculateAge(birthday: any) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}






