import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home3d-button',
  templateUrl: './home3d-button.component.html',
  styleUrls: ['./home3d-button.component.scss']
})
export class Home3dButtonComponent implements OnInit {

  @Input() content: string;
  @Input() route: string;

  constructor( public router: Router ) {
    this.content = '';
    this.route = '';
  }

  ngOnInit() {
  }

}
