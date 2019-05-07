import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-input-button',
  templateUrl: './home-input-button.component.html',
  styleUrls: ['./home-input-button.component.scss']
})
export class HomeInputButtonComponent implements OnInit {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() loading: boolean;
  @Input() backButton: boolean;
  @Input() tooltipMessage: string;
  @Input() error: boolean;
  @Input() errorMessage: string;

  @Output() typing: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() send: EventEmitter<number | string> = new EventEmitter<number | string>();
  

  @ViewChild('input') inputElement: ElementRef;

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

    if ( this.value.length > 0 ) {
      this.send.emit( this.value )
    }

  }

  onTyping() {

    if ( this.value.length > 0 ) {
      this.typing.emit( this.value )
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
