import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { User } from './models';

export const featureKey = 'userListState';

export interface UserListState extends EntityState<User> {
  loading: boolean;
}

export const entityAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity) => entity.id
});

export const initialState: UserListState = entityAdapter.getInitialState({
  loading: false,
});

export const reducer = createReducer(
  initialState,
  on(actions.addUser, (state) => ({ ...state, loading: true })),
  on(actions.addUserSuccess, (state, action) => ({ ...entityAdapter.addOne(action.response, state), loading: false })),
  on(actions.addUserFail, (state) => ({ ...state, loading: false })),
  on(actions.removeUser, (state) => ({ ...state, loading: true })),
  on(actions.removeUserSuccess, (state, action) => ({ ...entityAdapter.removeOne(action.removedUserId, state), loading: false })),
  on(actions.removeUserFail, (state) => ({ ...state, loading: false })),
);

export const loading = (state: UserListState) => state.loading;
export const { selectAll } = entityAdapter.getSelectors();

