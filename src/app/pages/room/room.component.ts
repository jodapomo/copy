import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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


  searchTerm: string;
  searching: boolean;
  @ViewChild('input', { static: false }) inputSearchElement: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private roomService: RoomService,
    private clipboardService: ClipboardService,
  ) {
    this.searchTerm = '';
    this.searching = false;
  }

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

  search() {
    console.log(this.searchTerm);
  }

  focusSearch() {
    this.inputSearchElement.nativeElement.focus();
  }

  clearSearch() {
    this.searchTerm = '';
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
