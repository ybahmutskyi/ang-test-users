import { Component, OnInit } from '@angular/core';
import { DialogService } from '@app/services/dialog.service';
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
    private dialogService: DialogService,
  ) {  }

  public onUserSelected(user: User): void {
    this.selectedUser = user;
  }

  public ngOnInit(): void {
    this.usersFacade.loadUsers();
    this.usersFacade.users$.subscribe((users: User[]) => {
      this.users = users;
    })
  }

  onDelete(user: User): void {
    const dialogRef = this.dialogService.openDialog({
      title: 'Delete confirmation',
      text: `Are you sure you want to delete user ${user.username}?`
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }
  
  onAddToFavourites(user: User): void {
    const dialogRef = this.dialogService.openDialog({
      title: 'Add to favourites confirmation',
      text: `Are you sure you want to add to favourites user ${user.username}?`
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.addtoFavourites(user);
      }
    });
  }
  
  onMute(user: User): void {
    const dialogRef = this.dialogService.openDialog({
      title: 'Mute confirmation',
      text: `Are you sure you want to mute user ${user.username}?`
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.muteUser(user);
      }
    });
  }
  
  private deleteUser(user: User): void {
    alert(`User ${user.username} deleted successfuly`);
  }

  private addtoFavourites(user: User): void {
    alert(`User ${user.username} added to favourites successfuly`);
  }

  private muteUser(user: User): void {
    alert(`User ${user.username} muted successfuly`);
  }
}
