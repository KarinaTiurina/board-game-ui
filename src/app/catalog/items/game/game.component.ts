import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/types/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  image_url: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.image_url = this.game.image_url || 'assets/images/game-default.png';
  }

}
