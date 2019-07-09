import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../items/items.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
  ],
  exports: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ItemsModule { }
