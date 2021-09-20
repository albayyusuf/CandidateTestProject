import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../users/store/models';
import * as fromStore from "../users/store";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  loading$: Observable<boolean> | undefined;
  userId:string |undefined;
  model!:User;
  constructor(private _store$: Store,private route: ActivatedRoute) { 
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id')?.toString();
    })
    this.users$ = this._store$.select(fromStore.selectAll);
    this.loading$ = this._store$.select(fromStore.selectLoading);

    this.users$=this.users$.pipe (
      map(items =>items.filter(item => item.id.toString()==this.userId)));
      this.users$.subscribe(result => this. model=result[0] as User);
  }

}
