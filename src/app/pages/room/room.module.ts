import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room.routes';
import { RoomComponent } from './room.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RoomRoutingModule,
  ]
})
export class RoomModule { }
