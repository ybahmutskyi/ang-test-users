import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {
  public selectedUser: User | null = null;
  public users: User[] = [
  ];

  public onUserSelected(user: User): void {
    this.selectedUser = user;
  }

  public ngOnInit(): void {
    
  }
}
