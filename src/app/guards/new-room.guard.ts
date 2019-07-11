import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NewRoomService } from '../pages/home/shared/services/new-room.service';

@Injectable({
  providedIn: 'root'
})
export class NewRoomGuard implements CanActivate {

  constructor(
    private newRoomService: NewRoomService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const step = next.data['step'];

    if ( step === 'password' ) {

      if ( this.newRoomService.isRoomNameSetAndLocked() ) {
        return true;
      }

    } else if ( step === 'username' ) {

      if ( this.newRoomService.isRoomCreatable() ) {
        return true;
      }

    }

    this.router.navigate(['/']);
    return false;
  }

}
