import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './store/models';
import * as fromStore from "./store";
import * as actions from "./store/actions";
import {Router} from '@angular/router'; 
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private API_URL= environment.API_URL;

  userList: User[] = [];
  errorMessage: any;
  users$: Observable<User[]> | undefined;
  loading$: Observable<boolean> | undefined;
  constructor(private _store$: Store,private http: HttpClient,private route:Router) { 
  }

  ngOnInit(): void {
    this.users$ = this._store$.select(fromStore.selectAll);
    this.loading$ = this._store$.select(fromStore.selectLoading);

    this.http.get<User[]>(this.API_URL+'/users').subscribe({
        next: data => {
            this.userList = data ;
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
  }
  userDetail( user:User): void {
    this._store$.dispatch(actions.addUser({ user: user }));
    this.route.navigate(['/userdetail/'+user.id]); // navigate to other page

  }

  remove(user: User): void {
    this._store$.dispatch(
      actions.removeUser({ user })
    );
  }

}
