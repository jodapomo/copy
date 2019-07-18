import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {


  searchTerm: string;
  searching: boolean;
  @ViewChild('input', { static: false }) inputSearchElement: ElementRef;

  constructor() {
    this.searchTerm = '';
    this.searching = false;
  }

  ngOnInit() {
  }

  search() {
  }

  focusSearch() {
    this.inputSearchElement.nativeElement.focus();
  }

  clearSearch() {
    this.searchTerm = '';
  }


}
