import { Injectable } from '@angular/core';
import { TempUser } from '../models/temp-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: TempUser;
  token: string;

  constructor() {}

  login( user: TempUser )  {
    this.user = user;
  }

}
