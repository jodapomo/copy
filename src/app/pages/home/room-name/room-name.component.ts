import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.scss']
})
export class RoomNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor() {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the name selection.'

  }

  ngOnInit() {
  }

}
