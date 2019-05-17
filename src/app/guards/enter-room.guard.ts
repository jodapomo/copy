import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EnterRoomService } from '../services/home/enter-room.service';

@Injectable({
  providedIn: 'root'
})
export class EnterRoomGuard implements CanActivate {
  
  constructor( 
    private enterRoomService: EnterRoomService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const step = next.data['step'];

    if ( step === 'password' ) {

      if ( this.enterRoomService.isRoomValid() ) {
        return true;
      }

    } else if ( step === 'username' ) {

      if ( this.enterRoomService.isRoomLoggable() ) {
        return true;
      }

    }

    this.router.navigate(['/']);
    return false;
  }
  
}
