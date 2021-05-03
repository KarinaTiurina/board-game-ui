import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.sessionService.isAuthorized) {
      this.sessionService.logout().subscribe(result => {
        this._snackBar.open('Logout was successfull.', 'Close');
      }, error => {
        this._snackBar.open('Something went wrong.', 'Close');
      });
    }
    
    this.router.navigate(['/']);
  }

}
