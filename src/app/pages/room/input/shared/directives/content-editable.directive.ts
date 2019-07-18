import {
  Directive,
  ElementRef,
  Sanitizer,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  HostListener,
  SecurityContext
} from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[contenteditableModel]'
})
export class ContentEditableDirective implements OnChanges {

  @Input() contenteditableModel: string;
  @Output() contenteditableModelChange = new EventEmitter();
  @Output() changes = new EventEmitter();

  constructor(
    public elRef: ElementRef,
  ) {}


    ngOnChanges(changes: SimpleChanges) {
      if (changes['contenteditableModel']) {
        if (changes['contenteditableModel'].isFirstChange() && !this.contenteditableModel) {
          this.onInput();
        }
        this.changes.emit();
        this.refreshView();
      }
    }

    @HostListener('input')
    @HostListener('blur')
    @HostListener('keyup')
    onInput() {
      const value = this.elRef.nativeElement['innerText'];
      this.contenteditableModelChange.emit(value);
    }

    @HostListener('keydown', ['$event'])
    tabKeyHandler( e: KeyboardEvent ): string {

      if ( e.key === 'Enter' && !e.shiftKey ) {
        e.preventDefault();
      }

      if ( e.key === 'Tab' ) {
        e.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
      }
      return;
    }


    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      event.preventDefault();
      const pastedInput: string = event.clipboardData
        .getData('text/plain');
      document.execCommand('insertText', false, pastedInput);
    }

    private refreshView() {
      const newContent = this.contenteditableModel;
      if (newContent !== this.elRef.nativeElement['innerText']) {
        this.elRef.nativeElement['innerText'] = '';
        this.elRef.nativeElement.focus();
        document.execCommand('insertText', false, newContent);
      }
    }


}
