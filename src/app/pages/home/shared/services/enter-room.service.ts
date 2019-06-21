import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { LoginService } from '../../../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class EnterRoomService {

  private apiUrl: string;

  private room: {
    id: number,
    locked: boolean,
    password: string,
    username: string,
  }

  private passwordChecked: boolean;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {

    this.apiUrl = environment.apiUrl;

    this.room = { id: undefined, locked: false, password: undefined, username: '' };

  }

  login() {
    return this.loginService.login( this.room )
      .pipe(
        tap( _ => this.clearRoom() )
      );
  }


  checkCredentials() {

    const url = `${ this.apiUrl }/rooms/${ this.room.id }/credentials`;

    return this.http.post( url, { password: this.room.password } )
      .pipe(
        map( (res: any) => res.ok ),
        tap( _ => this.passwordChecked = true ),
      );

  }


  clearRoom() {
    this.room = { id: undefined, locked: false, password: undefined, username: '' };
  }

  setRoomId( id: number ) {
    this.room.id = id;
  }

  setRoomLocked( locked: boolean ) {
    this.room.locked = locked;
  }

  setRoomPassword( password: string ) {
    this.room.password = password;
  }

  setRoomUsername( username: string ) {
    this.room.username = username;
  }

  setPasswordCheckedFalse() {
    this.passwordChecked = false;
  }

  getRoomId(): number {
    return this.room.id;
  }

  isRoomValid(): boolean {
    return this.room.id && this.room.id > 0;
  }

  isRoomLoggable(): boolean {

    if ( this.room.locked ) {

      return this.room.id && this.room.id > 0 && this.passwordChecked;

    } else {

      return this.room.id && this.room.id > 0;

    }

  }

}
