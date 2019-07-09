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
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';

import { RoomService } from '../shared/services/room.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit  {

  @Input() items: any[];
  @Input() roomId: number;

  @ViewChild('itemsWrapper', { static: false }) itemsWrapperElement: ElementRef;
  @ViewChild('getMoreItemsLoader', { static: false }) getMoreItemsLoaderElement: ElementRef;

  @ViewChildren('itemRef', {read: ElementRef}) itemsElement: QueryList<ElementRef>;

  latestItemOnView: ElementRef;

  page = 1;
  limit: number;
  thereMoreItems =  false;

  private observer: IntersectionObserver;

  constructor(
    private roomService: RoomService,
  ) {}

  ngOnInit() {
    this.limit = this.roomService.limit;
  }

  ngOnChanges( changes: SimpleChanges ) {

    if (  changes.items &&
          !changes.items.previousValue  &&
          changes.items.currentValue
    ) {

      if ( this.items.length === this.limit ) {
        this.thereMoreItems = true;
      }

      setTimeout(() => {

        this.scrollItemsToBottom();

        if ( this.items.length === this.limit ) {
          this.setInfiniteScroll();
        }

      }, 0);

    }

  }

  ngAfterViewInit(): void {


    this.itemsElement.changes.subscribe( (r) => {

      console.log('CAMBIO');
      this.latestItemOnView = this.itemsElement.first;
      console.log(this.itemsElement.first);

    });

  }



  getMoreItems() {
    this.page++;
    console.log('PAGE:', this.page);
    this.roomService.getItemsByRoomId( this.roomId, this.page)
      .subscribe( (items: any[]) => {

        this.thereMoreItems = false;

        if ( items.length < this.limit ) {

          this.thereMoreItems = false;
          this.observer.disconnect();
        }

        return this.items.unshift(...items);
      });
  }

  addItem() {

    const item = {
      content: 'added from angular',
      type: 'Angular',
      createdAt: new Date(),
    };

    setTimeout(() => {
      this.items.unshift(item);
    }, 1000);

  }


  scrollItemsToBottom() {
    this.itemsWrapperElement.nativeElement.scrollTop = this.itemsWrapperElement.nativeElement.scrollHeight;
  }

  scrollToLatestItemOnView() {
    console.log('SCROLL');

    this.latestItemOnView.nativeElement.scrollIntoView();
  }

  setInfiniteScroll() {

    const options = {
      root: this.itemsWrapperElement.nativeElement,
      threshold: 0
    };

    this.observer = new IntersectionObserver( ( [entry] ) => {

      if ( entry.isIntersecting ) {
        console.log('GET MORE ITEMS');
        this.getMoreItems();
      }

    }, options);

    this.observer.observe( this.getMoreItemsLoaderElement.nativeElement );

  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
