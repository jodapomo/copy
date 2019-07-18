import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, AfterContentInit } from '@angular/core';
import { InputService } from './input.service';
import { InputTypeDirective } from './shared/directives/input-type.directive';
import { Subscription } from 'rxjs';
import { INPUT_TYPES } from './input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {

  @ViewChild(InputTypeDirective, {static: true}) inputTypeHost: InputTypeDirective;

  enterPressed: boolean;

  typeChangeSubs: Subscription;

  constructor(
    public inputService: InputService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {

    this.typeChangeSubs = this.inputService.typeChangeSubject
    .subscribe( type => {
      this.loadInputType(type);
    });

    this.inputService.type = 'text';
  }


  loadInputType( type: string ) {

    const inputType = this.getInputTypeComponent(type);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(inputType);

    const viewContainerRef = this.inputTypeHost.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);

  }

  getInputTypeComponent( type: string ) {
    return INPUT_TYPES[type] || INPUT_TYPES['text'];
  }


  pressButton() {
    this.enterPressed = true;
  }

  releaseButtonAndSend() {
    this.enterPressed = false;
    this.send();
  }

  send() {
    this.inputService.sendItem();
  }

  ngOnDestroy(): void {
    this.typeChangeSubs.unsubscribe();
  }

}
