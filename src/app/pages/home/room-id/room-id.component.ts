import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-id',
  templateUrl: './room-id.component.html',
  styleUrls: ['./room-id.component.scss']
})
export class RoomIdComponent implements OnInit {

  loading: boolean;
  error: boolean;

  errorMessage: string;

  constructor(
    private roomService: RoomService,
    private router: Router,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'The id entered is not valid or does not exist!';

  }

  ngOnInit() {
  }

  onSend( roomId: number ) {

    this.loading = true;

    this.roomService.getRoomById( roomId )
      .subscribe( room => {

        this.error = false;
        this.loading = false;

        this.router.navigate([ '/enter-room/username' ]);

      }, err => {

        this.error = true;
        this.errorMessage = err;
        this.loading = false;

      });

  }

  onFormatError( error: boolean ) {

    if( error ) {

      this.error = true;
      this.errorMessage = 'Format invalid. Only numbers are allowed.';

    } else {

      this.error = false;

    }

  }

  onTyping( roomId: number ) {
    this.error = false;
    return;
  }

}
