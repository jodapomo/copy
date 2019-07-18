import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  @Input('big') _big = false;

  constructor() { }

  ngOnInit() {
  }

  @HostBinding('class.big')
  get big() {
    return this._big;
  }

}
