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
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    RoomComponent,
    RelativeTimePipe,
    RoomInfoComponent,
    RoomUsersComponent,
    ItemSearchComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    RoomRoutingModule,
  ]
})
export class RoomModule { }
