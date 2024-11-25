import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AllState, UsersActions } from '..';
import {
  selectAllUsers,
} from '..';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models/user.model';

/* eslint-disable */
@Injectable({ providedIn: "root" })
export class UsersFacade {
  
  public users$: Observable<User[]> = this.store.select(selectAllUsers);

  constructor(private store: Store<AllState>) {}

  public loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

}
