import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';
import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TempUserService } from './temp-user.service';
import { TempUser } from '../models/temp-user.model';


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
    private tempUserService: TempUserService,
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

  // look if the user was in the room before, if not, add the new user to the room
  enterRoom( username: string ) {

    let user = this.room.temp_users.find( user => user.username === username );

    if ( user ) {

      this.tempUserService.login( user );

      return of( this.room.id )

    }

    const url = `${ this.apiUrl }/rooms/${ this.room.id }/users`;

    return this.http.post( url, { username } )
      .pipe( 
        map( (res: any) =>  new TempUser().deserialize( res.user ) ),
        tap( (user: TempUser) => {

          this.room.temp_users.push( user );
          
          this.tempUserService.login( user );
          
        }),
        map( _ => this.room.id ),
      );

  }

  isValidRoom(): boolean {
    return this.room &&  this.room._id.length > 0;
  }



}
