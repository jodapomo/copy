import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { InputService } from '../../input.service';
import { Subscription } from 'rxjs';
import { NewLinkItem } from 'src/app/models/add-item/new-link-item.model';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss']
})
export class LinkInputComponent implements OnInit, AfterViewInit, OnDestroy {

  newLinkItem: NewLinkItem = { link: '' };

  @ViewChild('input', { static: false }) inputElement: ElementRef;

  cleanSubs: Subscription;

  constructor(
    private inputService: InputService,
  ) { }

  ngOnInit() {

    if ( this.inputService.plainTextInput ) {
      this.newLinkItem.link = this.inputService.plainTextInput;
    }

    this.inputService.content = this.newLinkItem;
    this.inputService.valid = false;

    this.cleanSubs = this.inputService.cleanSubject.subscribe( _ => {
      this.inputService.reset();
    });

  }


  onChange() {
    setTimeout(() => {
      this.inputService.plainTextInput = this.newLinkItem.link;
      if ( this.newLinkItem.link.length > 0 ) {

        if ( !this.inputService.isLink(this.newLinkItem.link) ) {
          this.inputService.changeType('text');
          return;
        }

        this.inputService.valid = true;
        return;
      }

      this.inputService.valid = false;

    });
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  focusInput() {
    this.inputElement.nativeElement.focus();
  }


  ngOnDestroy(): void {
    this.cleanSubs.unsubscribe();
  }

}
