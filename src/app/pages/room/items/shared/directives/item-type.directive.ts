import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[itemTypeHost]',
})
export class ItemTypeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
