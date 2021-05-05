import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { SessionService } from '../services/session/session.service';
import { Game } from '../types/Game';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  totalSum: number = 0;
  games: Game[] = [];

  constructor(
    private orderService: OrderService, 
    private sessionService: SessionService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.getGames().subscribe(games => {
      this.games = games;
      this.calculateSum();
    });
  }

  getGameImgUrl(game: Game): string {
    return game.image_url || 'assets/images/game-default.png';
  }

  calculateSum() {
    this.games.forEach(game => {
      this.totalSum += game.price;
    });
  }

  onOrder() {
    if (!this.sessionService.isAuthorized) {
      this._snackBar.open(`Please login before ordering.`, 'Close');
      this.router.navigate(['/login']);
    }

    this.orderService.createOrder(this.games).subscribe(result => {
      this._snackBar.open('Successfully created an order.', 'Close');
      this.orderService.cleanCart();
      this.router.navigate(['/orders']);
    }, error => {
      this._snackBar.open('Something went wrong.', 'Close');
    });
  }

}
