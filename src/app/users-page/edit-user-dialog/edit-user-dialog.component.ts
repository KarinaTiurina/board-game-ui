import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService } from '../../services/session/session.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  onUserUpdated = new EventEmitter<any>();
  username: string = '';
  email: string = '';
  user_role: string = 'USER';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const { user } = this.data;
    this.username = user.username;
    this.email = user.email;
    this.user_role = user.user_role;
  }

  onEditUser(): void {
    const user = {
      userID: this.data.user.userID,
      username: this.username,
      email: this.email,
      user_role: this.user_role
    }

    this.sessionService.updateUser(this.data.user.userID, {
      username: this.username,
      email: this.email,
      user_role: this.user_role
    }).subscribe(result => {
      this.onUserUpdated.emit(user);
    }, error => {
      this._snackBar.open('Something went wrong.', 'Close');
    });
  }
}
