import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NoSubscriptionLeftService {

  constructor(private readonly _snackBar: MatSnackBar) { }

  showToaster(err: any) {
    console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');

    this._snackBar.open('No more credit', 'Buy credit', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    return [];
  }

}