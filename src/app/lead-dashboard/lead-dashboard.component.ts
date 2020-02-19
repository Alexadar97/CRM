import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Grid, VirtualScroll, Page, dataReady } from '@syncfusion/ej2-grids';
import { WebserviceService } from '../api-services/webservice.service'
import { DatatransferService } from '../api-services/datatransfer.service'
import { UrlService } from '../api-services/url.service'
declare var $
@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead-dashboard.component.html',
  styleUrls: ['./lead-dashboard.component.css']
})
export class LeadDashboardComponent implements OnInit {

  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router) { }
  UserRole
  ngOnInit() {
    var Userdetail = localStorage.getItem("Lead-Management");
    var jsonData = JSON.parse(Userdetail);

    this.UserRole = jsonData['userrole'];
  }

}
