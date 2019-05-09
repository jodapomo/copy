import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl: string;

  newRoom: { name: string, username: string };
  creatingRoom: boolean;

  room: Room;

  
  constructor( 
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;
    this.creatingRoom = false;

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


  createRoom( room: Room ) {

  }

  newRoomNameIsSet(): boolean {
    return this.newRoom.name.length > 0;
  }

  setNewRoomName( name: string ) {
    this.newRoom.name = name;
  }

  setNewRoomUsername( username: string ) {
    this.newRoom.username = username;
  }

}
