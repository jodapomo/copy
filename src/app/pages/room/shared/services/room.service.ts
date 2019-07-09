import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Room } from '../../../../models/room.model';
import { tap, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl: string;

  room: Room;
  limit = 15;


  constructor(
    private http: HttpClient,
  ) {

    this.apiUrl = environment.apiUrl;

  }

  getRooms() {

    const url = `${ this.apiUrl }/rooms`;

    return this.http.get( url );

  }

  getRoomById( id: number ) {

    const url = `${ this.apiUrl }/rooms/${ id }`;

    const params = new HttpParams().set('limit', String(this.limit));

    return this.http.get( url, {params} )
      .pipe(
        map( (res: any) =>  new Room().deserialize( res.room ) ),
        tap( (room: Room) => this.room = room ),
      );

  }

  getItemsByRoomId( id: number, page: number ) {

    const url = `${ this.apiUrl }/rooms/${ id }/items`;

    const params = new HttpParams()
      .set('page', String( page ))
      .set('pageSize', String(this.limit));

    return this.http.get( url, {params} )
      .pipe(
        map( (res: any) =>  res.items.reverse() ),
        tap( items => console.log(items)),
        take(1),
      );

  }

}
