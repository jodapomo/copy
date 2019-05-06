import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideHomeRouterAnimation } from './animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideHomeRouterAnimation
  ]
})
export class HomeComponent implements OnInit {

  currentRouteOrder: number;

  constructor(
  ) {}

  ngOnInit() {
  }
  
  getRouteAnimation(outlet: RouterOutlet) {

    if ( outlet.activatedRouteData.order === undefined ) {
      return -1;
    } else {
      return outlet.activatedRouteData.order
    }

  }  

}
