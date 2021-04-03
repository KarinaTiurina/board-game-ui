import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onLogin() {
    console.log(`Username: ${this.username}`);
    console.log(`Password: ${this.password}`);
    this.sessionService.login({
      username: this.username,
      password: this.password
    }).subscribe(result => console.log(result));
  }

}
