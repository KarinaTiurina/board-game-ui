import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { User } from '../types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }

  onLogin(user: User) {
    this.sessionService.login({
      username: user.username,
      password: user.password
    }).subscribe(result => {
      localStorage.setItem(`board-token-${user.username}`, result.token)
      this._snackBar.open('Login was successfull.', 'Close');
      this.dialog.closeAll();
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 401) {
        this._snackBar.open('Username or password is wrong', 'Close');
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    const subscribeDialog = dialogRef.componentInstance.onLogin.subscribe(user => this.onLogin(user));

    dialogRef.afterClosed().subscribe(result => {      
      subscribeDialog.unsubscribe();
      this.router.navigate(['/']);
    });
  }

}
