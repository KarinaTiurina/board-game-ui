import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../types/User';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  onRegister = new EventEmitter<User>();
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  password_repeat: string = '';
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterClicked() {
    if (this.username.valid && this.email.valid && this.password.valid && this.passwordsMatch()) {
      this.onRegister.emit({
        username: this.username.value, 
        password: this.password.value,
        email: this.email.value
      });
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.value !== this.password_repeat ? 'Passwords do not match.' : '';
  }

  passwordsMatch(): boolean {
    return this.password.value === this.password_repeat;
  }

}
