import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../types/User';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  onLogin = new EventEmitter<User>();
  onRegister = new EventEmitter<void>();
  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.onLogin.emit({
      username: this.username, 
      password: this.password
    });
  }

  onRegisterClicked() {
    this.onRegister.emit();
  }

}
