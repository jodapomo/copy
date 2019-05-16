import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterRoomService {

  apiUrl: string;

  room: {
    id: number,
    password: string,
    username: string,
  }

  constructor(
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

    this.room = { id: undefined, password: '', username: '' };

  }

  checkCredentials() {

    const url = `${ this.apiUrl }/rooms/${ this.room.id }/credentials`;

    return this.http.post( url, { password: this.room.password } )
      .pipe(
        map( (res: any) => res.ok ),
      );

  }


  clearRoom() {
    this.room = { id: undefined, password: '', username: '' };
  }

  setRoomId( id: number ) {
    this.room.id = id;
  }

  setRoomPassword( password: string ) {
    this.room.password = password;
  }

  isRoomValid(): boolean {
    return this.room.id > 0;
  }
}
