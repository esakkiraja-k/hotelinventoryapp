import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { catchError, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { RoomList, Rooms } from './rooms'
import { RoomsService } from './services/rooms.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit,DoCheck,AfterViewInit ,OnDestroy,



AfterViewChecked{
  //interpolation
  hotelName = 'Taj hotel';
  numberofRooms = 10;
  hideRooms = true;
  subscription!:Subscription;

  rooms: Rooms = {
    availableRooms: 5,
    bookedRooms: 4,
    totalRooms:10
  }
  title:string = 'Room List';
  roomList!: RoomList[];
  optedRoom!:RoomList;
  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });
  @ViewChild(HeaderComponent,{static:true}) headerComponent!:HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!:QueryList<HeaderComponent>;
  
  constructor(@SkipSelf() private roomsService:RoomsService) { }

  ngAfterViewChecked(): void {
    console.log("AfterViewChecked is called");    
  }
  ngAfterViewInit(): void {
    console.log(this.headerComponent);
    this.headerComponent.title  ="hello from Room View!!"
    console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = "This is last header!!"
  }
  ngDoCheck(): void {
    console.log("Do check is called")
  }
 error$ = new Subject<string>();
 getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
        //console.log(err);
       this.error$.next(err.message);
        return of([]);
      })
  );

  ngOnInit(): void {
   this.stream.subscribe ((data)=>{console.log(data)});
  //  this.subscription =  this.roomsService.getRooms$.subscribe(rooms =>{
  //   this.roomList = rooms;
  // }
  //   );

    this.roomsService.GetPhotos().subscribe((event) => {
      console.log(event);
    });
  }
  selected(room:RoomList){
    console.log(room);
    this.optedRoom = room;
    this.deleteRoom(room.roomNumber);
  }
  addRoom(){
    const room: RoomList = {
      roomNumber:'4',
      roomType:'premium Room',
      amenities:'AC,fridge,TV',
      price:1050,
      photos:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1503023345310-bd7c1de61c7d%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&tbnid=0sOgRvZZyWRMuM&vet=12ahUKEwivjtijrKz6AhVi81MKHS93CkwQMygCegUIARDcAQ..i&docid=ZaycYywhXLmIVM&w=1000&h=1250&q=images&ved=2ahUKEwivjtijrKz6AhVi81MKHS93CkwQMygCegUIARDcAQ',
      checkinTime: new Date('20-Nov-2022'),
      checkoutTime:new Date('25-Nov-2022'),
      rating:3.5
    };
   this.subscription =  this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
   // this.roomList = [...this.roomList,room];
    console.log(this.roomList);
  }
  toggle() {
    this.hideRooms = !this.hideRooms;
this.title = 'Change List'
  }
  editRoom(){
    const room: RoomList = {
      roomNumber:'3',
      roomType:'update Room',
      amenities:'AC,fridge,TV',
      price:1050,
      photos:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1503023345310-bd7c1de61c7d%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fhuman&tbnid=0sOgRvZZyWRMuM&vet=12ahUKEwivjtijrKz6AhVi81MKHS93CkwQMygCegUIARDcAQ..i&docid=ZaycYywhXLmIVM&w=1000&h=1250&q=images&ved=2ahUKEwivjtijrKz6AhVi81MKHS93CkwQMygCegUIARDcAQ',
      checkinTime: new Date('20-Nov-2022'),
      checkoutTime:new Date('25-Nov-2022'),
      rating:3.5
    };
    this.subscription = this.roomsService.editRoom(room).subscribe((data) =>{
      this.roomList = data;
    });
    
  }
  deleteRoom(id:string){
    this.subscription = this.roomsService.deleteRoom(id).subscribe((data) => {
      this.roomList = data;
    });
  }
  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
