import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-show-customer-details',
  templateUrl: './show-customer-details.component.html',
  styleUrls: ['./show-customer-details.component.css']
})
export class ShowCustomerDetailsComponent implements OnInit {
  subscribe: any
  customers:Customer[] = [];
  customersToShow: any = [];
  users:any = [];
  uid: any;
  constructor(public customerService: CustomerService,private afs: AngularFirestore,
     private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    console.log(this.route.queryParams)
    this.route.queryParams
    .subscribe(params =>{
      this.uid = Number(params['uid']);
      this.ShowCustomerDetails('customer')
    })
    
  }

  ShowCustomerDetails(collection:string) {
    this.afs.collection(collection).ref.where('id', '==', this.uid).get().then((documents) =>{
      documents.forEach((doc) =>{
        this.customersToShow.push(doc.data());
        console.log(doc.data());
      })
    })
    .catch((error) => console.error(error));
  }

}
