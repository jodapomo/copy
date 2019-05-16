import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  operation: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the username selection.'

  }

  ngOnInit() {
    this.operation = this.route.snapshot.data['operation'];
  }

  onSend( username: string ) {

    if ( this.operation === 'new-room') {

      this.createRoom( username );

    } else if ( this.operation === 'enter-room') {

      this.enterRoom( username );

    } else {
      this.router.navigate([ '/' ]);
    }

  }

  enterRoom( username ) {

    this.loading = true;

    this.roomService.enterRoom( username )
      .subscribe( roomId => {
        console.log(this.roomService.room);
        this.router.navigate([ '/room', roomId ]);
      } );

  }

  createRoom( username: string ) {

    // this.loading = true;
    
    // this.roomService.setNewRoomUsername( username );

    // this.roomService.createRoom()
    //   .subscribe( room => {

    //     this.error = false;
    //     this.loading = false;

    //     this.router.navigate([ '/room', room.id ]);

    //   }, err => {

    //     this.error = true;
    //     this.errorMessage = err;
    //     this.loading = false;

    //   });

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
