import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

  }

  login( loginRoom ) {

    const url = `${ this.apiUrl }/rooms/${ loginRoom.id }/login`;

    return this.http.post( url, loginRoom )
      .pipe(
        tap( res => console.log(res))
      );

  }

  createRoomAndLogin( newRoom ) {

    const url = `${ this.apiUrl }/rooms`;

    return this.http.post( url, newRoom )
      .pipe(
        tap( res => console.log(res) ),
      );

  }

}
