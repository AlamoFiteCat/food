// [Angular Imports]
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

// [rxjs Imports]
import { first, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

// [Custom Imports]
import { Order } from '../interfaces/order';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ordersChanged = new Subject<Order[]>();
  orderSubject = new Subject<Order>();

  constructor(
    private firestore: AngularFirestore,
    public toastr: ToastrService,
    private router: Router
  ) {}

  getAllOrders() {
    this.firestore
      .collection('orders')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              authorEmail: doc.payload.doc.data()['authorEmail'],
              authorUsername: doc.payload.doc.data()['authorUsername'],
              foodstop: doc.payload.doc.data()['foodstop'],
              orderTime: doc.payload.doc.data()['orderTime'],
              ETA: doc.payload.doc.data()['ETA'],
              status: doc.payload.doc.data()['status'],
            };
          });
        })
      )
      .subscribe((orders: Order[]) => {
        this.ordersChanged.next(orders);
      });
  }

  getOrderById(id: string) {
    this.firestore
      .doc(`orders/${id}`)
      .get()
      .pipe(
        map((doc) => {
          return {
            id: doc.id,
            authorEmail: doc.data()['authorEmail'],
            authorUsername: doc.data()['authorUsername'],
            foodstop: doc.data()['foodstop'],
            orderTime: doc.data()['orderTime'],
            ETA: doc.data()['ETA'],
            status: doc.data()['status'],
          };
        })
      )
      .subscribe((result: Order) => {
        this.orderSubject.next(result);
      });
  }

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
