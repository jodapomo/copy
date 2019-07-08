import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform( value: any ): string {
    return moment(value, 'DD/MM/YYYY HH:mm:ss').fromNow(true);
  }

}
