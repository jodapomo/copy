import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as moment from 'moment';

if (environment.production) {
  enableProdMode();
}

moment.updateLocale('en', {
  relativeTime : {
      future: 'in %s',
      past:   '%s ago',
      s  : '%d s',
      ss : '%d s',
      m:  '1 min',
      mm: '%d min',
      h:  '1 h',
      hh: '%d h',
      d:  '1 d',
      dd: '%d d',
      M:  'a mo',
      MM: '%d mo',
      y:  '1 y',
      yy: '%d y'
  }
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
