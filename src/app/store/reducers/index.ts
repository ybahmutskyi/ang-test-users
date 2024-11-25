import * as fromUsers from './users.reducers';

export interface AllState {
  users: fromUsers.State;
}

export const reducers: any = {
  users: fromUsers.reducer,
};
