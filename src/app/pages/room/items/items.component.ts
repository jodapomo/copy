// tslint:disable-next-line: max-line-length
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { RoomService } from '../shared/services/room.service';
import { Item } from '../../../models/item.model';
import { ItemsService } from './shared/services/items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() items: Item[];
  @Input() roomId: number;

  @ViewChild('itemsWrapper', { static: false }) itemsWrapperElement: ElementRef;
  @ViewChild('getMoreItemsLoader', { static: false }) getMoreItemsLoaderElement: ElementRef;

  private triggerGetMoreItems: IntersectionObserver;

  page = 1;
  limit: number;

  thereMoreItems =  false;

  newItemsSubs: Subscription;

  constructor(
    private itemsService: ItemsService,
  ) {}

  ngOnInit() {
    this.limit = this.itemsService.limit;

    this.newItemsSubs = this.itemsService.newItemsSubject.subscribe( (item: Item) => this.newItem(item));
  }

  ngOnChanges( changes: SimpleChanges ) {

    // If it is the first time items are fetched -> Set the scroll to bottom and set trigger
    if (  changes.items &&
          !changes.items.previousValue  &&
          changes.items.currentValue
    ) {

      if ( this.items.length === this.limit ) {
        this.thereMoreItems = true;
      }

      // wait until the @ViewChild are accessible
      setTimeout(() => {

        this.scrollToBottom();

        // no set Trigger if there are less items in the first fetch than in the limit (pageSize)
        if ( this.items.length === this.limit ) {
          this.setTriggerGetMoreItems();
        }

      }, 0);

    }

  }

  newItem( item: Item ) {
    if (item) {
      this.items.push(item);
      setTimeout(() => {
        this.scrollToBottom();
      });
    }
  }

  getMoreItems() {

    this.itemsService.getItemsByRoomId( this.roomId, this.page + 1)
    .subscribe( (items: Item[]) => {
      this.page++;

      // if there are not more items to get
      if ( items.length < this.limit ) {
        // hide loader and disable trigger
        this.thereMoreItems = false;
        this.triggerGetMoreItems.disconnect();
      }

      this.setItemsAndMoveScroll(items);

      });
  }

  setItemsAndMoveScroll( items: Item[] ) {

    // store scroll position before add items
    const currentScrollTop = this.itemsWrapperElement.nativeElement.scrollTop;
    const currentScrollHeight = this.itemsWrapperElement.nativeElement.scrollHeight;

    // add items
    this.items.unshift(...items);

    setTimeout(() => {

      // set scroll position to maintain scroll position in list when new items get added
      const newScrollHeight = this.itemsWrapperElement.nativeElement.scrollHeight;
      this.itemsWrapperElement.nativeElement.scrollTop = ( newScrollHeight - currentScrollHeight ) + currentScrollTop;

    }, 0);

  }

  addItem() {

  }

  scrollToBottom() {
    this.itemsWrapperElement.nativeElement.scrollTop = this.itemsWrapperElement.nativeElement.scrollHeight;
  }

  setTriggerGetMoreItems() {

    const options = {
      root: this.itemsWrapperElement.nativeElement,
      threshold: 0
    };

    // IntersectionObserver: https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/
    this.triggerGetMoreItems = new IntersectionObserver( ( [entry] ) => {

      // If the loader appears in the view -> getMoreItems
      if ( entry.isIntersecting ) {
        this.getMoreItems();
      }

    }, options);

    this.triggerGetMoreItems.observe( this.getMoreItemsLoaderElement.nativeElement );

  }

  ngOnDestroy() {
    if ( this.triggerGetMoreItems ) {
      this.triggerGetMoreItems.disconnect();
    }
  }

}
