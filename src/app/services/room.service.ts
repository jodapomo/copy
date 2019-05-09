import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl: string;

  newRoom: { name: string, username: string };

  room: Room;

  
  constructor( 
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

    this.newRoom = { name: '', username: '' };
  }

  getRooms() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.get( url );

  }

  getRoomById( id: number ) {

    const url = `${ this.apiUrl }/rooms/${ id }`

    return this.http.get( url );

  }


  createRoom() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.post<Room>( url, this.newRoom )
      .pipe( 
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => {

          this.cleanNewRoom();
          this.room = room;
          
        }),
      );

  }

  newRoomNameIsSet(): boolean {
    return this.newRoom.name.length > 0;
  }

  cleanNewRoom() {
    this.newRoom = { name: '', username: '' };
  }

  setNewRoomName( name: string ) {
    this.newRoom.name = name;
  }

  setNewRoomUsername( username: string ) {
    this.newRoom.username = username;
  }

}
