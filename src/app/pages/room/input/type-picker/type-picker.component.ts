import { Component, OnInit, Renderer2, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { InputService } from '../input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-picker',
  templateUrl: './type-picker.component.html',
  styleUrls: ['./type-picker.component.scss']
})
export class TypePickerComponent implements OnInit, OnDestroy {

  type = 'text';
  selecting = false;

  typeChangeSubs: Subscription;

  constructor(
    private inputService: InputService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.inputService.type = this.type;

    this.typeChangeSubs = this.inputService.typeChangeSubject
      .subscribe( type => {
        this.type = type;
      });

    this.renderer.listen('window', 'click', _ => {
        this.selecting = false;
    });
  }


  click(event) {
    event.stopPropagation();
    this.selecting = true;
  }

  changeType(type: string) {
    this.selecting = false;
    this.type = type;
    this.inputService.type = this.type;
  }

  ngOnDestroy(): void {
    this.typeChangeSubs.unsubscribe();
  }

}
