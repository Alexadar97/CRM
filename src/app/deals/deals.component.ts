import { Component, OnInit } from '@angular/core';
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
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  p2 = 1
  private Listurl = this.Url.appconstant + this.Url.DeallistApi;
  private Paginationurl = this.Url.appconstant + this.Url.DealPaginationApi;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router) { }
  lead_list = [];

  ngOnInit() {

    this.DelaeList()

  }
  LastContact
  activity = []
  DataActivity = []
  loading = false
  DelaeList() {
   var getdata =  "page=" +this.currentPage
    return this.makeapi.method(this.Listurl, getdata, "post").subscribe(data => {
      // this.loading = false
      this.lead_list = data

      //console.log(this.lead_list)

      for (var k = 0; k < data.length; k++) {
        this.DataActivity = data[k]['activity']
        if (this.DataActivity != undefined) {
          var LastContact = 0
          var lastContactDate
          for (var i = 0; i < this.DataActivity.length; i++) {
            var timestamp = new Date(this.DataActivity[i].date).getTime();
 
            if (timestamp > LastContact) {
              LastContact = timestamp
              lastContactDate = this.DataActivity[i].date
            }

          }

        }
        this.LastContact = lastContactDate
        data[k]['lastContactDate'] = lastContactDate

      }
      
    this.PaginationCount()
    },
      Error => {
      }
    );
  }
  notshow = false;
  hidedropdown() {
    this.notshow = true
  }
  Searchval
  SearchdataList(value) {
    this.Searchval = value
    var reqdata = "searchstr=" + value + "page=" +this.currentPage
    return this.makeapi.method(this.Listurl, reqdata, "post").subscribe(data => {
      this.lead_list = data
      if (this.lead_list) {
        this.p2 = 1
      } else {

      }
      this.PaginationCountSearch()
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
  }
  dealsview(data) {

    localStorage.setItem("Viewdata", JSON.stringify(data));
    this.router.navigateByUrl('/dashboard/deals-information')
  }

  checkAll(event){
    if(event.target.checked == true){
      $( ".checkedsingle" ).prop( "checked", true );
    }
    else{
      $( ".checkedsingle" ).prop( "checked", false );
    }
   
  }
  checkSingle(event){
    if(event.target.checked == true){
      $( ".checkAll" ).prop( "checked", false );
    }
    else{
      $( ".checkAll" ).prop( "checked", false );
    }
  }
  currentPage = 1;
  totalPages
  paginatePartList(page) {
    if (page == 'prev' && this.currentPage > 1) {
      if (page == 'prev') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPage = this.currentPage - 1
    }
    else {
      if (page == 'next') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPage = this.currentPage + 1

    }
    this.DelaeList()
  }
  searchPage() {
    var inputPageValue = parseInt($("#currentPageInput").val())
    if (this.totalPages < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInput").val(this.currentPage)
    } else {
      this.currentPage = inputPageValue;
    }
    this.DelaeList()
  }
  totalPartCount: any;
 PaginationCount() {

    return this.makeapi.method(this.Paginationurl, "", "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCount = totalcount;

        this.totalPages = Math.ceil(this.totalPartCount / 10);


      },
        Error => {
        });
  }

 PaginationCountSearch() {
  var getdata = "searchstr="+ this.Searchval
    return this.makeapi.method(this.Paginationurl, getdata, "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCount = totalcount;

        this.totalPages = Math.ceil(this.totalPartCount / 10);


      },
        Error => {
        });
  }
}
