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

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['order'];
  }

}
