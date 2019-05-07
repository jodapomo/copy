import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl: string;

  constructor( 
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

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

}
