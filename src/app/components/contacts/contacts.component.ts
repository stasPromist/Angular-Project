import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from 'src/app/models/Contacts';
import { ContactsServices } from 'src/app/services/contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

 
constructor(private contactsService: ContactsServices, private router: Router) { }
  subscribe: any
  contacts:Contacts[] = [];
  contactsToShow: Contacts[] = [];

  ngOnInit(): void {
    this.subscribe = this.contactsService.contactSubject.subscribe(data => {
     console.log(data);
     this.contacts = data;
     this.search('');
    })
   }
   search(value: string) {
    value = value.toLowerCase();
    this.contactsToShow = this.contacts.filter(c => c.Name.toLowerCase().includes(value) || 
    c.Email.toLowerCase().includes(value) ||
    c.Phones.toLowerCase().includes(value) )
  }

  remove(contact:Contacts) {
    Swal.fire({
      title: 'Do you want to remove ?',
      showCancelButton: true,
      confirmButtonText: 'OK',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.showLoading();
        this.contactsService.removeEmployeeById(contact.id).then(()=>{
          Swal.hideLoading();
          Swal.fire({
            title:'Customer successfully removed',
            timer: 1500
          }
          )
        }).catch(err =>{
          Swal.hideLoading();
          this.error(err.message)
        });
      } else if (result.isDenied) {
   
      }
    })
    
  
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
  goEmployee(id: number) {
    this.router.navigate(
      ['dashboard/addEmployee'],
      { queryParams: { uid: id } }
    );
  }
 
 
   ngOnDestroy(): void {
     this.subscribe ? this.subscribe.unsubscribe() : null;
   } 
 
}
