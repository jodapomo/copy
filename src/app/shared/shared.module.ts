import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { RouterModule } from '@angular/router';

import { TooltipComponent } from './tooltip/tooltip.component';
import { LoaderComponent } from './loader/loader.component';
import { DigitOnlyRoomIdDirective } from '../directives/digit-only-room-id.directive';

@NgModule({
  declarations: [
    TitleComponent,
    DigitOnlyRoomIdDirective,
    TooltipComponent,
    LoaderComponent
  ],
  exports: [
    TitleComponent,
    LoaderComponent,
    TooltipComponent,
    DigitOnlyRoomIdDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
