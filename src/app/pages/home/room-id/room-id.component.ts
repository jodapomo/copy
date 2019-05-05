import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-id',
  templateUrl: './room-id.component.html',
  styleUrls: ['./room-id.component.scss']
})
export class RoomIdComponent implements OnInit {

  loading: boolean;
  error: boolean;

  constructor() {

    this.loading = false;
    this.error = false;

  }

  ngOnInit() {
  }

}
