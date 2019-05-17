import { Component, OnInit } from '@angular/core';
import { EnterRoomService } from '../../../services/home/enter-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-password',
  templateUrl: './room-password.component.html',
  styleUrls: ['./room-password.component.scss']
})
export class RoomPasswordComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  password: string;

  constructor(
    private router: Router,
    private enterRoomService: EnterRoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the password.'

  }

  ngOnInit() {
    this.enterRoomService.setPasswordCheckedFalse();
  }

  onSend( password: string ) {

    this.loading = true;
    this.enterRoomService.setRoomPassword( password );

    this.enterRoomService.checkCredentials()
      .subscribe( match => {

        this.error = false;
        this.loading = false;

        if (match) {
          this.router.navigate([ '/enter-room/username' ]);
        }

      }, err => {

        this.error = true;
        this.errorMessage = err;
        this.loading = false;

      });

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
