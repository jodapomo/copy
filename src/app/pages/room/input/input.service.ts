import { Injectable } from '@angular/core';
import { ItemsService } from '../items/shared/services/items.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  // tslint:disable-next-line: variable-name
  private _type: string;
  // tslint:disable-next-line: variable-name
  private _content: any;

  public cleanSubject: Subject<boolean>;

  public valid: boolean;

  constructor(
    private itemsService: ItemsService,
  ) {
    this.cleanSubject = new Subject();
  }


  sendItem() {
    if ( this.valid ) {
      const item = {
        type: this._type,
        ...this._content,
      };

      this.cleanSubject.next(true);

      this.itemsService.createItem(item).subscribe();
    }
  }

  public set type( type: string ) {
    this._type = type;
  }

  public get type(): string {
    return this._type;
  }

  public set content( content ) {
    this._content = content;
  }

  public get content() {
    return this._content;
  }


}
