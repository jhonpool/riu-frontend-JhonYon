import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  delete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
