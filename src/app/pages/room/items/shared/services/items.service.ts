import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { map, take, tap } from 'rxjs/operators';
import { ITEM_TYPES } from 'src/app/models/item-types';
import { AuthService } from '../../../../../services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl: string;
  limit = 15;

  newItemsSubject: Subject<Item>;

  newItem = this.ss.fromEvent<Item>('newItem');

  constructor(
    private http: HttpClient,
    private ss: SocketService,
    private authService: AuthService,
  ) {
    this.apiUrl = environment.apiUrl;
    this.newItemsSubject = new Subject<Item>();

    this.newItem
      .pipe(
        map( (newItem: any) =>   new ITEM_TYPES[newItem.type]().deserialize(newItem)  ),
      )
      .subscribe((newItem: Item) => this.newItemsSubject.next(newItem));
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

  createItem( item ) {

    const url = `${ this.apiUrl }/rooms/${ this.authService.roomId }/items`;

    return this.http.post( url, item )
      .pipe(
        map( (res: any) =>   res.item  ),
        map( (newItem: any) =>   new ITEM_TYPES[newItem.type]().deserialize(newItem)  ),
        tap( (newItem: Item) => this.newItemsSubject.next(newItem) ),
        tap(  (newItem: Item) => this.emitNewItem( newItem ) ),
        take(1),
      );
  }

  emitNewItem( item: Item ) {
    this.ss.socket.emit('newItem', item);
  }
}

