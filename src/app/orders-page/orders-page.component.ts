import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Order } from '../types/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  getOrderTotal(order): number {
    let sum = 0;
    order.games.forEach(game => sum += game.price);
    return sum;
  }

}
