import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { User } from '../types/User';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }

  onRegister(user: User) {
    this.sessionService.register({
      username: user.username,
      password: user.password,
      email: user.email
    }).subscribe(result => {
      this.sessionService.saveToken(user, result.token);
      this._snackBar.open('Registration was successfull.', 'Close');
      this.dialog.closeAll();
      this.router.navigate(['/']);
    }, error => {
      this._snackBar.open('Something went wrong.', 'Close');
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent);

    const subscribeDialog = dialogRef.componentInstance.onRegister.subscribe(user => this.onRegister(user));

    dialogRef.afterClosed().subscribe(result => {      
      subscribeDialog.unsubscribe();
      this.router.navigate(['/']);
    });
  }

}
