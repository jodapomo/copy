import { Component, OnInit } from '@angular/core';
import { InputService } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  enterPressed: boolean;

  constructor(
    private inputService: InputService,
  ) { }

  ngOnInit() {
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

}
