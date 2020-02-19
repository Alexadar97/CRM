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
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  loading=false
  ds;
  TrainingForm: FormGroup
  private Geturl = this.Url.appconstant + this.Url.GettrainingsApi;
  private UpdateTrainingurl = this.Url.appconstant + this.Url.updategetAllTrainingsApi;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  constructor(private makeapi: WebserviceService, private data: DatatransferService, private http: Http, private Url: UrlService, private router: Router, private Formbuilder: FormBuilder) {
    this.ds = data
    this.TrainingForm = this.Formbuilder.group({
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
      "trainingdesc": [null, Validators.compose([Validators.required])],
      "preferredamt": "",
      "pricetype": [null, Validators.compose([Validators.required])]
    });
  }
  ViewListDate
  idData
  ngOnInit() {
    this.tab = "basic"
    var editdata = localStorage.getItem('Viewdata');
    this.ViewListDate = JSON.parse(editdata);
    this.idData = this.ViewListDate["_id"]
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
    let reqdata = "id=" + this.idData
    return this.makeapi.method(this.Geturl, reqdata, "post")
      .subscribe(data => {
        this.EditData = data

        $("#TrainingEditModal").modal("show")
        this.TrainingForm.patchValue(this.EditData)
        //console.log(this.lead_list)
      },
        Error => {
        }
      );
  }
  SubmitTraining() {


    if (this.TrainingForm.invalid) {
      $.notify("Please fill all mandatory fields", "error");
      return false;
    } else {
      var getform = this.TrainingForm.value

      if (getform.preferredamt == null) {
        getform.preferredamt = ""
      }
      if (getform.pricetype == null) {
        getform.pricetype = ""
      }
      getform._id = this.EditData._id
          getform.clientname =  this.changevalmd2
          getform.clientid = this.EditData.clientid
          getform.providername =  this.changevalmd
          getform.providerid = this.EditData.providerid
          getform.levelname =   this.changevalmd3
          getform.levelid = this.EditData.levelid
          getform.categoryname =   this.changevalmd4
          getform.categoryid = this.EditData.categoryid
      // this.loading=true
      var reqdata = "trainingDetails=" + JSON.stringify(getform);
      // debugger
      return this.makeapi.method(this.UpdateTrainingurl, reqdata, "post")
        .subscribe(data => {
          if (data.status == 'success') {
            let reqdata = "id=" + data.trainingID
            return this.makeapi.method(this.Geturl, reqdata, "post")
              .subscribe(data => {
                // this.loading=false
                localStorage.setItem("Viewdata", JSON.stringify(data));
               
                $("#TrainingEditModal").modal("hide")
                window.location.reload()
                $.notify("Training details updated successfully!!!", "success");
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
            $.notify("Training details already exists", "warn");
          }
          else {
            $.notify("Please fill all mandatory fields", "error");
          }
        },
          Error => {
          });
    }

  }
  keyAlphavalue(event: any) {
    const pattern = /^[A-Za-z\s]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyAlpha(event: any) {
    const pattern = /[0-9,.]/;
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
  changevalmd
  Changeselectmd(val){
    this.changevalmd = val
    for (var i = 0; i < this.ServiceList.length; i++) {
      this.service = this.ServiceList[i]

      if (this.service.name ==this.changevalmd) {
        this.Serviceid = this.service._id
        this.ServiceName = this.service.name
        // $(".dataser").css({"display":"none"})
      }
      
      else{

      }
    }
    $("#servidmd").val(this.changevalmd)
    $("#selectionmd").hide()
  }
  changevalmd2
  Changeselectmd2(val){
    this.changevalmd2 = val
    for (var i = 0; i < this.ClientList.length; i++) {
      this.clientid = this.ClientList[i]
      this.clientMap[this.clientid.name] = this.clientid.id

      if (this.clientid.name == this.changevalmd2) {
        this.Clientid = this.clientid._id
        this.ClientName = this.clientid.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidmd2").val(this.changevalmd2)
    $("#selectionmd2").hide()
  }
  changevalmd3
  Changeselectmd3(val){
    this.changevalmd3 = val
    for (var i = 0; i < this.LevelList.length; i++) {
      this.Level = this.LevelList[i]

      if (this.Level.name == this.changevalmd3) {
        this.Levelid = this.Level._id
        this.LevelName = this.Level.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidmd3").val(this.changevalmd3)
    $("#selectionmd3").hide()
  }
  changevalmd4
  Changeselectmd4(val){
    this.changevalmd4 = val
    for (var i = 0; i < this.CategoryList.length; i++) {
      this.Category = this.CategoryList[i]

      if (this.Category.name == this.changevalmd4) {
        this.Categoryid = this.Category._id
        this.CategoryName = this.Category.name
        // $(".dataser").css({"display":"none"})
      }
    }
    
    $("#servidmd4").val(this.changevalmd4)
    $("#selectionmd4").hide()
  }
  getServiceProviderLists(value) {
    
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
      $("#selectionmd").slideDown();
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
  getClientLists(value) {
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
      $("#selectionmd2").slideDown();
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
  getLevelLists(value) {
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
      $("#selectionmd3").slideDown();
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
  getTrCateLists(value) {
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
      $("#selectionmd4").slideDown();
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
    this.TrainingForm.reset()
  }
}
