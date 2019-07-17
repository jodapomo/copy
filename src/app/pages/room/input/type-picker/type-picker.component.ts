import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { InputService } from '../input.service';

@Component({
  selector: 'app-type-picker',
  templateUrl: './type-picker.component.html',
  styleUrls: ['./type-picker.component.scss']
})
export class TypePickerComponent implements OnInit {

  type = 'text';
  // @Output() typeChange = new EventEmitter();

  constructor(
    private inputService: InputService,
  ) { }

  ngOnInit() {
    this.inputService.type = this.type;
  }

}
