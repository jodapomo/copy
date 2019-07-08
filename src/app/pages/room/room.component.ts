import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from './shared/services/room.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { switchMap, tap } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  id: number;
  room: Room;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private roomService: RoomService,
  ) {}

  ngOnInit() {

    this.loadRoom();

  }

  loadRoom() {

    this.route.paramMap.pipe(
      tap( (params: ParamMap) => this.id = Number( params.get('id') ) ),
      switchMap( (params: ParamMap) =>
        this.roomService.getRoomById( Number( params.get('id') ) )
      )
    ).subscribe( room => {
      this.room = room;
      console.log(this.room);
    });

  }

}
