import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      const roomId = Number( next.paramMap.get('id') );

      const thereSessionObservable = this.authService.checkIfSessionExistAndSet( roomId );

      return thereSessionObservable.pipe(
        take(1),
        map( thereSession => {

        if ( thereSession ) {
          return true;
        }

        this.router.navigate(['/']);
        return false;

      }));

  }

}
