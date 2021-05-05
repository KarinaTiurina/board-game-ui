import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../types/User';
import { SessionService } from '../services/session/session.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>();

  constructor(
    private sessionService: SessionService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sessionService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource.data = users;
    });
  }

  onEdit(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        user
      }
    });

    const subscribeEditDialog = dialogRef.componentInstance.onUserUpdated.subscribe(user => {
      this.dialog.closeAll();
      const userRow = this.users.find(row => row.userID === user.userID)
      const i = this.users.indexOf(userRow);
      this.users[i] = {
        userID: userRow.userID,
        username: user.username,
        email: user.email,
        user_role: user.user_role
      }
      this.dataSource.data = this.users;
    });

    dialogRef.afterClosed().subscribe(result => {      
      subscribeEditDialog.unsubscribe();
    });
  }

}
