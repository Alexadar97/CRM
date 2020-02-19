import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetailContactsComponent } from './retail-contacts/retail-contacts.component';
import { BusinessContactsComponent } from './business-contacts/business-contacts.component';
import { RetailLeadsComponent } from './retail-leads/retail-leads.component';
import { BusinessLeadsComponent } from './business-leads/business-leads.component';
import { DealsComponent } from './deals/deals.component';
import { CertificationComponent } from './certification/certification.component';
import { TrainingComponent } from './training/training.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { WebserviceService } from './api-services/webservice.service'
import { DatatransferService } from './api-services/datatransfer.service'
import { AuthGuard } from './api-services/canactivate.service';
import { RetailcontactmodalComponent } from './retailcontactmodal/retailcontactmodal.component';
import { RetailleadmodalComponent } from './retailleadmodal/retailleadmodal.component';
import { BusinesscontactmodalComponent } from './businesscontactmodal/businesscontactmodal.component';
import { BusinessleadmodalComponent } from './businessleadmodal/businessleadmodal.component';
import { CertificatemodalComponent } from './certificatemodal/certificatemodal.component';
import { TrainningmodalComponent } from './trainningmodal/trainningmodal.component';
import { RetailleadInformationComponent } from './retaillead-information/retaillead-information.component';
import { RetailcontactInformationComponent } from './retailcontact-information/retailcontact-information.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DealsmodalComponent } from './dealsmodal/dealsmodal.component';
import { DealsInformationComponent } from './deals-information/deals-information.component';
import { SearchDealComponent } from './search-deal/search-deal.component';
import { BusinessLeadInformationComponent } from './business-lead-information/business-lead-information.component';
import { BusinessContactInformationComponent } from './business-contact-information/business-contact-information.component';
import { RetailSelectedModalComponent } from './retail-selected-modal/retail-selected-modal.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { CertificationDetailsComponent } from './certification-details/certification-details.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LeadDashboardComponent } from './lead-dashboard/lead-dashboard.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    RetailContactsComponent,
    BusinessContactsComponent,
    RetailLeadsComponent,
    BusinessLeadsComponent,
    DealsComponent,
    CertificationComponent,
    TrainingComponent,
    UserComponent,
    LoginComponent,
    DashbordComponent,
    BusinesscontactmodalComponent,
    RetailcontactmodalComponent,
    RetailleadmodalComponent,
    BusinessleadmodalComponent,
    CertificatemodalComponent,
    TrainningmodalComponent,
    RetailleadInformationComponent,
    RetailcontactInformationComponent,
    UserModalComponent,
    MasterDetailsComponent,
    DealsmodalComponent,
    DealsInformationComponent,
    SearchDealComponent,
    BusinessLeadInformationComponent,
    BusinessContactInformationComponent,
    RetailSelectedModalComponent,
    TrainingDetailsComponent,
    CertificationDetailsComponent,
    SpinnerComponent,
    LeadDashboardComponent,
    UserDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule,
    ChartModule,
    HighchartsChartModule,
  ],
  providers: [WebserviceService, DatatransferService, AuthGuard
  ,{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
