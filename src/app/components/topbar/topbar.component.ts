import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  customersToShow: any = [];
  uid: any;
  user: firebase.auth.UserCredential | undefined;
  email: any;
  constructor(public userServ: UserService, public auth: AngularFireAuth, private route: ActivatedRoute,
    private afs: AngularFirestore) { }

  ngOnInit(): void {

    this.getAuth();

  }

  getAuth() {
    return this.auth.currentUser.then((e) => { this.email = e?.email });
  }


  logout() {
    this.userServ.logout();
  }

}
