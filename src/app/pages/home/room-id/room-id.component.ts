import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../../services/home/home.service';
import { EnterRoomService } from '../../../services/home/enter-room.service';

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
    private router: Router,
    private homeServie: HomeService,
    private enterRoomService: EnterRoomService,
  ) {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'The id entered is not valid or does not exist!';

  }

  ngOnInit() {
  }

  onSend( roomId: number ) {

    this.loading = true;

    this.homeServie.checkRoom( roomId )
      .subscribe( locked => {

        this.error = false;
        this.loading = false;
        
        this.enterRoomService.setRoomId( roomId );

        if ( locked ) {

          this.enterRoomService.setRoomLocked( true );
          this.router.navigate([ '/enter-room/password' ]);

        } else {
          
          this.enterRoomService.setRoomLocked( false );
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
