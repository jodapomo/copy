import { Component, OnInit, Input } from '@angular/core';
import { TempUser } from 'src/app/models/temp-user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss']
})
export class RoomUsersComponent implements OnInit {

  @Input() users: TempUser[];

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
