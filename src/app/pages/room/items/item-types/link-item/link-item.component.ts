import { Component, OnInit, Input } from '@angular/core';
import { LinkItem } from 'src/app/models/item-types/link-item.model';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})
export class LinkItemComponent implements OnInit {

  @Input() item: LinkItem;

  copyButtonText = 'Copy';

  constructor(
    private clipboardService: ClipboardService,
  ) { }

  ngOnInit() {
  }

  onCopy() {

    this.clipboardService.copyFromContent(this.item.link);
    this.copyButtonText = 'Copied!';

    setTimeout(() => {
      this.copyButtonText = 'Copy';
    }, 1200);

  }

  onOpen() {
    window.open(this.item.link, '_blank');
  }

}
