import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewRoomService } from '../shared/services/new-room.service';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.scss']
})
export class RoomNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  presetedValue: string;

  locked: boolean;

  constructor(
    private router: Router,
    private newRoomService: NewRoomService,
  ) {

    this.loading = false;
    this.error = false;
    this.locked = false;

    this.errorMessage = 'An error occurred with the name selection.';

  }

  ngOnInit() {

    if ( this.newRoomService.isRoomNameSet() ) {
      this.presetedValue = this.newRoomService.getRoomName();
    }

  }

  onSend( roomName: string ) {

    this.newRoomService.setRoomName( roomName );

    if ( this.locked ) {

      this.newRoomService.setRoomLocked( true );
      this.router.navigate(['/new-room/password']);

    } else {

      this.newRoomService.setRoomLocked( false );
      this.router.navigate(['/new-room/username']);

    }

  }

  onFormatError( error: boolean ) {

    if ( error ) {

      this.error = true;
      this.errorMessage = 'Invalid format. Only numbers and letters are allowed - e.g. "Room 1".';

    } else {

      this.error = false;

    }

  }

  onTyping( value: string ) {

    if ( value.length === 0 ) {
      this.newRoomService.clearRoom();
    }

    this.error = false;
    return;
  }

  onClean() {
    this.newRoomService.clearRoom();
  }

}
