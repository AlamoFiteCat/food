// [Angular Imports]
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// [rxjs Imports]
import { Subscription } from 'rxjs';

// [Custom Imports]
import { MinifiedUser } from 'src/app/interfaces/minified-user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentDialogData } from '../post/post.component';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
})
export class CommentDialogComponent implements OnInit {
  currentUserSub: Subscription;
  currentUsername: string;

  commentForm = new FormGroup({
    comment: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
    ]),
  });

  constructor(
    private commentService: CommentService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData
  ) {}

  ngOnInit(): void {
    this.currentUserSub = this.auth.currentUserSubject.subscribe(
      (res: MinifiedUser) => {
        this.currentUsername = res.username;
      }
    );
    this.auth.getCurrentUser();
  }

  onSubmitComment() {
    this.commentService.postComment({
      timestamp: new Date(),
      postId: this.data.PostId,
      author: this.currentUsername,
      text: this.commentForm.value['comment'],
    });
    this.dialogRef.close();
  }
}
