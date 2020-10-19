import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Foodstop } from '../interfaces/foodstop';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  foodstopsChanged = new Subject<Foodstop[]>();

  constructor(private afs: AngularFirestore) {}

  getCompanies() {
    return this.afs.collection('companies').valueChanges();
  }

  getFoodstops() {
    this.afs
      .collection('foodstops')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              address: doc.payload.doc.data()['address'],
              f_delivery: doc.payload.doc.data()['f_delivery'],
              menu: doc.payload.doc.data()['menu'],
              name: doc.payload.doc.data()['name'],
              phone: doc.payload.doc.data()['phone'],
            };
          });
        })
      )
      .subscribe((foodstops: Foodstop[]) => {
        this.foodstopsChanged.next(foodstops);
      });
  }
}
