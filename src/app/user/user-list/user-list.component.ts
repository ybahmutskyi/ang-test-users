import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from '@app/services/dialog.service';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent{
  @Input() public users: User[] = [];
  @Output() public userSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output() public userDeleted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private dialogService: DialogService) {}

  onDelete(user: User): void {
    const dialogRef = this.dialogService.openDialog({
      title: 'Delete confirmation',
      text: `Are you sure you want to delete user ${user.username}`
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  public onUserClick(user: User): void {
    this.userSelected.emit(user);
  }

  private deleteUser(user: User): void {
    this.userDeleted.emit(user);
  }
}
