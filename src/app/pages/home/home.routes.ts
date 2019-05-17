import { NewRoomGuard } from './../../guards/new-room.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RoomIdComponent } from './room-id/room-id.component';
import { RoomNameComponent } from './room-name/room-name.component';
import { UserNameComponent } from './user-name/user-name.component';
import { EnterRoomGuard } from '../../guards/enter-room.guard';
import { RoomPasswordComponent } from './room-password/room-password.component';

const routes: Routes = [

  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: RoomIdComponent, data: { order: 1 } },
      
      { path: 'new-room/name', component: RoomNameComponent, data: { order: 2 } },
      { path: 'new-room/password', component: RoomPasswordComponent, canActivate: [NewRoomGuard], data: { order: 3, operation: 'new-room', step: 'password' } },
      { path: 'new-room/username', component: UserNameComponent, canActivate: [NewRoomGuard], data: { order: 4, operation: 'new-room', step: 'username' } },

      { path: 'enter-room/password', component: RoomPasswordComponent, canActivate: [EnterRoomGuard], data: { order: 3, operation: 'enter-room', step: 'password' } },
      { path: 'enter-room/username', component: UserNameComponent, canActivate: [EnterRoomGuard], data: { order: 4, operation: 'enter-room', step: 'username' } },
    ],
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class HomeRoutingModule { }
