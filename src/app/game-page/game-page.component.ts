import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game/game.service';

import { Game } from '../types/Game';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  id: string;
  isLoading: boolean = true;
  game: Game = null;
  image_url: string = '';
  ratingColor: string = 'accent';
  ratingArr: number[] = [0, 1, 2, 3, 4];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private _snackBar: MatSnackBar
  ) {
    this.id = this.route.snapshot.params.id;
   }

  ngOnInit(): void {
    this.gameService.getGame(this.id).subscribe(game => {
      this.game = game;
      this.image_url = this.game.image_url || 'assets/images/game-default.png';
      this.isLoading = false;
    })
  }

  showRatingIcon(index: number) {
    if (this.game.average_user_rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }

  addToCart() {
    const cartStorage = localStorage.getItem('board-cart');

    let cart: any = {};
    if (cartStorage) {
      cart = JSON.parse(cartStorage);
    } else {
      cart.items = [];
    }

    cart.items.push(this.game.idGame);
    
    localStorage.setItem('board-cart', JSON.stringify(cart));
    this._snackBar.open(`Successfully added '${this.game.name}' to cart.`, 'Close');
  }

}
