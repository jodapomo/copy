import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routes';
import { ComponentsModule } from '../../components/components.module';
import { RoomIdComponent } from './room-id/room-id.component';
import { RoomNameComponent } from './room-name/room-name.component';
import { UserNameComponent } from './user-name/user-name.component';
import { FormsModule } from '@angular/forms';
import { NewRoomGuard } from 'src/app/guards/new-room.guard';
import { RoomPasswordComponent } from './room-password/room-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    RoomIdComponent,
    RoomNameComponent,
    UserNameComponent,
    RoomPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
