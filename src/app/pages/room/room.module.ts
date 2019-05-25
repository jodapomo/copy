import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room.routes';
import { RoomComponent } from './room.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ClipboardModule,
    RoomRoutingModule,
  ]
})
export class RoomModule { }
