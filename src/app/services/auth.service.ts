import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  register(user: User) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.toastr.success('Thank you for using our service!', 'Success!');
        this.firestore.collection('users').add({
          emai: user.email,
          company: user.company,
        });
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Error!');
      });
  }

  login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Nice to see you again!', 'Success!');
        this.router.navigate(['/posts']);
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Error!');
      });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.toastr.success('See you soon!', 'Success!');
      this.router.navigate(['/']);
    });
  }
}
