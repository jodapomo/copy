import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from './shared/services/room.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Item } from '../../models/item.model';
import { Subscription } from 'rxjs';
import { TempUser } from '../../models/temp-user.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy  {

  id: number;
  room: Room;
  items: Item[];

  private userJoinSub: Subscription;
  private userLeaveSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) {}

  ngOnInit() {
    this.loadRoom();
    this.userJoinSub = this.roomService.userJoin.subscribe( (user: TempUser) => this.onUserJoin(user) );
    this.userLeaveSub = this.roomService.userLeave.subscribe( (user: TempUser) => this.onUserLeave(user) );
  }

  loadRoom() {

    this.route.paramMap.pipe(
      tap( (params: ParamMap) => this.id = Number( params.get('id') ) ),
      switchMap( (params: ParamMap) =>
        this.roomService.getRoomById( Number( params.get('id') ) )
      )
    ).subscribe( room => {
      this.room = room;
      this.items = room.items.slice().reverse();
      console.log(this.room);
      console.log(this.items);
    });

  }

  onUserLeave( user: TempUser ) {
    console.log(user);
  }

  onUserJoin( user: TempUser ) {
    console.log(user);
  }

  ngOnDestroy(): void {
    this.roomService.leave();
    this.userJoinSub.unsubscribe();
    this.userLeaveSub.unsubscribe();
  }

}
