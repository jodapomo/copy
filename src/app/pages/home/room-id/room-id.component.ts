import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-id',
  templateUrl: './room-id.component.html',
  styleUrls: ['./room-id.component.scss']
})
export class RoomIdComponent implements OnInit {

  loading: boolean;
  error: boolean;

  constructor(
    private roomService: RoomService,
  ) {

    this.loading = false;
    this.error = false;

  }

  ngOnInit() {

    this.loading = true;
    this.roomService.getRoomById(2)
      .subscribe( rooms => {
        console.log(rooms);
        this.loading = false;
      }, err => {
        console.log(err);
        this.error = true;
        this.loading = false;
      });

  }

}
