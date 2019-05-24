import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { HomeInputButtonComponent } from './home-input-button/home-input-button.component';
import { Home3dButtonComponent } from './home3d-button/home3d-button.component';
import { RouterModule } from '@angular/router';
import { DigitOnlyRoomIdDirective } from '../directives/digit-only-room-id.directive';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    TitleComponent,
    HomeInputButtonComponent,
    Home3dButtonComponent,
    DigitOnlyRoomIdDirective,
    TooltipComponent,
    LoaderComponent
  ],
  exports: [
    TitleComponent,
    HomeInputButtonComponent,
    Home3dButtonComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
