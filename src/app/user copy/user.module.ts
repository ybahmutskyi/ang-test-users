import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    
    MatSlideToggleModule,
  ]
})
export class UserModule { }
