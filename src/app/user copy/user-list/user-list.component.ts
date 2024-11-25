import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent{
  // users: any[] = [];

  // constructor(private http: HttpClient, public dialog: MatDialog) {}

  // ngOnInit() {
  //   this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data: any) => {
  //     this.users = data;
  //   });
  // }

  // deleteUser(userId: number) {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: { title: 'Delete User', text: 'Are you sure you want to delete this user?' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Call API to delete the user
  //       console.log(`Deleted user with ID: ${userId}`);
  //     }
  //   });
  // }
}
