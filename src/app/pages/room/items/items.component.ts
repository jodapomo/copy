import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy, AfterViewInit  {

  @Input() items: any[];

  @ViewChild('itemsWrapper', { static: false }) itemsWrapperElement: ElementRef;
  @ViewChild('getMoreItemsLoader', { static: false }) getMoreItemsLoaderElement: ElementRef;

  private observer: IntersectionObserver;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setInfiniteScroll();
  }

  scrollItemsToBottom() {
    this.itemsWrapperElement.nativeElement.scrollTop = this.itemsWrapperElement.nativeElement.scrollHeight;
  }

  setInfiniteScroll() {

    const options = {
      root: this.itemsWrapperElement.nativeElement,
    };

    this.observer = new IntersectionObserver( ( [entry] ) => {

      if ( entry.isIntersecting ) {
        console.log('CARGUE MAS HP MP');
        this.addItem();
      }

    }, options);
    console.log('VOY');
    this.observer.observe(this.getMoreItemsLoaderElement.nativeElement);

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

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
