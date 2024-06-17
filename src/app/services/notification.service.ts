import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private matSnackbar: MatSnackBar
  ) { }

  public openErrorSnackbar(msg: string) {
    console.error('There was an error!', msg);
    return this.matSnackbar.open(msg)
  }
}
