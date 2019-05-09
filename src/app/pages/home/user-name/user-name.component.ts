import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private roomService: RoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the username selection.'

  }

  ngOnInit() {
  }

  onSend( username: string ) {

    this.roomService.setNewRoomUsername( username );

    this.loading = true;

    this.roomService.createRoom()
      .subscribe( room => {

        this.error = false;
        this.loading = false;

        this.router.navigate([ '/room', room.id ]);

      }, err => {

        this.error = true;
        this.errorMessage = err;
        this.loading = false;

      });

  }

  onFormatError( error: boolean ) {

    if( error ) {

      this.error = true;
      this.errorMessage = 'Invalid format. Only numbers and letters are allowed - e.g. "John Doe".';

    } else {

      this.error = false;

    }

  }

  onTyping( roomId: number ) {
    this.error = false;
    return;
  }

}
