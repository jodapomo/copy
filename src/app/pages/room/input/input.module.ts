import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { TypePickerComponent } from './type-picker/type-picker.component';
import { TextInputComponent } from './input-types/text-input/text-input.component';
import { ContentEditableDirective } from './shared/directives/content-editable.directive';

@NgModule({
  declarations: [InputComponent, TypePickerComponent, TextInputComponent, ContentEditableDirective],
  exports: [
    InputComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class InputModule { }
