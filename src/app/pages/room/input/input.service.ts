import { Injectable } from '@angular/core';
import { ItemsService } from '../items/shared/services/items.service';
import { Subject } from 'rxjs';
import { urlRegx } from 'src/app/utils/urlRegex';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  // tslint:disable-next-line: variable-name
  private _type: string;
  // tslint:disable-next-line: variable-name
  private _content: any;

  public plainTextInput: string;

  public cleanSubject: Subject<boolean>;
  public typeChangeSubject: Subject<string>;

  // tslint:disable-next-line: variable-name
  public _valid = false;
  public sendingItem = false;

  constructor(
    private itemsService: ItemsService,
  ) {
    this.cleanSubject = new Subject();
    this.typeChangeSubject = new Subject();
  }


  sendItem() {
    if ( this.valid ) {
      const item = {
        type: this._type,
        ...this._content,
      };

      this.cleanSubject.next(true);

      this.sendingItem = true;

      this.itemsService.createItem(item).subscribe( _ => this.sendingItem = false );
    }
  }

  isLink( value: string ) {
    if ( urlRegx.test(value.trim()) ) {
      return true;
    }
    return false;
  }

  changeType( type: string ) {
    if ( type !== this._type ) {
      this.typeChangeSubject.next(type);
      this._type = type;
    }
  }

  reset() {
    this.plainTextInput = undefined;
    this.changeType('text');
  }

  public set type( type: string ) {
    this.changeType(type);
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

  public set valid( valid ) {
    // wait next tick
    setTimeout(() => {
      this._valid = valid;
    });
  }

  public get valid() {
    return this._valid;
  }


}
