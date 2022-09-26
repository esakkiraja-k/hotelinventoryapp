import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AppConfig } from 'src/app/AppConfig/appConfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { RoomList } from '../rooms';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList:RoomList[] =   [];

  getRooms$ = this.http.get<RoomList[]>('api/rooms').pipe(
    shareReplay(1)
  ); 
        getRooms(){
          return this.http.get<RoomList[]>('api/rooms');
        }
        addRoom(room:RoomList){
          return this.http.post<RoomList[]>('api/rooms',room);
        }
        editRoom(room:RoomList){
          return this.http.put<RoomList[]>(`api/rooms/${room.roomNumber}`,room);
        }
        deleteRoom(id:string){
          return this.http.delete<RoomList[]>(`api/rooms/${id}`);
        }

        GetPhotos(){
          const request = new HttpRequest('GET',
          `https://jsonplaceholder.typicode.com/photos`,{
            reportProgress:true,
          });

          return this.http.request(request);

        }
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
 private http:HttpClient) {
    console.log('Room Sevice is intialized')
    console.log(this.config.apiEndpoint);
   }
}
