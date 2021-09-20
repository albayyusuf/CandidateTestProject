import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './models';

@Injectable()
export class UserListService {

  addUser(user: User): Observable<User> {
    return of({ ...user, id: user.id });
    
  }

  removeUser(user: User): Observable<string> {
    return of(user.id.toString());
  }

}
