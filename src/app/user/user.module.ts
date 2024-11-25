import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button'; // Material button
import { MatDialogModule } from '@angular/material/dialog'; // Dialog
import { MatCardModule } from '@angular/material/card'; // Card
import { MatIconModule } from '@angular/material/icon';
import { UserDetailsComponent } from './user-details/user-details.component'; // Icon for delete
import { UserPageComponent } from './user-page/user-page.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    SharedModule,
  ]
})
export class UserModule { }
