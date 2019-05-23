import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Room } from '../../models/room.model';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  id: number;
  room: any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      tap( (params: ParamMap) => this.id = Number( params.get('id') ) ),
      switchMap((params: ParamMap) =>
        this.roomService.getRoomById( Number( params.get('id') ) )
      )
    ).subscribe( room => {
      this.room = room;
      console.log(this.room);
    });

  }

}
