import { Component, OnInit, Input } from '@angular/core';
import { TextItem } from 'src/app/models/item-types/text-item.model';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-text-item',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.scss']
})
export class TextItemComponent implements OnInit {

  @Input() item: TextItem;

  copyButtonText = 'Copy';

  constructor(
    private clipboardService: ClipboardService,
  ) { }

  ngOnInit() {
  }

  onCopy() {

    this.clipboardService.copyFromContent(this.item.content);
    this.copyButtonText = 'Copied!';

    setTimeout(() => {
      this.copyButtonText = 'Copy';
    }, 1200);

  }

}
