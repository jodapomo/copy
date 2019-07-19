import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TempUser } from 'src/app/models/temp-user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss']
})
export class RoomUsersComponent implements OnInit, OnDestroy {

  @Input() users: TempUser[];

  refreshUserInterval;

  constructor(
    public authService: AuthService,
    private change: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.refreshUserInterval = setInterval( () => {
      // call change detection every minute in order to refresh the last login relative time of each user. 
      // (refresh the impure pipe RelativeTime)
      this.change.detectChanges();
    }, 60000);
  }

  ngOnDestroy(): void {
   clearInterval(this.refreshUserInterval);
  }

}
