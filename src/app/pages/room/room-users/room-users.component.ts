import { Component, OnInit, Input } from '@angular/core';
import { TempUser } from 'src/app/models/temp-user.model';


@Component({
  selector: 'app-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss']
})
export class RoomUsersComponent implements OnInit {

  @Input() users: TempUser[];

  constructor() { }

  ngOnInit() {
  }

}
