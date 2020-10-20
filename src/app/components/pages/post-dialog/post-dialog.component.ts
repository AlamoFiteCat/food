// [@Angular Imports]
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// [rxjs]
import { Subscription } from 'rxjs';

// [Custom Imports]
import { Foodstop } from 'src/app/interfaces/foodstop';
import { MinifiedUser } from '../../../interfaces/minified-user';
import { OrderStatus } from '../../../shared/order-status.enum';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit, OnDestroy {
  currentUserSub: Subscription;
  currentUsername: string;
  currentUserEmail: string;

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Foodstop
  ) {}

  dialogForm = new FormGroup({
    foodstop: new FormControl({ disabled: true, value: this.data.name }),
    orderTime: new FormControl(null, Validators.required),
    ETA: new FormControl(null, Validators.required),
    status: new FormControl(
      { value: OrderStatus.OPEN, disabled: true },
      Validators.required
    ),
  });

  ngOnInit(): void {
    this.currentUserSub = this.auth.currentUserSubject.subscribe(
      (res: MinifiedUser) => {
        this.currentUsername = res.username;
        this.currentUserEmail = res.email;
      }
    );
    this.auth.getCurrentUser();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  onPlaceOrder() {
    const newOrder = {
      authorEmail: this.currentUserEmail,
      authorUsername: this.currentUsername,
      foodstop: this.data.name,
      orderTime: this.dialogForm.value['orderTime'],
      ETA: this.dialogForm.value['ETA'],
      status: OrderStatus.OPEN,
    };
    this.orderService.postOrder(newOrder);
    this.dialogRef.close();
  }
}
