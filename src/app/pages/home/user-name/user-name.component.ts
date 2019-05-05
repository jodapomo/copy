import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor() {

    this.loading = false;
    this.error = false;

    this.errorMessage = 'An error occurred with the username selection.'

  }

  ngOnInit() {
  }

}
