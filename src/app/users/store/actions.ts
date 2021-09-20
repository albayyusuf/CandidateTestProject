import { createAction, props } from '@ngrx/store';
import { User } from './models';

export const addUser = createAction('[User LIST][API] Add', props<{ user: User }>());
export const addUserSuccess = createAction('[User LIST][API] Add success', props<{ response: User }>());
export const addUserFail = createAction('[User LIST][API] Add fail', props<{ error: Error }>());

export const removeUser = createAction('[User LIST][API] Remove', props<{ user: User }>());
export const removeUserSuccess = createAction('[User LIST][API] Remove success', props<{ removedUserId: string }>());
export const removeUserFail = createAction('[User LIST][API] Remove fail', props<{ error: Error }>());
