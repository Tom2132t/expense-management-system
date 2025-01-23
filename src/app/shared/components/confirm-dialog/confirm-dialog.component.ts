import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
}
