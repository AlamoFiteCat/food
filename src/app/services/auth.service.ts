import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/posts']);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  register(user: User) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.toastr.success('Thank you for using our service!', 'Success!');
        this.firestore.collection('users').add({
          email: user.email,
          company: user.company,
        });
        this.router.navigate(['/posts']);
        sessionStorage.setItem('userCompany', user.company);
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
        this.firestore
          .collection('users', (ref) => ref.where('email', '==', email))
          .get()
          .subscribe((res) => {
            res.docs.forEach((user) => {
              const logged = user.data();
              localStorage.setItem('userCompany', logged.company);
            });
          });
      })
      .catch((err) => {
        this.toastr.error(err.message, 'Error!');
      });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.toastr.success('See you soon!', 'Success!');
      this.router.navigate(['/']);
      localStorage.removeItem('userCompany');
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
