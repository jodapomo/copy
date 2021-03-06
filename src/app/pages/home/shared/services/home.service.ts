import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../../../../models/room.model';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl: string;


  room: {
    id: number,
    password: string,
    username: string,
  };

  constructor(
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

  }

  checkRoom( roomId: number ) {

    const url = `${ this.apiUrl }/rooms/${ roomId }/locked`;

    return this.http.get( url )
      .pipe(
        map( (res: any) => res.locked ),
      );

  }

}
