import { Component, OnInit } from '@angular/core';
import { User } from '../types/User';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users: User[] = [
    {
      username: 'John',
      email: 'john@gmail.com',
      role: 'admin'
    }, {
      username: 'John',
      email: 'john@gmail.com',
      role: 'user'
    }, 
  ];
  displayedColumns: string[] = ['username', 'email', 'role', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
