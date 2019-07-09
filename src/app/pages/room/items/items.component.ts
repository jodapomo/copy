// tslint:disable-next-line: max-line-length
import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { RoomService } from '../shared/services/room.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() items: any[];

  @ViewChild('itemsWrapper', { static: false }) itemsWrapperElement: ElementRef;
  @ViewChild('getMoreItemsLoader', { static: false }) getMoreItemsLoaderElement: ElementRef;

  page = 1;
  limit: number;

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

      setTimeout(() => {

        this.scrollItemsToBottom();

        if ( this.items.length === this.limit ) {
          this.setInfiniteScroll();
        }
      }, 0);
    }

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

  setInfiniteScroll() {

    const options = {
      root: this.itemsWrapperElement.nativeElement,
      threshold: 0
    };

    this.observer = new IntersectionObserver( ( [entry] ) => {

      if ( entry.isIntersecting ) {
        console.log('GET MORE ITEMS');
        this.addItem();
      }

    }, options);

    this.observer.observe( this.getMoreItemsLoaderElement.nativeElement );

  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
