import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Room } from '../../../../models/room.model';
import { tap, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITEM_TYPES } from 'src/app/models/item-types';
import { Item } from '../../../../models/item.model';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { AuthService } from '../../../../services/auth.service';
import { TempUser } from '../../../../models/temp-user.model';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl: string;

  room: Room;
  limit = 15;

  userJoin = this.ss.fromEvent<TempUser>('userJoin');
  userLeave = this.ss.fromEvent<TempUser>('userLeave');


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ss: SocketService,
  ) {
    this.apiUrl = environment.apiUrl;
  }


  getRoomById( id: number ): Observable<Room> {

    const url = `${ this.apiUrl }/rooms/${ id }`;

    const params = new HttpParams().set('limit', String(this.limit));

    return this.http.get( url, {params} )
      .pipe(
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => this.room = room ),
      );

  }

  leave() {
    this.authService.emitLeave();
  }

}
