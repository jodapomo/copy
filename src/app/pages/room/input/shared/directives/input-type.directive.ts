import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[inputTypeHost]'
})
export class InputTypeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
