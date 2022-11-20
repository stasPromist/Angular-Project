import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  subscribe: any
  constructor( private cs: CustomerService, private route: ActivatedRoute,private router: Router) { }
 
  customer: Customer = new Customer();
  uid:Number = -1;
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      // console.log(params); // { order: "popular" }
      if (params && params['uid']) {
        this.uid = Number(params['uid']);
        // console.log(this.uid)
        this.getUserFromDBById(this.uid);
        if(typeof this.uid == 'number'){ 
          this.getUserFromDBById(this.uid);
        }
      }
     

    }
  );

  }

  getUserFromDBById(uid:Number){
    this.subscribe = this.cs.customerSubject.subscribe(data => {
      const customer = data.find(c=>c.id === uid);
      if (customer) {
        this.customer = customer;
      }
     })
  }




  save() {
    if (this.customer.firstName.length < 3) {
      this.error("First name must be at least 3 characters long");
      return;
    }
    if (this.customer.lastName.length < 3) {
      this.error("Last name must be at least 3 characters long");
      return;
    }
    if (this.customer.email.length < 3) { 
      this.error("Email must be at least 3 characters long");
      return;
    }
    // console.log(this.customer)
    this.cs.createCustomer(this.customer).then(()=>{
      
      Swal.fire({
        title:'Customer created successfully',
        timer: 1500
      }
      )
      this.router.navigate([], {
        queryParams: {
          'uid': null
        },
        queryParamsHandling: 'merge'
      })
    }).catch((error) => {
      this.error(error.message);
    });
  }

  error(message: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  }

  ngOnDestroy(): void {
    this.subscribe ? this.subscribe.unsubscribe() : null;
  }

}
