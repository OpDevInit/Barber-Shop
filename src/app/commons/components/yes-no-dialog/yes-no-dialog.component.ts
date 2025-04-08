import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss'
})
export class YesNoDialogComponent {
  dat: any
  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: YesNoDialogComponent) { }

  ngOnInit(): void {
    this.dat = this.data

  }
}