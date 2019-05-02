import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-input-button',
  templateUrl: './home-input-button.component.html',
  styleUrls: ['./home-input-button.component.scss']
})
export class HomeInputButtonComponent implements OnInit {

  @Input() placeholder: string;
  @Input() type: string;
  @Input() loading: boolean;

  value: string;

  erase: boolean;
  enter: boolean;

  constructor() {
    this.loading = false;
    this.erase = false;
    this.enter = false;

    this.type = '';

    this.value = '';

  }

  ngOnInit() {
  }

  pressButton() {
    this.enter = true;

    setTimeout(() => {
      this.enter = false;
    }, 100);

  }

  send() {
    console.log( this.value.length > 0 );
    console.log(this.value);
  }

}
