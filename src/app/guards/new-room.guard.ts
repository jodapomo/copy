import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class NewRoomGuard implements CanActivate {

  constructor( 
    private roomService: RoomService,
    private router: Router,
  ) {}

  canActivate(): boolean {

    if ( this.roomService.newRoomNameIsSet() ) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
  
}
