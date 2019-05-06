import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Room } from '../models/room';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiUrl: string;

  constructor( 
    private http: HttpClient,
    private errorService: ErrorService
  ) {

    this.apiUrl = environment.apiUrl;

  }

  getRooms() {

    const url = `${ this.apiUrl }/rooms`

    return this.http.get( url )
      .pipe( catchError( this.errorService.handleError ) );

  }

  getRoomById( id: number ) {

    const url = `${ this.apiUrl }/rooms/${ id }`

    return this.http.get( url )
      .pipe( catchError( this.errorService.handleError ) );

  }


  createRoom( room: Room ) {

  }

}
