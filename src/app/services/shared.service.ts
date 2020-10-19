import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private afs: AngularFirestore) {}

  getCompanies() {
    return this.afs.collection('companies').valueChanges();
  }
}
