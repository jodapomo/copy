import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;

  constructor() {
    this.socket = io(environment.serverUrl);
  }

  fromEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>( (observer: any) => {
      this.socket.on(eventName, (data: T) => {
          observer.next(data);
      });
      return;
    })
    .pipe(
      share()
    );
  }

}
