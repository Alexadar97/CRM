import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebserviceService } from '../api-services/webservice.service'
import { DatatransferService } from '../api-services/datatransfer.service'
import { UrlService } from '../api-services/url.service'
declare var $
@Component({
  selector: 'app-search-deal',
  templateUrl: './search-deal.component.html',
  styleUrls: ['./search-deal.component.css']
})
export class SearchDealComponent implements OnInit {

  private search = this.Url.appconstant + this.Url.SearchContactsApi;
  private Geturl = this.Url.appconstant + this.Url.GetRetailLeadApi;
  private GetBusinessurl = this.Url.appconstant + this.Url.GetBusinessApi;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router,private Formbuilder: FormBuilder) {
    // config.backdrop = 'static';

  }

  ngOnInit() {
  }
  NewUserModal() {
    $("#SelectContact").modal("show")
  }
  searchRetails(event, id, type) {
    event.stopPropagation();
    $("#Dealtypesdrop").slideToggle("fast");
    if (type == 'contact') {
      let reqdata = "id=" + id
      return this.makeapi.method(this.Geturl, reqdata, "post")
        .subscribe(data => {
          localStorage.setItem("Viewdata", JSON.stringify(data));
          this.router.navigateByUrl("/dashboard/Retail-contact-information")
        },
          Error => {
          }
        );
    }
    else if (type == 'lead') {
      let reqdata = "id=" + id
      return this.makeapi.method(this.Geturl, reqdata, "post")
        .subscribe(data => {
          localStorage.setItem("Viewdata", JSON.stringify(data));
          this.router.navigateByUrl("/dashboard/Retail-lead-information")
        },
          Error => {
          }
        );
    }
  }
  searchBusiness(event, id, type) {
    event.stopPropagation();
    $("#Dealtypesdrop").slideToggle("fast");
    if (type == 'contact') {
      let reqdata = "id=" + id
      return this.makeapi.method(this.GetBusinessurl, reqdata, "post")
        .subscribe(data => {
          localStorage.setItem("Viewdata", JSON.stringify(data));
          this.router.navigateByUrl("/dashboard/Business-contact-information")
        },
          Error => {
          }
        );
    }
    else if (type == 'lead') {
      let reqdata = "id=" + id
      return this.makeapi.method(this.GetBusinessurl, reqdata, "post")
        .subscribe(data => {
          localStorage.setItem("Viewdata", JSON.stringify(data));
          this.router.navigateByUrl("/dashboard/Business-lead-information")
        },
          Error => {
          }
        );
    }
  }
  SearchListBusi
  Searchvalue
  RetailSearch
  newUser = false
  SearchdataDeal(value, event) {
    if (value) {
      event.stopPropagation();
      $("#Dealtypesdrop").slideToggle("fast");
    }
    this.Searchvalue = value
    let reqdata = "searchstr=" + value
    return this.makeapi.method(this.search, reqdata, "post")
      .subscribe(data => {
        this.SearchListBusi = data['business'];
        this.RetailSearch = data['retail']

        if (this.SearchListBusi.length == 0 && this.RetailSearch.length == 0) {
          this.newUser = true
        }
        else {
          this.SearchListBusi = data['business'];
          this.RetailSearch = data['retail']
        }
        // debugger
        //console.log(this.lead_list)
      },
        Error => {
        }
      );
  }
}
