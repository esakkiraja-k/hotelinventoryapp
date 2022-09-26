import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  id!:string
  id$ = this.router.params.pipe(
    map(params =>  params['id'])
  );
  ngOnInit(): void {

  
    // this.router.params.subscribe((params) => {
    // this.id = params['id'];
    //   console.log(params['id'])});

    //this.router.paramMap.subscribe((params) => {params.get('id')});
  }

}