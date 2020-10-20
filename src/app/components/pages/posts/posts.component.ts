// [Angular Imports]
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// [rxjs Imports]
import { Subscription } from 'rxjs';

// [Custom Imports]
import { Order } from '../../../interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  ordersSubscription: Subscription;
  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ['foodstop', 'orderTime', 'ETA', 'status', 'edit'];

  constructor(private orderService: OrderService, public router: Router) {}

  ngOnInit(): void {
    this.ordersSubscription = this.orderService.ordersChanged.subscribe(
      (orders) => {
        this.dataSource.data = orders;
      }
    );
    this.orderService.getAllOrders();
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

  onSelectRow(id: string) {
    this.router.navigate([`/posts/${id}`]);
  }
}
