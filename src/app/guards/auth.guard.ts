import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { HomeService } from '../pages/home/shared/services/home.service';
import { EnterRoomService } from '../pages/home/shared/services/enter-room.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private homeServie: HomeService,
    private enterRoomService: EnterRoomService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      const roomId = Number( next.paramMap.get('id') );

      const thereSessionObservable = this.authService.checkIfSessionExistAndSet( roomId );

      return thereSessionObservable
        .pipe(
          catchError( _ => {
            this.router.navigate(['/'], { queryParams: { error: 'Something bad happened; please try again later (server).' } });
            return of(false);
          }),
          take(1),
          map( thereSession => {

            if ( thereSession ) {
              return true;
            }

            this.homeServie.checkRoom( roomId )
              .pipe(take(1))
              .subscribe( locked => {

                this.enterRoomService.setRoomId( roomId );

                if ( locked ) {

                  this.enterRoomService.setRoomLocked( true );
                  this.router.navigate([ '/enter-room/password' ]);
                  return false;

                } else {

                  this.enterRoomService.setRoomLocked( false );
                  this.router.navigate([ '/enter-room/username' ]);
                  return false;

                }

              }, error => {
                this.router.navigate(['/'], { queryParams: { error }});
                return false;
              });
          }),
        );

  }

}
