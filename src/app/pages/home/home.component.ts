import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  enter = false;

  constructor() { }

  ngOnInit() {
  }

  pressButton() {
    this.enter = true;

    setTimeout(() => {
      this.enter = false;
    }, 100);

  }

}
