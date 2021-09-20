import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';
import { UserListService } from './service';

@Injectable()
export class UserListEffects  {

  constructor(
    private _actions$: Actions,
    private _service: UserListService
  ) { }


  $addUser = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addUser),
      switchMap((action) => this._service.addUser(action.user)
        .pipe(
          map((response) => actions.addUserSuccess({ response })),
          catchError((error: Error) => of(actions.addUserFail({ error })))
        )
      )
    );
  });

  $addUserSuccess = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addUserSuccess),
     // tap(() => alert('save success'))
    );
  }, { dispatch: false });

  $removeUser = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.removeUser),
      switchMap((action) => this._service.removeUser(action.user)
        .pipe(
          map((removedUserId) => actions.removeUserSuccess({ removedUserId })),
          catchError((error: Error) => of(actions.removeUserFail({ error })))
        )
      )
    );
  });

  $removeUserSuccess = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.removeUserSuccess),
      //tap(() => alert('remove success'))
    );
  }, { dispatch: false });

}
