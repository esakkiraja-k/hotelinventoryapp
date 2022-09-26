import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

   room: RoomList = {
    roomNumber:'11',
    roomType:'',
    amenities:'',
    price:0,
    photos:'',
    checkinTime: new Date(),
    checkoutTime:new Date(),
    rating:0
  };
  constructor( private roomService:RoomsService) { }
  AddRoom(){
    this.roomService.addRoom(this.room).subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit(): void {
  }

}
