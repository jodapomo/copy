import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room.routes';
import { RoomComponent } from './room.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { RelativeTimePipe } from './shared/pipes/relative-time.pipe';
import { RoomInfoComponent } from './room-info/room-info.component';
import { RoomUsersComponent } from './room-users/room-users.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { ItemsModule } from './items/items.module';
import { InputModule } from './input/input.module';


@NgModule({
  declarations: [
    RoomComponent,
    RelativeTimePipe,
    RoomInfoComponent,
    RoomUsersComponent,
    ItemSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    RoomRoutingModule,
    ItemsModule,
    InputModule,
  ]
})
export class RoomModule { }
