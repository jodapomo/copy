import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NewRoomService {

  apiUrl: string;

  room: {
    name: string,
    password: string,
    username: string,
    locked: boolean,
  };


  constructor(
    private loginService: LoginService,
  ) {

    this.apiUrl = environment.apiUrl;

    this.room = { name: '', password: undefined, username: '', locked: false };
  }

  createRoomAndLogin() {

    return this.loginService.createRoomAndLogin( this.room )
      .pipe(
        tap( _ => this.clearRoom() )
      );

  }

  isRoomNameSetAndLocked(): boolean {
    return this.room.name.length > 0 && this.room.locked;
  }

  isRoomNameSet(): boolean {
    return this.room.name && this.room.name.length > 0;
  }

  isRoomCreatable(): boolean {

    if ( this.room.locked ) {

      return ( this.room.name.length > 0 ) && this.room.password && ( this.room.password.length > 0 );

    } else {

      return this.room.name && this.room.name.length > 0;

    }

  }

  clearRoom() {
    this.room = { name: '', password: undefined, username: '', locked: false };
  }

  setRoomName( name: string ) {
    this.room.name = name;
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

  getRoomName() {
    return this.room.name;
  }

}
