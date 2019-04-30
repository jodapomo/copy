import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() fontSize: any = 200;

  constructor() {}

  ngOnInit() {
    this.fontSize = (this.fontSize).toString() + 'px';
  }

}
