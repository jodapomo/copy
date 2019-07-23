import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from './shared/services/room.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { switchMap, tap } from 'rxjs/operators';
import { Item } from '../../models/item.model';
import { Subscription } from 'rxjs';
import { TempUser } from '../../models/temp-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy  {

  id: number;
  room: Room;
  items: Item[];

  private userJoinSubs: Subscription;
  private userLeaveSubs: Subscription;
  private userReconnectSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private roomService: RoomService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadRoom();
    this.userJoinSubs = this.roomService.userJoin.subscribe( (user: TempUser) => this.onUserJoin(user) );
    this.userLeaveSubs = this.roomService.userLeave.subscribe( (user: TempUser) => this.onUserLeave(user) );
    this.userReconnectSubs = this.roomService.userReconnect.subscribe( _ => this.onUserReconnect() );
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
      this.setAuthUserOnline();
      this.titleService.setTitle(`${ room.name } - Copy`);
    }, error => {
      this.authService.logout();
      return this.router.navigate(['/'], { queryParams: { error } });
    });

  }

  onUserJoin( user: TempUser ) {
    if (user) {
      const localUser = this.room.tempUsers.find( (tempUser: TempUser) => tempUser.username === user.username );

      if ( localUser ) {
        localUser.online = user.online;
        return;
      }

      this.room.tempUsers.push(user);
    }
  }

  onUserLeave( user: TempUser ) {
    if (user) {
      const localUser = this.room.tempUsers.find( (tempUser: TempUser) => tempUser.username === user.username );
      localUser.online = user.online;
      localUser.lastLogin = user.lastLogin;
    }
  }

  setAuthUserOnline() {
    const localUser = this.room.tempUsers.find( (tempUser: TempUser) => tempUser.username === this.authService.user.username );

    if ( localUser ) {
      localUser.online = true;
    }

  }

  onUserReconnect() {
    if ( this.room && this.authService.isSessionSet() ) {
      this.authService.emitJoinCurrentUser();
    }
  }

  ngOnDestroy(): void {
    this.roomService.leave();
    this.userJoinSubs.unsubscribe();
    this.userLeaveSubs.unsubscribe();
    this.userReconnectSubs.unsubscribe();
  }

}
