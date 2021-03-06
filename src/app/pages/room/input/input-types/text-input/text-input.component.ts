import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NewTextItem } from 'src/app/models/add-item/new-text-item.model';
import { InputService } from '../../input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, AfterViewInit, OnDestroy {

  newTextItem: NewTextItem = { content: '' };

  @ViewChild('input', { static: false }) inputElement: ElementRef;

  cleanSubs: Subscription;

  constructor(
    private inputService: InputService,
  ) {}

  ngOnInit() {

    if ( this.inputService.plainTextInput ) {
      this.newTextItem.content = this.inputService.plainTextInput;
    }

    this.inputService.content = this.newTextItem;
    this.inputService.valid = false;

    this.cleanSubs = this.inputService.cleanSubject.subscribe( _ => {
      this.newTextItem.content = '';
      this.inputService.reset();
      this.focusInput();
    });

  }

  onChange() {
    setTimeout(() => {
      this.inputService.plainTextInput = this.newTextItem.content;
      if ( this.newTextItem.content.length > 0 ) {

        if ( this.inputService.isLink(this.newTextItem.content) ) {
          this.inputService.changeType('link');
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
