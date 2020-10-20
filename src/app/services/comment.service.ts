import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  commentsChanged = new Subject<Comment[]>();

  constructor(
    private firestore: AngularFirestore,
    public toastr: ToastrService
  ) {}

  getAllComments(orderId: string) {
    this.firestore
      .collection(`/orders/${orderId}/comments`)
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              postId: doc.payload.doc.data()['postId'],
              timestamp: doc.payload.doc.data()['timestamp'],
              author: doc.payload.doc.data()['author'],
              text: doc.payload.doc.data()['text'],
            };
          });
        })
      )
      .subscribe((comments: Comment[]) => {
        this.commentsChanged.next(comments);
      });
  }

  getCommentById() {}

  postComment(comment: Comment) {
    this.firestore
      .collection(`/orders/${comment.postId}/comments`)
      .add(comment)
      .then(
        () => {
          this.toastr.success('Comment posted! Cheers!', 'Success!');
        },
        (err) => {
          this.toastr.error(err.message, 'Error!');
        }
      )
      .catch((err) => {
        this.toastr.error(err.message, 'Error!');
      });
  }

  putComment() {}

  deleteComment() {}
}
