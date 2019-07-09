import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-input-button',
  templateUrl: './home-input-button.component.html',
  styleUrls: ['./home-input-button.component.scss']
})
export class HomeInputButtonComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() loading: boolean;
  @Input() backButton: boolean;
  @Input() tooltipMessage: string;
  @Input() error: boolean;
  @Input() errorMessage: string;

  @Input() presetedValue: string;

  @Output() typing: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() send: EventEmitter<number | string> = new EventEmitter<number | string>();

  @Output() clean: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() formatError: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild('input', { static: false }) inputElement: ElementRef;
  @ViewChild('form', { static: true }) ngForm: NgForm;

  formChangesSubscription: any;

  value: string;

  enter: boolean;

  constructor( 
    private location: Location,
    public router: Router,
  ) {

    this.loading = false;
    this.enter = false;
    this.backButton = false;
    this.error = false;

    this.type = 'text';
    this.tooltipMessage = '';
    this.errorMessage = '';

    this.value = '';

  }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges ): void {

    if ( changes.presetedValue &&
        changes.presetedValue.currentValue &&
        String( changes.presetedValue.currentValue ).length > 0 ) {

      this.value = String( this.presetedValue );

    }

  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }


  pressButton() {
    if ( this.value.length > 0 ) {
      this.enter = true;
    }
  }

  releaseButtonAndSend() {
    if ( this.value.length > 0 ) {
      this.enter = false;
      this.onSend();
    }
  }


  clear() {
    this.value = '';
    this.clean.emit(true);
    this.inputElement.nativeElement.focus();
  }

  onSend() {

    if ( this.value.length > 0 && this.ngForm.valid ) {

      this.send.emit( this.value );

    }

  }

  onTyping() {

    this.typing.emit( this.value );

    if ( (this.ngForm.valid || this.ngForm.pristine) ) {

      this.formatError.emit( false );

    } else {

      this.formatError.emit( true );

    }

  }

  back() {

    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }

  }

}
