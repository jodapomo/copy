import { Component, OnInit, Input } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Room } from 'src/app/models/room.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  @Input() room: Room;

  animateId = false;
  animateUrl = false;
  copyIdTooltipMessage = 'Copy room Id';
  copyUrlTooltipMessage = 'Copy room url';

  constructor(
    private router: Router,
    private clipboardService: ClipboardService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
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

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
