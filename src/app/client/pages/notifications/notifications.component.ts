
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  @Input() title='';
  
  
  
  public show=false;
  
  ngOnInit(): void {}
 
  showModal(){
    this.show=!this.show;
  }
  hideModal(){
    this.show=false;
  }
}
