import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from '../reducers/users.reducers';

/* eslint-disable */

export const selectUsersState = createFeatureSelector<fromUsers.State>('users');

// export const getUsersLoadingStatus = createSelector(selectUsersState, (state) => {
//   return { loading: state.loading, loaded: state.loaded };
// });

export const selectAllUsersState = createSelector(
  selectUsersState,
  (state) => state?.users
);
export const selectAllUsers = createSelector(
  selectAllUsersState,
  fromUsers.selectAllUsers,
);