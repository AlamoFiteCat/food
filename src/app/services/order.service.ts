import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../interfaces/order';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private firestore: AngularFirestore,
    public toastr: ToastrService,
    private router: Router
  ) {}

  getAllOrders() {}

  getOrderById() {}

  postOrder(order: Order) {
    this.firestore
      .collection('orders')
      .add(order)
      .then(
        () => {
          this.toastr.success('Order posted. Get some friends!', 'Success');
          this.router.navigate(['/posts']);
        },
        (err) => {
          this.toastr.error(err.message, 'Error!');
        }
      )
      .catch((err) => {
        this.toastr.error(err.message, 'Error!');
      });
  }

  putOrder() {}

  deleteOrder() {}
}
