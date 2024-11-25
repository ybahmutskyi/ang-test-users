import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input() public users: User[] = [];
  @Input() actionTemplate!: TemplateRef<any>;
  @Output() public userSelected: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  public onUserClick(user: User): void {
    this.userSelected.emit(user);
  }
}
