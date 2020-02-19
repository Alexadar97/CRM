import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashbordComponent } from './dashbord/dashbord.component'
import { AuthGuard } from './api-services/canactivate.service';
import { BusinessLeadsComponent } from './business-leads/business-leads.component';
import { RetailLeadsComponent } from './retail-leads/retail-leads.component';
import { BusinessContactsComponent } from './business-contacts/business-contacts.component';
import { RetailContactsComponent } from './retail-contacts/retail-contacts.component';
import { DealsComponent } from './deals/deals.component';
import { RetailleadInformationComponent } from './retaillead-information/retaillead-information.component';
import { RetailcontactInformationComponent } from './retailcontact-information/retailcontact-information.component';
import { UserComponent } from './user/user.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { CertificationComponent } from './certification/certification.component';
import { TrainingComponent } from './training/training.component';
import { DealsInformationComponent } from './deals-information/deals-information.component';
import { BusinessLeadInformationComponent } from './business-lead-information/business-lead-information.component';
import { BusinessContactInformationComponent } from './business-contact-information/business-contact-information.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { CertificationDetailsComponent } from './certification-details/certification-details.component';
import { LeadDashboardComponent } from './lead-dashboard/lead-dashboard.component';
const routes: Routes = [{
  path: '', pathMatch: 'full', redirectTo: "login"
},
{ path: 'login', component: LoginComponent },
{
  path: 'dashboard', component: DashbordComponent, canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'lead-dashboard', pathMatch: 'full' },
    { path: 'lead-dashboard', component: LeadDashboardComponent },
    { path: 'Businesslead', component: BusinessLeadsComponent },
    { path: 'Retaillead', component: RetailLeadsComponent },
    { path: 'BusinessContact', component: BusinessContactsComponent },
    { path: 'RetailContact', component: RetailContactsComponent },
    { path: 'Deals', component: DealsComponent },
    { path: 'Retail-lead-information', component: RetailleadInformationComponent },
    { path: 'Retail-contact-information', component: RetailcontactInformationComponent },
    { path: 'user', component: UserComponent },
    { path: 'master', component: MasterDetailsComponent },
    { path: 'certification', component: CertificationComponent },
    { path: 'training', component: TrainingComponent },
    { path: 'deals-information', component: DealsInformationComponent },
    { path: 'Business-lead-information', component: BusinessLeadInformationComponent },
    { path: 'Business-contact-information', component: BusinessContactInformationComponent },
    { path: 'user-view', component: UserModalComponent },
    { path: 'training-details', component: TrainingDetailsComponent },
    { path: 'certificate-details', component: CertificationDetailsComponent },
  ]
}]
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }
