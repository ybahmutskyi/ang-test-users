import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/shared/models/user.model';

export const loadUsers = createAction(
  '[Users/API] Load Users')
;
export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: Error | HttpErrorResponse }>()
);
