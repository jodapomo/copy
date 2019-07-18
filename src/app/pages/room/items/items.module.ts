import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../items/items.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextItemComponent } from './item-types/text-item/text-item.component';
import { ItemInfoComponent } from './item/item-info/item-info.component';
import { ItemButtonComponent } from './shared/item-button/item-button.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    TextItemComponent,
    ItemInfoComponent,
    ItemButtonComponent,
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
