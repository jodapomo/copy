import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {

  @Input() item: Item;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
