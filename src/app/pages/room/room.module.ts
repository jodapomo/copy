import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room.routes';
import { RoomComponent } from './room.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    RoomRoutingModule,
  ]
})
export class RoomModule { }
