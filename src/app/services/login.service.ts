import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {

    this.apiUrl = environment.apiUrl;

  }

  login( loginRoom ) {

    const url = `${ this.apiUrl }/rooms/${ loginRoom.id }/login`;

    return this.http.post( url, loginRoom )
      .pipe(
        tap( (res: any) => this.authService.createSession( res.user, res.token, res.roomId ) ),
        map( (res: any) => res.roomId ),
      );

  }

  createRoomAndLogin( newRoom ) {

    const url = `${ this.apiUrl }/rooms/login`;

    return this.http.post( url, newRoom )
      .pipe(
        tap( (res: any) => this.authService.createSession( res.user, res.token, res.roomId ) ),
        map( (res: any) => res.roomId ),
      );

  }

}
