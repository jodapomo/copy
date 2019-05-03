import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

    this.type = 'text';

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
      this.send();
    }
  }

  clear() {
    this.value = '';
    this.inputElement.nativeElement.focus();
  }

  send() {

    if ( this.value.length > 0 ) {
      console.log( this.value.length > 0 );
      console.log(this.value);
    }

  }

  back() {
    console.log(window.history);
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }

  }

}
