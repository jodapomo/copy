import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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

  constructor() {

    this.apiUrl = environment.apiUrl;

    this.room = { id: undefined, password: '', username: '' };

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
