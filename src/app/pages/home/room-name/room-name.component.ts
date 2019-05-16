import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.scss']
})
export class RoomNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private roomService: RoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the name selection.'

  }

  ngOnInit() {
  }

  onSend( roomName: string ) {

    // this.roomService.setNewRoomName( roomName );

    // this.router.navigate(['/new-room/username']);

  }

  onFormatError( error: boolean ) {

    if( error ) {

      this.error = true;
      this.errorMessage = 'Invalid format. Only numbers and letters are allowed - e.g. "Room 1".';

    } else {

      this.error = false;

    }

  }

  onTyping( roomId: number ) {
    this.error = false;
    return;
  }

}
