import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from "./localstorage.token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template:'<h1>hello world</h1>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit,OnInit{
  /**
   *
   */
  constructor(@Optional() private loggerService:LoggerService,
  @Inject(localStorageToken) private localStorage:Storage) {
    
    
  }
  ngOnInit(): void {
    this.loggerService?.log('AppComponent.Init() called!!');
    console.log(this.name);
    this.name.nativeElement.innerText = "Leela Palace";
    this.localStorage.setItem('name','Raja');
  }
  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberofRooms = 1000;
  }
  
  title = 'hotelinventoryapp';
  role = 'Admin';

  @ViewChild('user',{ read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('name', {static:true}) name!: ElementRef;

}
