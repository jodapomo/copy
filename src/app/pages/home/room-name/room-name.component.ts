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

  name: string;

  constructor() {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the name selection.'

  }

  ngOnInit() {
  }

  onFormatError( error: boolean ) {

    if( error ) {

      this.error = true;
      this.errorMessage = 'Invalid format. Only numbers and letters are allowed - e.g. "Room 1".';

    } else {

      this.error = false;

    }

  }

}
