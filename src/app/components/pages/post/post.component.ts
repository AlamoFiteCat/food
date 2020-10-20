// [Angular Imports]
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

// [rxjs Imports]
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment';

// [Custom Imports]
import { Order } from 'src/app/interfaces/order';
import { CommentService } from 'src/app/services/comment.service';
import { OrderService } from 'src/app/services/order.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

export interface CommentDialogData {
  PostId: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  orderSubscription: Subscription;
  commentSubscription: Subscription;
  currentOrder: Order;
  commentList: Comment[];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    // [This subscription gets the route]
    this.routeSubscription = this.route.params.subscribe((res) => {
      // [This subscription gets the current order]
      this.orderSubscription = this.orderService.orderSubject.subscribe(
        (order) => {
          this.currentOrder = order;
          // [This subscription gets all the comments]
          this.commentSubscription = this.commentService.commentsChanged.subscribe(
            (comments) => {
              this.commentList = comments;
            }
          );
          this.commentService.getAllComments(this.currentOrder.id);
        }
      );
      this.orderService.getOrderById(res.id);
    });
  }

  openCommentDialog(): void {
    const dialogData: CommentDialogData = {
      PostId: this.currentOrder.id,
    };
    this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: dialogData,
    });
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.commentSubscription.unsubscribe();
  }
}
