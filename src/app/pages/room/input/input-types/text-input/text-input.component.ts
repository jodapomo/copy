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
    this.inputService.content = this.newTextItem;
    this.inputService.valid = false;

    this.cleanSubs = this.inputService.cleanSubject.subscribe( _ => {
      this.newTextItem.content = '';
      this.focusInput();
    });

  }

  onChange() {
    setTimeout(() => {
      if ( this.newTextItem.content.length > 0 ) {
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
