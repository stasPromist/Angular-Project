import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IfUserLogin } from './services/authGuard.secvice';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AccordionSideBarComponent } from './components/accordion-side-bar/accordion-side-bar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CostumersComponent } from './components/costumers/costumers.component';
import { TimeStampToDate } from './pipes/timeStampToDate';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddNewEmployeeComponent } from './components/add-new-employee/add-new-employee.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { ShowCustomerDetailsComponent } from './components/show-customer-details/show-customer-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccordionSideBarComponent,
    TopbarComponent,
    EditUserComponent,
    CostumersComponent,
    TimeStampToDate,
    ContactsComponent,
    AddNewEmployeeComponent,
    AddCustomerFormComponent,
    ShowCustomerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
   
  ],
  providers: [IfUserLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
