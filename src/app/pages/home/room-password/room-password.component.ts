import { Component, OnInit } from '@angular/core';
import { EnterRoomService } from '../shared/services/enter-room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewRoomService } from '../shared/services/new-room.service';

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

  operation: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private enterRoomService: EnterRoomService,
    private newRoomService: NewRoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the password.';

  }

  ngOnInit() {
    this.operation = this.route.snapshot.data['operation'];
    this.enterRoomService.setPasswordCheckedFalse();
  }

  onSend( password: string ) {

    if ( this.operation === 'new-room') {

      this.savePassword( password );

    } else if ( this.operation === 'enter-room') {

      this.validatePassword( password );

    } else {
      this.router.navigate([ '/' ]);
    }


  }

  savePassword( password: string ) {

    this.loading = true;

    this.newRoomService.setRoomLocked( true );
    this.newRoomService.setRoomPassword( password );

    this.loading = false;

    this.router.navigate([ '/new-room/username' ]);

  }

  validatePassword( password: string ) {

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

    if ( error ) {

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
