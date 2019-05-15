import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl: string;

  newRoom: {
    name: string,
    username: string,
  };

  loginRoom: {
    id: number,
    password: string,
    username: string,
  }

  constructor(
    private http: HttpClient,
  ) {
    
    this.apiUrl = environment.apiUrl;

    this.newRoom = { name: '', username: '' };
    this.loginRoom = { id: undefined, password: '', username: '' };

  }

  checkRoom( roomId: number ) {

    const url = `${ this.apiUrl }/rooms/${ roomId }/locked`;

    return this.http.get( url )
      .pipe(
        tap( res => console.log ),
      );


  }

  createRoom() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.post<Room>( url, this.newRoom )
      .pipe( 
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => {

          this.cleanNewRoom();

      }),
    );

  }



  isNewRoomNameSet(): boolean {
    return this.newRoom.name.length > 0;
  }

  cleanNewRoom() {
    this.newRoom = { name: '', username: '' };
  }

  cleanLoginRoom() {
    this.loginRoom = { id: undefined, password: '', username: '' };
  }

  setNewRoomName( name: string ) {
    this.newRoom.name = name;
  }

  setNewRoomUsername( username: string ) {
    this.newRoom.username = username;
  }

}
