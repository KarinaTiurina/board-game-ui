import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
  }

  ifAuthorized(): boolean {
    return this.sessionService.isAuthorized;
  }

  getCountInCart(): number {
    return this.orderService.getCountInCart();
  }
}
