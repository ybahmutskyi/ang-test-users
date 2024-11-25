import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Angular Material form field
import { MatSelectModule } from '@angular/material/select'; // Angular Material select
import { MatButtonModule } from '@angular/material/button'; // Angular Material button
import { MatInputModule } from '@angular/material/input'; // Angular Material input
import { MatCardModule } from '@angular/material/card'; // Material Card

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,


    MatSlideToggleModule,

    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
