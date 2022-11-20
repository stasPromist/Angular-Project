import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { IfUserLogin } from './services/authGuard.secvice';
import { CostumersComponent } from './components/costumers/costumers.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddNewEmployeeComponent } from './components/add-new-employee/add-new-employee.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { ShowCustomerDetailsComponent } from './components/show-customer-details/show-customer-details.component';

const routes: Routes = [
{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{path: 'dashboard', component: DashboardComponent,canActivate: [IfUserLogin], 
  children: [
    {path:'', component:CostumersComponent},

     {path: 'edit', component: EditUserComponent},

     {path: 'addEmployee', component: AddNewEmployeeComponent},

     {path: 'contacts', component: ContactsComponent},
     {path: 'addNewCustomer', component: AddCustomerFormComponent},
     {path: 'showCustomerDetails', component: ShowCustomerDetailsComponent},

  
  ]},
{path: 'login', component: LoginComponent},    
{path: 'edit', component: EditUserComponent},
{path: 'contacts', component: ContactsComponent},
{path: 'addEmployee', component: AddNewEmployeeComponent},
{path: 'showCustomerDetails', component: ShowCustomerDetailsComponent},
{path: 'addNewCustomer', component: AddCustomerFormComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
