import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { map, take } from 'rxjs/operators';
import { ITEM_TYPES } from 'src/app/models/item-types';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl: string;
  limit = 15;

  constructor(
    private http: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getItemsByRoomId( id: number, page: number ): Observable<Item[]> {

    const url = `${ this.apiUrl }/rooms/${ id }/items`;

    const params = new HttpParams()
      .set('page', String( page ))
      .set('pageSize', String(this.limit));

    return this.http.get( url, {params} )
      .pipe(
        map( (res: any) =>  res.items.reverse() ),
        map( (items: any[]) =>  items.map( item => new ITEM_TYPES[item.type]().deserialize(item) ) ),
        take(1),
      );
  }

}

