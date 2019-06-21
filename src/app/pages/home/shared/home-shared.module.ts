import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeInputButtonComponent } from './home-input-button/home-input-button.component';
import { Home3dButtonComponent } from './home3d-button/home3d-button.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    HomeInputButtonComponent,
    Home3dButtonComponent,
  ],
  exports: [
    HomeInputButtonComponent,
    Home3dButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
  ]
})
export class HomeSharedModule { }
