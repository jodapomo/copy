import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-input-button',
  templateUrl: './home-input-button.component.html',
  styleUrls: ['./home-input-button.component.scss']
})
export class HomeInputButtonComponent implements OnInit, AfterViewInit {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() loading: boolean;
  @Input() backButton: boolean;
  @Input() tooltipMessage: string;
  @Input() error: boolean;
  @Input() errorMessage: string;

  @Output() typing: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() send: EventEmitter<number | string> = new EventEmitter<number | string>();
  
  @Output() formatError: EventEmitter<boolean> = new EventEmitter<boolean>();
  

  @ViewChild('input') inputElement: ElementRef;
  @ViewChild('form') ngForm: NgForm;

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
    this.inputElement.nativeElement.focus();
  }

  onSend() {

    if ( this.value.length > 0 && this.ngForm.valid ) {

      this.send.emit( this.value );
      
    }

  }

  onTyping() {
    
    if ( this.value.length > 0 ) {

      this.typing.emit( this.value );

    }

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
