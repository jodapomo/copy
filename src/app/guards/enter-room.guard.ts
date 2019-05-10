import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class EnterRoomGuard implements CanActivate {
  
  constructor( 
    private roomService: RoomService,
    private router: Router,
  ) {}

  canActivate(): boolean {

    if ( this.roomService.validRoom() ) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
  
}
