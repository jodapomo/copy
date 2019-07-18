import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from '../items/items.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextItemComponent } from './item-types/text-item/text-item.component';
import { ItemInfoComponent } from './item/item-info/item-info.component';
import { ItemButtonComponent } from './shared/item-button/item-button.component';
import { LinkItemComponent } from './item-types/link-item/link-item.component';
import { ItemTypeDirective } from './shared/directives/item-type.directive';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    TextItemComponent,
    ItemInfoComponent,
    ItemButtonComponent,
    LinkItemComponent,
    ItemTypeDirective,
  ],
  exports: [
    ItemsComponent,
  ],
  entryComponents: [
    TextItemComponent,
    LinkItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ItemsModule { }
