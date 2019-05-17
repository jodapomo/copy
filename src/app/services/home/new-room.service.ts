import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/room.model';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewRoomService {

  apiUrl: string;

  room: {
    name: string,
    password: string,
    username: string,
  };


  constructor(
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

    this.room = { name: '', password: '', username: '' };
  }

  createRoom() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.post<Room>( url, this.room )
      .pipe( 
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => {

          this.clearRoom();

      }),
    );

  }

  isRoomNameSet(): boolean {
    return this.room.name.length > 0;
  }

  clearRoom() {
    this.room = { name: '', password: '', username: '' };
  }


  setRoomName( name: string ) {
    this.room.name = name;
  }

  setRoomUsername( username: string ) {
    this.room.username = username;
  }


}
