import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ITEM_TYPES_COMPONENTS } from '../item-types';
import { ItemTypeDirective } from '../shared/directives/item-type.directive';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  @ViewChild(ItemTypeDirective, {static: true}) inputTypeHost: ItemTypeDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {

    const itemTypeComponent = this.getItemTypeComponent(this.item.type);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(itemTypeComponent);

    const viewContainerRef = this.inputTypeHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).item = this.item;

  }


  getItemTypeComponent( type: string ) {
    return ITEM_TYPES_COMPONENTS[type] || ITEM_TYPES_COMPONENTS['text'];
  }

}
