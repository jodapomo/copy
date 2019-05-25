import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { switchMap, map, tap } from 'rxjs/operators';
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

  animateId = false;
  animateUrl = false;
  copyIdTooltipMessage = 'Copy room Id';
  copyUrlTooltipMessage = 'Copy room url';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private roomService: RoomService,
    private clipboardService: ClipboardService,
  ) { }

  ngOnInit() {

    this.loadRoom();

  }


  loadRoom() {

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


  copyRoomId() {

    this.animateId = true;
    this.copyIdTooltipMessage = 'Copied!';

    this.clipboardService.copyFromContent(this.room.id.toString());

    setTimeout(() => {
      this.copyIdTooltipMessage = 'Copy room Id';
      this.animateId = false;
    }, 1500);

  }

  copyRoomUrl() {
    this.animateUrl = true;
    this.copyUrlTooltipMessage = 'Copied!';

    this.clipboardService.copyFromContent(window.location.href);

    setTimeout(() => {
      this.copyUrlTooltipMessage = 'Copy room url';
      this.animateUrl = false;
    }, 1500);
  }

}
