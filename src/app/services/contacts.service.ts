import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Contacts } from '../models/Contacts';
import { Customer, UserStatus } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class ContactsServices {
  unsubscribe: any = null;


  constructor(private afs: AngularFirestore) {
    this.subscribeToEmployeeCollection();

  }



  contactCollection: string = 'contacts'
  contacts: Contacts[] = [];
  contactSubject = new BehaviorSubject<Contacts[]>(this.contacts)

  createEmployee(contact: Contacts) {

    const pathToDocument = this.contactCollection + '/' + contact.id;
    return this.afs.doc(pathToDocument).set(contact.toFirebase())


  }

  subscribeToEmployeeCollection(status: UserStatus = 1) {
    if (this.unsubscribe !== null) {
      return;
      //
    }
    this.unsubscribe = this.afs.collection(this.contactCollection).ref.where('status', '==', status).onSnapshot((documents) => {
      this.contacts = [];
      documents.forEach((doc) => {
        this.contacts.push(Contacts.fromFirebaseToClass(doc.data()));
        console.log(this.contacts);
      })
      this.contactSubject.next(this.contacts);
    }, error => console.log(error))


  }



  removeEmployeeById(id: number) {
    return this.afs.doc(this.contactCollection + "/" + id).set({ status: 0 }, { merge: true })
  }


}
