import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { TypePickerComponent } from './type-picker/type-picker.component';
import { TextInputComponent } from './input-types/text-input/text-input.component';
import { ContentEditableDirective } from './shared/directives/content-editable.directive';
import { InputTypeDirective } from './shared/directives/input-type.directive';
import { LinkInputComponent } from './input-types/link-input/link-input.component';
import { TypePickerOptionComponent } from './type-picker/type-picker-option/type-picker-option.component';

@NgModule({
  declarations: [InputComponent, TypePickerComponent, TextInputComponent, ContentEditableDirective, InputTypeDirective, LinkInputComponent, TypePickerOptionComponent],
  exports: [
    InputComponent,
  ],
  entryComponents: [
    TextInputComponent,
    LinkInputComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class InputModule { }
