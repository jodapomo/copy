import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routes';
import { ComponentsModule } from '../../components/components.module';
import { RoomIdComponent } from './room-id/room-id.component';
import { RoomNameComponent } from './room-name/room-name.component';
import { UserNameComponent } from './user-name/user-name.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    RoomIdComponent,
    RoomNameComponent,
    UserNameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
