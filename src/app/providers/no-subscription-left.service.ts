import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NoSubscriptionLeftService {

  constructor(private readonly _snackBar: MatSnackBar) { }

  showToaster(err: any) {

    this._snackBar.open(err.error.message, 'Buy credit', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    return [];
  }


}
