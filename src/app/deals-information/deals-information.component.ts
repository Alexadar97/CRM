import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
declare var $, _, moment
@Component({
  selector: 'app-deals-information',
  templateUrl: './deals-information.component.html',
  styleUrls: ['./deals-information.component.css']
})
export class DealsInformationComponent implements OnInit {
  p2 = 1
  p3 = 1
  ds;
  valueSidemenu = 3
  ActivityForm: FormGroup
  DueDateForm: FormGroup
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  contactnmber = /^[0-9\-+()\d\s]+$/;
  private Activityurl = this.Url.appconstant + this.Url.DealApi;
  private Updateurl = this.Url.appconstant + this.Url.DealUpdateApi;
  private Listurl = this.Url.appconstant + this.Url.DeallistApi;
  private Duedateurl = this.Url.appconstant + this.Url.DealUpdateDueDateApi;
  private DealGeturl = this.Url.appconstant + this.Url.DealGetApi;
  constructor(private makeapi: WebserviceService, private data: DatatransferService, private http: Http, private Url: UrlService, private router: Router, private Formbuilder: FormBuilder) {
    this.ds = data
    this.ActivityForm = this.Formbuilder.group({

      "type": [null, Validators.compose([Validators.required])],
      "notes": [null, Validators.compose([Validators.required])],

    });
    this.DueDateForm = this.Formbuilder.group({

      "duedate": [null, Validators.compose([Validators.required])],
      "justification": [null, Validators.compose([Validators.required])],

    });
  }
  ViewListDate: any
  Address
  ServiceList
  username
  idData
  ActivityData
  lead_list
  DueDateData
  LengthJust
  showMore = false
  RetailLead
  ngOnInit() {
    this.tab = "basic"
    var Userdetail = localStorage.getItem("Lead-Management");
    var jsonData = JSON.parse(Userdetail);
    this.username = jsonData.name
    var editdata = localStorage.getItem('Viewdata');
    this.ViewListDate = JSON.parse(editdata);
    this.idData = this.ViewListDate['_id']
    this.Address = this.ViewListDate['doorno'] + " " + this.ViewListDate['street'] + " " + this.ViewListDate['state'] + " " + this.ViewListDate['city'] + " " + this.ViewListDate['country'] + " " + this.ViewListDate['pincode']
    this.ServiceList = this.ViewListDate['services']
    this.ActivityData = this.ViewListDate['activity']
    this.RetailLead = this.ViewListDate['retaildetail']

    // this.getListDetails()
    this.getDueDateDetails()
  //   $('.btn-mores').mouseover(function() {
  //     $(".more").addClass("moretext")
  //  });
  //  $('.btn-mores').mouseout(function() {
  //   $(".more").removeClass("moretext")
  //  });

  }
  DueDateList
  dueDataDate
  DueJusti
  getDueDateDetails() {
    var reqdata = "id=" + this.idData
    return this.makeapi.method(this.DealGeturl, reqdata, "post").subscribe(data => {
      this.DueDateList = data['duedate']
      for (var i = 0; i < this.DueDateList.length; i++) {
        var DataList = this.DueDateList[i]
        if(DataList.isactive == 1){
          this.dueDataDate = DataList.duedate
          this.DueJusti = DataList.justification
            // if(duelength > 40){
            //   this.showMore= true
            // }
            // else{
            //  this.showMore= false
            // }
          
         
        }
        
      }
    },
      Error => {
      }
    );
  }
  Duedates
  JustiField
  getListDetails() {
    var getdata = "page="+1
    return this.makeapi.method(this.Listurl, getdata, "post").subscribe(data => {
      this.lead_list = data
      for (var i = 0; i < this.lead_list.length; i++) {
        var LeadIdData = this.lead_list[i]
        if (LeadIdData._id == this.IDDatass) {
          this.ActivityData = LeadIdData['activity']

        }
      }
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
  }
  tab
  markTab(type, $event) {
    this.tab = type;
    $(".tab").removeClass('tab_selected');
    $($event.target).addClass('tab_selected');


  }
  formatData(msg) {
    return this.ds.checkFormat(msg)
  }
  addActivity() {
    $("#ActivityModal").modal("show")
  }
  ServiceID
  Lost(id) {
    this.ServiceID = id
    $("#LostModal").modal("show")
  }
  Won(id) {
    this.ServiceID = id
    $("#WonModal").modal("show")
  }
  wonSubmit() {
    var reqdata = "dealid=" + this.idData + "&serviceid=" + this.ServiceID + "&status=won";
    return this.makeapi.method(this.Updateurl, reqdata, "post")
      .subscribe(data => {
        $("#WonModal").modal("hide")
        var reqdata = "id=" + this.idData
        return this.makeapi.method(this.DealGeturl, reqdata, "post").subscribe(data => {
         
       
          localStorage.setItem("Viewdata", JSON.stringify(data));
          var editdata = localStorage.getItem('Viewdata');
          this.ViewListDate = JSON.parse(editdata);
          this.ServiceList = this.ViewListDate['services']
          // window.location.reload()
        },
          Error => {
          }
        );
     
      },
        Error => {

        }
      );
  }
  LostSubmit() {
    var reqdata = "dealid=" + this.idData + "&serviceid=" + this.ServiceID + "&status=lost";
    return this.makeapi.method(this.Updateurl, reqdata, "post")
      .subscribe(data => {
        $("#LostModal").modal("hide")
        var reqdata = "id=" + this.idData
        return this.makeapi.method(this.DealGeturl, reqdata, "post").subscribe(data => {
       
          localStorage.setItem("Viewdata", JSON.stringify(data));
          var editdata = localStorage.getItem('Viewdata');
          this.ViewListDate = JSON.parse(editdata);
          this.ServiceList = this.ViewListDate['services']
          // window.location.reload()
        },
          Error => {
          }
        );
      },
        Error => {

        }
      );
  }
  IDDatass
  submitActivity() {

    if (this.ActivityForm.invalid) {
      $.notify("* Form is required", "error");
      return false;
    }
    else {

      var getdata = this.ActivityForm.value
      getdata.username = this.username
      var reqdata = "id=" + this.idData + "&activity=" + JSON.stringify(getdata);
      return this.makeapi.method(this.Activityurl, reqdata, "post")
        .subscribe(data => {
          this.IDDatass = data.businessID
          if (data.status == "success") {
            let reqdata = "id=" + data._id
            return this.makeapi.method(this.DealGeturl, reqdata, "post")
              .subscribe(data => {
                this.ActivityData = data['activity']
                this.ActivityForm.reset()
                $("#ActivityModal").modal("hide")
                // window.location.reload()
                // this.getListDetails()
                $.notify("Activity added successfully", "success");

                //console.log(this.lead_list)
              },
                Error => {
                }
              );

          
         
          }
          else if (data.isexists == true) {
            $.notify("Form is required", "warn");
          }
          else {
            $.notify("* Form is required", "error");
          }

          // return data;
        },
          Error => {
            $.notify("* Form is required", "error");
          }
        );


    }

  }
  dateDues
  jusifiData
  EditDuedate(date, justi) {
    this.dateDues = date
    this.jusifiData = justi
    $("#DuedateModal").modal("show")
    var getdata = this.DueDateForm.value
    getdata.duedate = date
    getdata.justification = justi
    this.DueDateForm.patchValue(getdata)
    
  }
  dateDue
  submitDuedate() {

    if (this.DueDateForm.invalid) {
      $("#DuedateModal").modal("show")
      $.notify("Please fill all mandatory fields", "error");
      return false;
    }
    else {
      var getdata = this.DueDateForm.value
      this.dateDue = $("#duedates").val()
      this.jusifiData = getdata.justification
      if(this.dateDue == "Invalid date"){
        var reqdata = "dealid=" + this.idData + "&duedate=" + this.dateDues + "&justification=" + this.jusifiData;
      }
      else {
        var reqdata = "dealid=" + this.idData + "&duedate=" + this.dateDue + "&justification=" + this.jusifiData;
      }
      
      return this.makeapi.method(this.Duedateurl, reqdata, "post")
        .subscribe(data => {

          $("#DuedateModal").modal("hide")
          window.location.reload()
          this.getListDetails()
          $.notify("Due Date updated successfully", "success");


          // return data;
        },
          Error => {
            $.notify("Please fill all mandatory fields", "error");
          }
        );


    }

  }
  HistoryModal() {
    $("#OpenHistory").modal("show")
  }
  date
  Time
  Username
  MoreNotes
  type
  moreNotes(data,user,time,date,type){
    this.MoreNotes = data
    this.Username = user
    this.Time = time
    this.date = date
    this.type= type
    $("#MoreNotes").modal("show")
  }
}
