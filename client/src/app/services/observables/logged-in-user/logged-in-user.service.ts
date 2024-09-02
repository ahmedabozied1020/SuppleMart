import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  private LoggedInUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {}

  getLoggedInUser(){
    return this.LoggedInUser.asObservable();
  }

  initializeLoggedInUser(user: User): void{
    this.LoggedInUser.next(user);
  }

  setLoggedInUser(newUser: User){
   this.LoggedInUser.next(newUser);
  }

  deleteLoggedInUser(){
   this.LoggedInUser.next(null);
  }
}
