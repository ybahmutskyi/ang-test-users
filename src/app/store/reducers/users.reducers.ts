import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { UsersActions } from '../actions';
import { User } from '@app/shared/models/user.model';

/* eslint-disable */
export interface State {
  // loaded: boolean;
  // loading: boolean;
  user: User | null;
  users: UsersState;
}

export interface UsersState extends EntityState<User> {}  

export const adapterUsers: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false,
});

export const initialState: State = {
  // loaded: false,
  // loading: false,
  user: null,
  users: adapterUsers.getInitialState([]),
};

/* eslint-disable */
export const userReducer = createReducer(
  initialState,

  // load users
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(UsersActions.loadUsersFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loaded: true,
    loading: false,
    users: adapterUsers.setAll(users, state.users)
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const selectAllUsers = adapterUsers.getSelectors().selectAll;
 