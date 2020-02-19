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
declare var $, _

@Component({
  selector: 'app-certificatemodal',
  templateUrl: './certificatemodal.component.html',
  styleUrls: ['./certificatemodal.component.css']
})
export class CertificatemodalComponent implements OnInit {

  CertificateForm: FormGroup;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  private SaveCertificateurl = this.Url.appconstant + this.Url.getAllCertificationsApi;
  private SaveUpdateurl = this.Url.appconstant + this.Url.updategetAllCertificationsApi;
  private Geturl = this.Url.appconstant + this.Url.GetCertificateApi;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router, private Formbuilder: FormBuilder) {
    this.CertificateForm = this.Formbuilder.group({
      "_id": [""],
      "name": [null, Validators.compose([Validators.required])],
      "price": [null, Validators.compose([Validators.required])],
      "clientid": [""],
      "clientname": [null, Validators.compose([Validators.required])],
      "providerid": [""],
      "providername": [null, Validators.compose([Validators.required])],
      "levelid": [""],
      "levelname": [null, Validators.compose([Validators.required])],
      "categoryid": [""],
      "categoryname": [null, Validators.compose([Validators.required])],
      "code": [null, Validators.compose([Validators.required])],
      "pricetype": [null, Validators.compose([Validators.required])],
      "preferredamt": [null, Validators.compose([Validators.required])]
    });
  }
  btnname = "Save";
  myDateValue: Date;
  ngOnInit() {
    this.myDateValue = new Date();
    this.CertificateForm.reset()
    this.ServiceList = []
    this.ClientList = []
    this.LevelList = []
    this.CategoryList = []

    // if (this.CategoryLists.length == 0 && this.LevelLists.length == 0 &&
    //   this.ClientLists.length == 0 && this.ServiceLists.length == 0) {
    //   $(".modal-content").css({ "display": "none" })
    //   $("#overlay").css({ "display": "block" })
    // }
  }
  off() {
    $(".modal-content").css({ "display": "block" })
    $("#overlay").css({ "display": "none" })
  }
  SubmitCertification() {
    if (this.btnname == 'Save') {
      if (this.CertificateForm.invalid) {
        $.notify("Please fill all mandatory fields", "error");
        return false;
      }


      else {
        var getform = this.CertificateForm.value

        if (getform.preferredamt == null) {
          getform.preferredamt = ""
        }
        if (getform.pricetype == null) {
          getform.pricetype = ""
        }
        getform.clientname = this.ClientName
        getform.clientid = this.Clientid
        getform.providername = this.ServiceName
        getform.providerid = this.Serviceid
        getform.levelname = this.LevelName
        getform.levelid = this.Levelid
        getform.categoryname = this.CategoryName
        getform.categoryid = this.Categoryid

        var reqdata = "certificationDetails=" + JSON.stringify(getform);
        return this.makeapi.method(this.SaveCertificateurl, reqdata, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              let reqdata = "id=" + data._id
              return this.makeapi.method(this.Geturl, reqdata, "post")
                .subscribe(data => {
                  localStorage.setItem("Viewdata", JSON.stringify(data));
                  $("#CertificateModal").modal("hide")
                  this.router.navigateByUrl("/dashboard/certificate-details")
                  // window.location.reload()
                  this.ServiceList = []
                  this.ClientList = []
                  this.LevelList = []
                  this.CategoryList = []
                  this.CertificateForm.reset()
                  $.notify("Certification added successfully!!!", "success");
                },
                  Error => {
                  }
                );
            }
            else if (data.status == "failure" && data == {}) {
              $.notify("Update failed", "warn");
            }
            else if (data.isexists == true) {
              $.notify("Certification details already exists", "warn");
            }
            else {
              $.notify("Certification details already exist!!!", "warn");
            }
          },
            Error => {
            });
      }
    }

  }

  preferredamount = false
  preferred() {
    this.preferredamount = !this.preferredamount
  }
  keyAlpha(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyAlphavalue(event: any) {
    const pattern = /^[A-Za-z\s]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ServiceList = []
  service
  Serviceid
  ServiceName
  ServiceValue
  changeval
  Changeselect(val) {
    this.changeval = val
    for (var i = 0; i < this.ServiceList.length; i++) {
      this.service = this.ServiceList[i]

      if (this.service.name == this.changeval) {
        this.Serviceid = this.service._id
        this.ServiceName = this.service.name
        // $(".dataser").css({"display":"none"})
      }

      else {

      }
    }
    $("#servid").val(this.changeval)
    $("#selection").hide()
    
  }
  changeval2
  Changeselect2(val) {
    this.changeval2 = val
    for (var i = 0; i < this.ClientList.length; i++) {
      this.clientid = this.ClientList[i]
      this.clientMap[this.clientid.name] = this.clientid.id

      if (this.clientid.name == this.changeval2) {
        this.Clientid = this.clientid._id
        this.ClientName = this.clientid.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servid2").val(this.changeval2)
    $("#selection2").hide()
    
  }
  changeval3
  Changeselect3(val) {
    this.changeval3 = val
    for (var i = 0; i < this.LevelList.length; i++) {
      this.Level = this.LevelList[i]

      if (this.Level.name == this.changeval3) {
        this.Levelid = this.Level._id
        this.LevelName = this.Level.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servid3").val(this.changeval3)
    $("#selection3").hide()
  }
  changeval4
  Changeselect4(val) {
    this.changeval4 = val
    for (var i = 0; i < this.CategoryList.length; i++) {
      this.Category = this.CategoryList[i]

      if (this.Category.name == this.changeval4) {
        this.Categoryid = this.Category._id
        this.CategoryName = this.Category.name
        // $(".dataser").css({"display":"none"})
      }
    }

    $("#servid4").val(this.changeval4)
    $("#selection4").hide()
    
  }
  getServiceProviderList(value) {

    if (value == '') {
      this.ServiceList = []
    }
    else {
      this.ServiceValue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.ServiceProviderListurl, reqdata, "post").subscribe(data => {
        this.ServiceList = data;



        if (data == 0) {
          $.notify("Service Provider not available in master", "warn");
        }
        else {

        }
        $("#selection").slideDown();
      },
        Error => {
        }
      );
    }

  }

  clientValueChanged(e) {
  }


  ClientList = []
  clientitems
  clientid
  seletedItemMap
  clientValue
  ClientName
  Clientid
  clientMap = {}
  getClientList(value) {
    if (value == '') {
      this.ClientList = []
    }
    else {
      this.clientValue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.clientListurl, reqdata, "post").subscribe(data => {
        this.ClientList = data;

        if (data == 0) {
          $.notify("Client not available in master", "warn");
        } else {

        }
        $("#selection2").slideDown();
      },
        Error => {
        }
      );
    }

  }
  LevelList = []
  Level
  LevelName
  levelValue
  Levelid
  getLevelList(value) {
    if (value == '') {
      this.LevelList = []
    }
    else {
      this.levelValue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.LevelListurl, reqdata, "post").subscribe(data => {
        this.LevelList = data;

        if (data == 0) {
          $.notify("Level not available in master", "warn");
        }
        else {


        }
        $("#selection3").slideDown();
      },
        Error => {
        }
      );
    }

  }
  CategoryList = []
  Category
  Categoryvalue
  Categoryid
  CategoryName
  getTrCateList(value) {
    if (value == '') {
      this.CategoryList = []
    }
    else {
      this.Categoryvalue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.Listurl, reqdata, "post").subscribe(data => {
        this.CategoryList = data;

        if (data == 0) {
          $.notify("Category not available in master", "warn");
        }
        else {


        }
        $("#selection4").slideDown();
      },
        Error => {
        }
      );
    }

  }
  notshow = false;
  hidedropdown() {
    this.notshow = true
  }
  cancelModal() {
    this.ServiceList = []
    this.ClientList = []
    this.LevelList = []
    this.CategoryList = []
    this.CertificateForm.reset()
    $("#selection4").hide()
    $("#selection").hide()
    $("#selection2").hide()
    $("#selection3").hide()
  }

}
