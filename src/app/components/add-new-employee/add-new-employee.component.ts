import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from 'src/app/models/Contacts';
import { ContactsServices } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})

export class AddNewEmployeeComponent implements OnInit {
constructor( private cs: ContactsServices, private route: ActivatedRoute,private router: Router) { }
subscribe: any

contact: Contacts = new Contacts();
uid:Number = -1;
ngOnInit(): void {
  this.route.queryParams
  .subscribe(params => {
    // console.log(params); // { order: "popular" }
    if (params && params['uid']) {
      this.uid = Number(params['uid']);
      // console.log(this.uid)
      this.getEmployeeFromDById(this.uid);
      if(typeof this.uid == 'number'){ 
        this.getEmployeeFromDById(this.uid);
      }
    }
   

  }
);

}

getEmployeeFromDById(uid:Number){
  this.subscribe = this.cs.contactSubject.subscribe(data => {
    const contact = data.find(c=>c.id === uid);
    if (contact) {
      this.contact = contact;
    }
   })
}




save() {
  if (this.contact.Name.length < 3) {
    this.error("First name must be at least 3 characters long");
    return ;
    
  }
 
  if (this.contact.Email.length < 3) { 
    this.error("Email must be at least 3 characters long");
    return;
  }

  
  // console.log(this.customer)
  this.cs.createEmployee(this.contact).then(()=>{
    
    Swal.fire({
      title:'Contact created successfully',
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
  

