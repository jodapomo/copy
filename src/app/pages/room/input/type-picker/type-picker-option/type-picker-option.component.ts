import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'type-picker-option',
  templateUrl: './type-picker-option.component.html',
  styleUrls: ['./type-picker-option.component.scss']
})
export class TypePickerOptionComponent implements OnInit {

  @Input() iconClass: string;
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
