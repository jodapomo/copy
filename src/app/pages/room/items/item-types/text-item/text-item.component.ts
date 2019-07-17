import { Component, OnInit, Input } from '@angular/core';
import { TextItem } from 'src/app/models/item-types/text-item.model';

@Component({
  selector: 'app-text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.scss']
})
export class TextItemComponent implements OnInit {

  @Input() item: TextItem;

  constructor() { }

  ngOnInit() {
  }

}
