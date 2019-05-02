import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { HomeInputButtonComponent } from './home-input-button/home-input-button.component';
import { Home3dButtonComponent } from './home3d-button/home3d-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TitleComponent,
    HomeInputButtonComponent,
    Home3dButtonComponent,
  ],
  exports: [
    TitleComponent,
    HomeInputButtonComponent,
    Home3dButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ComponentsModule { }
