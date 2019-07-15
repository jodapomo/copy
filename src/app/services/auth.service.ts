import { Injectable } from '@angular/core';
import { TempUser } from '../models/temp-user.model';
import { Session } from '../intefaces/session.interface';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: TempUser;
  token: string;
  roomId: number;

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private ss: SocketService,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  setSession( session: Session, user: TempUser )  {
    this.token = session.token;
    this.roomId = Number(session.roomId);
    this.user = user;
  }

  // create a session or update one if already exists in localStorage and set session
  createSession( user: TempUser, token: string, roomId: number ) {

    let sessions: Session[] = JSON.parse(localStorage.getItem('sessions'));

    const session: Session = {
      token,
      roomId: Number(roomId),
    };

    // check if there's not sessions item in localStorage and create it.
    if ( !sessions ) {

      sessions = [session];
      localStorage.setItem('sessions', JSON.stringify(sessions));

    } else {

      const newSessions: Session[] = sessions.filter( ( s: Session ) => Number(s.roomId) !== session.roomId );

      // if there's not an existing session for a specific room
      if ( sessions.length === newSessions.length ) {

        sessions.push(session);
        localStorage.setItem('sessions', JSON.stringify(sessions));

      } else {

        // if exist -> delete the existing and add the new session
        newSessions.push(session);
        localStorage.setItem('sessions', JSON.stringify(newSessions));

      }

    }

    this.setSession(session, user);

  }

  checkIfSessionExistAndSet( roomId: number ): Observable<boolean> {

    const sessions: Session[] = JSON.parse(localStorage.getItem('sessions'));

    if ( sessions ) {

      const session = sessions.find( (s: Session) => Number(s.roomId) === Number(roomId) );


      if ( session !== undefined ) {

        this.roomId = Number(session.roomId);
        this.token = session.token;

        return this.getAuthUser( )
          .pipe(
            tap(  user => this.emitJoin( session.roomId, user ) ),
            map( user => {
              this.setSession(session, user);
              return true;
            })
          );

      }

    }

    return of(false);

  }

  emitJoin( roomId: number, user: TempUser ) {
    this.ss.socket.emit('userJoin', { roomId, username: user.username });
  }

  emitLeave() {
    this.ss.socket.emit('userLeave');
  }

  logout() {

    const sessions: Session[] = JSON.parse(localStorage.getItem('sessions'));
    const newSessions: Session[] = sessions.filter( ( s: Session ) => Number(s.roomId) !== Number(this.roomId) );

    this.user = undefined;
    this.token = undefined;
    this.roomId = undefined;

    localStorage.setItem('sessions', JSON.stringify(newSessions));

  }

  // Server decode the jwt token passed by the jwtInterceptor and return the user that owns the token
  getAuthUser( ) {

    const url = `${ this.apiUrl }/rooms/${ this.roomId }/user`;

    return this.http.get( url )
      .pipe(
        map( (res: any) => res.user ),
      );

  }


}
