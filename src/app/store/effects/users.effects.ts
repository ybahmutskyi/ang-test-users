import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UsersActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '@app/services/user.service';
import { User } from '@app/shared/models/user.model';

/* eslint-disable */

@Injectable()
export class UserEffects {
  public constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

  //TODO: add type defs
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() => {
        return this.userService.getUsers().pipe(
          map((users: User[]) => UsersActions.loadUsersSuccess({
            users
          })),
          catchError((error: Error | HttpErrorResponse) => {
            if (!(error instanceof HttpErrorResponse)) {
              throw error;
            }
            return of(UsersActions.loadUsersFailure({ error }));
          })
        );
      })
    )
  );

}