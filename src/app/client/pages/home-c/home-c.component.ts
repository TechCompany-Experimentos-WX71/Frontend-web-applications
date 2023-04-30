import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../models/user/user';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-home-c',
  templateUrl: './home-c.component.html',
  styleUrls: ['./home-c.component.css'],
})
export class HomeCComponent implements OnInit {
  user_id: any;
  user: {
    photo: string;
    username: string;
  };
  user_name: string = '';
  vehicle_1: any;
  vehicle_2: any;
  experience_1: any;
  experience_2: any;
  best_ranked: Array<any> = [];
  Best_ranked: Array<any> = [];
  contracts_user: Array<any> = [];
  driver_route: any;

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.user = {
      photo: '-',
      username: '-',
    };
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');
    // console.log(typeof localStorage.getItem('currentUser'))
    this.getRanked().subscribe((data: any) => {
      this.best_ranked = data;
    });

    this.getDriverVehicle(1).subscribe((data: any) => {
      this.vehicle_1 = data;
    });

    this.getDriverVehicle(2).subscribe((data: any) => {
      this.vehicle_2 = data;
    });

    this.getDriverExperience(1).subscribe((data: any) => {
      console.log('Id' + data.id);
      this.experience_1 = data;
    });

    this.getDriverExperience(2).subscribe((data: any) => {
      this.experience_2 = data;
    });

    console.log(localStorage.getItem('currentUser'));

    this.getContract(this.user_id).subscribe((data: any) => {
      this.contracts_user = data;
    });

    this.getClientById(this.user_id).subscribe((data: any) => {
      this.user = data;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  getRanked() {
    return this.http.get(`${this.basePath}/drivers`);
  }

  getClientById(id: any) {
    return this.http.get(`${this.basePath}/clients/${id}`);
  }

  getDriverVehicle(id: any) {
    return this.http.get(`${this.basePath}/vehicle/${id}`);
  }

  getDriverExperience(id: any) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }

  getContract(id: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.basePath}/contracts/history/client/${id}`,
        this.httpOptions
      )
      .pipe(retry(2));
  }

  goToDriver(id: any) {
    this.router.navigate([`profile/${id}`]);
    localStorage.setItem('visitDriverId', id);
  }
}
