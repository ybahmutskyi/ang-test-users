import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user.model';
import { UsersFacade } from '@app/store/facades/users.facade';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {
  public selectedUser: User | null = null;
  public users: User[] = [
  ];

  public constructor(
    private usersFacade: UsersFacade,
  ) {

  }

  public onUserSelected(user: User): void {
    this.selectedUser = user;
  }

  public ngOnInit(): void {
    this.usersFacade.loadUsers();
    this.usersFacade.users$.subscribe((users: User[]) => {
      this.users = users;
      console.log('users');
      console.log(users);
    })
  }
}
