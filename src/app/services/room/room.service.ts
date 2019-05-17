import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/room.model';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TempUser } from '../../models/temp-user.model';


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
    this.newRoom = { name: '', username: '' };

    this.creatingRoom = false;

  }

  getRooms() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.get( url );

  }

  getRoomById( id: number ) {

    const url = `${ this.apiUrl }/rooms/${ id }`

    return this.http.get( url )
      .pipe(
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => this.room = room ),
      );

  }

}
