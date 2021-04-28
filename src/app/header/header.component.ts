import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  countInCart: number = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkIfAuthorized();
    this.checkCart()

    this.router.events.subscribe(val => {
      // TODO check somehow that this is a redirect
      this.checkIfAuthorized();
      this.checkCart();
    });
  }

  checkIfAuthorized() {
    const keys = Object.keys(localStorage);
    const userTokenKey = keys.find(key => key.startsWith('board-token-'));
    if (userTokenKey) {
      this.isAuthorized = true;
    }
  }

  checkCart() {
    const keys = Object.keys(localStorage);
    const cartStorage = keys.find(key => key === 'board-cart');

    if (cartStorage) {
      const cart = JSON.parse(localStorage.getItem('board-cart'));
      this.countInCart = cart.items.length;
    }
  }
}
