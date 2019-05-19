import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room/room.service';
import { EnterRoomService } from '../../../services/home/enter-room.service';
import { NewRoomService } from '../../../services/home/new-room.service';
import { Observable } from 'rxjs';

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
    private enterRoomService: EnterRoomService,
    private newRoomService: NewRoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the username selection.'

  }

  ngOnInit() {
    this.operation = this.route.snapshot.data['operation'];
  }

  onSend( username: string ) {

    let roomIdObservable: Observable<number>;

    if ( this.operation === 'new-room') {

      roomIdObservable = this.createRoom( username );

    } else if ( this.operation === 'enter-room') {

      roomIdObservable = this.enterRoom( username );

    } else {

      return this.router.navigate([ '/' ]);

    }


    roomIdObservable.subscribe( roomId => this.router.navigate([ '/room', roomId ]) );


  }

  enterRoom( username: string ) {

    this.loading = true;
    this.enterRoomService.setRoomUsername( username );

    return this.enterRoomService.login();
      

  }

  createRoom( username: string ) {

    this.loading = true;
    this.newRoomService.setRoomUsername( username );

    return this.newRoomService.createRoomAndLogin();
      

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
