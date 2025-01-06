import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orderHistory: any[] = [];
  ngOnInit(): void {
    // Fetch the order history from localStorage
    this.orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  }
}
