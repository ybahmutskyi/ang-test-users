import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  public openDialog(
    config: { title: string, text: string } = { title: 'Confirm your action', text: 'Are you sure?'}
    ): MatDialogRef<ConfirmationDialogComponent> {
    return this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: config.title,
        message: config.text
      }
    });
  }
}
