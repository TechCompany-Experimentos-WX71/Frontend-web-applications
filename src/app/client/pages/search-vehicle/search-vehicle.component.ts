import { Component, OnInit } from '@angular/core';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css'],
})

export class SearchVehicleComponent implements OnInit {
  filteredVehicules: any;
  

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', { updateOn: 'change' }],
  });

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };
  
 
  Type: {value: string, viewValue: string, imgSrc: string}[] = [
    {value: 'vehicle-0', viewValue: 'Bus', imgSrc: 'https://media.discordapp.net/attachments/1098441742488961045/1102340772700885042/gettyimages-135327019-612x612.jpg'},
    {value: 'vehicle-1', viewValue: 'Van', imgSrc: 'https://media.discordapp.net/attachments/1098441742488961045/1102340773732692129/2018_Ford_Transit_Custom_300_Base_2.0_facelift.jpg?width=960&height=571'},
    {value: 'vehicle-2', viewValue: 'Cargo Truck', imgSrc: 'https://media.discordapp.net/attachments/1098441742488961045/1102340773317447710/CAMION-2-TN-CARGO-BOX-1.jpg'},
    {value: 'vehicle-3', viewValue: 'Truck', imgSrc: 'https://media.discordapp.net/attachments/1098441742488961045/1102340772986105996/conducir-como-profesionalfuso-destacada.png'},
    {value: 'vehicle-4', viewValue: 'Taxi', imgSrc: 'https://media.discordapp.net/attachments/1098441742488961045/1102354104656871454/2XCT3JN7ZRGMNAFSMZM2RSTH2I.jpeg?width=960&height=656'}
  ];
  selectedVehicle: any;

  clickType(vehicle:any){
    this.selectedVehicle = vehicle;
    console.log(this.selectedVehicle);
    this.listSearch();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get Type_s() {
    return this.searchForm.get('Type_s')?.value;
  }

  getVehicles(): Observable<any> {
    return this.http.get(
      `${this.basePath}/vehicle/find/${this.selectedVehicle}`,
      this.httpOptions
    );
  }

  listSearch() {
    this.getVehicles().subscribe((data: any) => {
      this.filteredVehicules = data;
      console.log(data)
    });
    console.log(this.filteredVehicules);
    console.log(`${this.basePath}/vehicle/find/${this.selectedVehicle}`);
  }

  goToDriver(id: any) {
    this.router.navigate([`profile/${id}`]);
    localStorage.setItem('visitDriverId', id);
  }
}
