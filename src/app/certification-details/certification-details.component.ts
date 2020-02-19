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
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
declare var $, _

@Component({
  selector: 'app-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrls: ['./certification-details.component.css']
})
export class CertificationDetailsComponent implements OnInit {

  private Geturl = this.Url.appconstant + this.Url.GetCertificateApi;
  private SaveUpdateurl = this.Url.appconstant + this.Url.updategetAllCertificationsApi;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  ds;
  CertificateForm:FormGroup
  constructor(private makeapi: WebserviceService,private data: DatatransferService, private Formbuilder: FormBuilder, private http: Http, private Url: UrlService, private router: Router) {
    this.ds = data
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
      "pricetype":[null, Validators.compose([Validators.required])],
      "preferredamt": [null, Validators.compose([Validators.required])]
    });
  }
  ViewListDate
  idData
  ngOnInit() {
    this.tab = "basic"
    var editdata = localStorage.getItem('Viewdata');
    this.ViewListDate = JSON.parse(editdata);
    this.idData =  this.ViewListDate['_id']
    this.ServiceList = []
    this.ClientList = []
    this.LevelList = []
    this.CategoryList = []
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
  lead_list
  EditData
  Edit() {
    let reqdata = "id="+ this.idData
    return this.makeapi.method(this.Geturl ,reqdata, "post")
    .subscribe(data => {
      this.EditData = data
      $("#CertificateEditModal").modal("show")

     if(this.EditData['preferredamt'] != ''){
      $( "#checked" ).prop( "checked", true );
      this.preferredamount = true
     }else{
      $( "#checked" ).prop( "checked", false );
      this.preferredamount = false
     }
      this.CertificateForm.patchValue(this.EditData)
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
  }
  preferredamount = false
  preferred(event) {    
    if(event.target.checked == false){
      this.preferredamount = false
    }else{
      this.preferredamount = true
    }
    
  }
  SubmitCertification() {

 
      if (this.CertificateForm.invalid) {
        $.notify("Please fill all mandatory fields", "error");
        return false;
      } else {
        var getform = this.CertificateForm.value
       
        if (getform.preferredamt == null) {
          getform.preferredamt = ""
        }
        if (getform.pricetype == null) {
          getform.pricetype = ""
        }
        getform._id = this.EditData._id
        getform.clientname =  this.changevalcd2
        getform.clientid = this.EditData.clientid
        getform.providername =  this.changevalcd
        getform.providerid = this.EditData.providerid
        getform.levelname =   this.changevalcd3
        getform.levelid = this.EditData.levelid
        getform.categoryname =   this.changevalcd4
        getform.categoryid = this.EditData.categoryid
        var reqdata = "updateCertificationDetails=" + JSON.stringify(getform);
        return this.makeapi.method(this.SaveUpdateurl, reqdata, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              let reqdata = "id="+ data._id
              return this.makeapi.method(this.Geturl ,reqdata, "post")
              .subscribe(data => {
                localStorage.setItem("Viewdata", JSON.stringify(data));
                $("#CertificateEditModal").modal("hide")
                $.notify("Certification updated successfully!!!", "success");
                window.location.reload()
              
                //console.log(this.lead_list)
              },
                Error => {
                }
              );
         
            }
            else if(data.status == "failure"  && data == {}){
              $.notify("Update failed", "warn");
            }
            else if (data.isexists == true) {
              $.notify("Certification details already exists", "warn");
            }
            else {
              $.notify("Please fill all mandatory fields", "error");
            }
          },
            Error => {
            });
      }
    
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
  changevalcd
  Changeselect(val){
    this.changevalcd = val
    for (var i = 0; i < this.ServiceList.length; i++) {
      this.service = this.ServiceList[i]

      if (this.service.name ==this.changevalcd) {
        this.Serviceid = this.service._id
        this.ServiceName = this.service.name
        // $(".dataser").css({"display":"none"})
      }
      
      else{

      }
    }
    $("#servidcd").val(this.changevalcd)
    $("#selectioncd").hide()
  }
  changevalcd2
  Changeselect2(val){
    this.changevalcd2 = val
    for (var i = 0; i < this.ClientList.length; i++) {
      this.clientid = this.ClientList[i]
      this.clientMap[this.clientid.name] = this.clientid.id

      if (this.clientid.name == this.changevalcd2) {
        this.Clientid = this.clientid._id
        this.ClientName = this.clientid.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidcd2").val(this.changevalcd2)
    $("#selectioncd2").hide()
  }
  changevalcd3
  Changeselectcd3(val){
    this.changevalcd3 = val
    for (var i = 0; i < this.LevelList.length; i++) {
      this.Level = this.LevelList[i]

      if (this.Level.name == this.changevalcd3) {
        this.Levelid = this.Level._id
        this.LevelName = this.Level.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidcd3").val(this.changevalcd3)
    $("#selectioncd3").hide()
  }
  changevalcd4
  Changeselectcd4(val){
    this.changevalcd4 = val
    for (var i = 0; i < this.CategoryList.length; i++) {
      this.Category = this.CategoryList[i]

      if (this.Category.name == this.changevalcd4) {
        this.Categoryid = this.Category._id
        this.CategoryName = this.Category.name
        // $(".dataser").css({"display":"none"})
      }
    }
    
    $("#servidcd4").val(this.changevalcd4)
    $("#selectioncd4").hide()
  }
  getServiceProviderList(value) {
    
    if(value == ''){
      this.ServiceList = []
    }
    else{
      this.ServiceValue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.ServiceProviderListurl, reqdata, "post").subscribe(data => {
        this.ServiceList = data;
      
        
        
        if(data == 0){
          $.notify("Service Provider not available in master", "warn");
        }
        else{
       
      }
      $("#selectioncd").slideDown();
        //console.log(this.lead_list)
      },
        Error => {
        }
      );
    }
 
  }

  clientValueChanged(e){

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
    if(value == ''){
      this.ClientList = []
    }
    else{
      this.clientValue = value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.clientListurl, reqdata, "post").subscribe(data => {
        this.ClientList = data;
       
        if(data == 0){
          $.notify("Client not available in master", "warn");
        }else{
      
      }
      $("#selectioncd2").slideDown();
        //console.log(this.lead_list)
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
    if(value == ''){
      this.LevelList = []
    }
    else{
      this.levelValue=value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.LevelListurl, reqdata, "post").subscribe(data => {
        this.LevelList = data;
   
        if(data == 0){
          $.notify("Level not available in master", "warn");
        }
        else{
      
        
      }
      $("#selectioncd3").slideDown();
        //console.log(this.lead_list)
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
    if(value == ''){
      this.CategoryList = []
    }
    else{
      this.Categoryvalue= value
      let reqdata = "searchstr=" + value +"&page="+1
      return this.makeapi.method(this.Listurl, reqdata, "post").subscribe(data => {
        this.CategoryList = data;
       
        if(data == 0){
          $.notify("Category not available in master", "warn");
        }
        else{
    
        
      }
      $("#selectioncd4").slideDown();
        //console.log(this.lead_list)
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
  cancelModal(){
    this.CertificateForm.reset()
  }
}
