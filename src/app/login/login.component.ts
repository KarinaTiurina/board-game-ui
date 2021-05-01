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
      this.sessionService.saveToken(user, result.token);
      this._snackBar.open('Login was successfull.', 'Close');
      this.dialog.closeAll();
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 401) {
        this._snackBar.open('Username or password is wrong', 'Close');
      }
    });
  }

  onRegister() {
    this.dialog.closeAll();
    this.router.navigate(['/register']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    const subscribeLoginDialog = dialogRef.componentInstance.onLogin.subscribe(user => this.onLogin(user));
    const subscribeRegisterDialog = dialogRef.componentInstance.onRegister.subscribe(event => this.onRegister());

    dialogRef.afterClosed().subscribe(result => {      
      subscribeLoginDialog.unsubscribe();
      subscribeRegisterDialog.unsubscribe();
      this.router.navigate(['/']);
    });
  }

}
