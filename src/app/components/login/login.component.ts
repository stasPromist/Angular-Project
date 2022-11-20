import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private route: Router) { }
  password:string = "";
  email:string = "";
  tryToLogin:boolean = false;
  ngOnInit(): void {
    this.userService.isLoggedIn().then((res)=>{ if (res === true) {
      console.log(this.email)
      this.route.navigate(['/dashboard'])
    }}) 
      
        
      }
  login() {
    this.tryToLogin = true;
    this.userService.login(this.email, this.password).catch(err =>
      {
        this.tryToLogin = false;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 2000
        })
      });
  }

}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event:any) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()