import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EnterRoomService } from '../services/enter-room.service';

@Injectable({
  providedIn: 'root'
})
export class EnterRoomGuard implements CanActivate {
  
  constructor( 
    private enterRoomService: EnterRoomService,
    private router: Router,
  ) {}

  canActivate(): boolean {

    if ( this.enterRoomService.isRoomValid() ) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
  
}
