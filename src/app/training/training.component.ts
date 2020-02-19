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
declare var $
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  p2 = 1
  TrainingForm: FormGroup
  private ListCerturl = this.Url.appconstant + this.Url.ListgetAlltrainingsApi;
  private Geturl = this.Url.appconstant + this.Url.GettrainingsApi;
  private UpdateTrainingurl = this.Url.appconstant + this.Url.updategetAllTrainingsApi;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  private Paginationurl = this.Url.appconstant + this.Url.TrainPaginationApi;
  constructor(private makeapi: WebserviceService, private data: DatatransferService, private http: Http, private Url: UrlService, private router: Router, private Formbuilder: FormBuilder) {
    // this.ds = data
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
      "pricetype":[null, Validators.compose([Validators.required])]
    });
  }
  ngOnInit() {
    this.getTrainingList()
    this.ServiceList = []
    this.ClientList = []
    this.LevelList = []
    this.CategoryList = []
  }
  TrainList = []

  PriceIcon
  loading = false
  getTrainingList() {
    // this.loading= true
    var getdata =  "page=" +this.currentPage
    return this.makeapi.method(this.ListCerturl,getdata, "post").subscribe(data => {
      // this.loading =false
      this.TrainList = data
      for (var i = 0; i < this.TrainList.length; i++) {
        var DataArr = this.TrainList[i]
        if(DataArr._id){
          if (DataArr.pricetype == 'INR') {
            this.PriceIcon = '₹'
          } else if (DataArr.pricetype  == 'DOLLER') {
            this.PriceIcon = '$'
          } else if (DataArr.pricetype  == 'EURO') {
            this.PriceIcon = '€'
          }
        }
     
      }
      this.PaginationCount()
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
  }
  DataLists
  ViewDetails(data) {
    localStorage.setItem("Viewdata", JSON.stringify(data));
    this.router.navigateByUrl('/dashboard/training-details')
  }
  Searchval
  SearchdataList(value) {
    this.Searchval = value
    let reqdata = "searchstr=" + value + "&page=" +this.currentPage
    return this.makeapi.method(this.ListCerturl, reqdata, "post").subscribe(data => {
      this.TrainList = data
      if(this.TrainList){
        this.p2=1
      }else{
        
      }
      this.PaginationCountSearch()
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
      }
      lead_list
      EditData
      Edit(data) {
        let reqdata = "id=" + data._id
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
          getform.clientname =  this.changevalm2
          getform.clientid = this.EditData.clientid
          getform.providername =  this.changevalm
          getform.providerid = this.EditData.providerid
          getform.levelname =   this.changevalm3
          getform.levelid = this.EditData.levelid
          getform.categoryname =   this.changevalm4
          getform.categoryid = this.EditData.categoryid
          // this.loading=true
          // debugger
          var reqdata = "trainingDetails=" + JSON.stringify(getform);
          return this.makeapi.method(this.UpdateTrainingurl, reqdata, "post")
            .subscribe(data => {
              if (data.status == 'success') {
                let reqdata = "id=" + data.trainingID
                return this.makeapi.method(this.Geturl, reqdata, "post")
                  .subscribe(data => {
                    // this.loading=false
                    localStorage.setItem("Viewdata", JSON.stringify(data));
                    this.TrainingForm.reset()
                    $("#TrainingEditModal").modal("hide")
                    // window.location.reload()
                    this.router.navigateByUrl("/dashboard/training-details")
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
      changevalm
      Changeselectm(val){
        
        this.changevalm = val
        for (var i = 0; i < this.ServiceList.length; i++) {
          this.service = this.ServiceList[i]
    
          if (this.service.name ==this.changevalm) {
            this.Serviceid = this.service._id
            this.ServiceName = this.service.name
            // $(".dataser").css({"display":"none"})
          }
          
          else{
    
          }
        }
        $("#servidm").val(this.changevalm)
        $("#selectionm").hide()
      }
      changevalm2
      Changeselectm2(val){
        this.changevalm2 = val
        for (var i = 0; i < this.ClientList.length; i++) {
          this.clientid = this.ClientList[i]
          this.clientMap[this.clientid.name] = this.clientid.id
    
          if (this.clientid.name == this.changevalm2) {
            this.Clientid = this.clientid._id
            this.ClientName = this.clientid.name
            // $(".dataser").css({"display":"none"})
          }
        }
        $("#servidm2").val(this.changevalm2)
        $("#selectionm2").hide()
      }
      changevalm3
      Changeselectm3(val){
        this.changevalm3 = val
        for (var i = 0; i < this.LevelList.length; i++) {
          this.Level = this.LevelList[i]
    
          if (this.Level.name == this.changevalm3) {
            this.Levelid = this.Level._id
            this.LevelName = this.Level.name
            // $(".dataser").css({"display":"none"})
          }
        }
        $("#servidm3").val(this.changevalm3)
        $("#selectionm3").hide()
      }
      changevalm4
      Changeselectm4(val){
        this.changevalm4 = val
        for (var i = 0; i < this.CategoryList.length; i++) {
          this.Category = this.CategoryList[i]
    
          if (this.Category.name == this.changevalm4) {
            this.Categoryid = this.Category._id
            this.CategoryName = this.Category.name
            // $(".dataser").css({"display":"none"})
          }
        }
        
        $("#servidm4").val(this.changevalm4)
        $("#selectionm4").hide()
      }
      getServiceProviderListss(value) {
        
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
          $("#selectionm").slideDown();
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
      getClientListss(value) {
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
          $("#selectionm2").slideDown();
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
      getLevelListss(value) {
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
          $("#selectionm3").slideDown();
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
      getTrCateListss(value) {
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
          $("#selectionm4").slideDown();
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
        this.getTrainingList()
      }
      searchPage() {
        var inputPageValue = parseInt($("#currentPageInput").val())
        if (this.totalPages < inputPageValue) {
    
          alert("Enter valid page number!");
          $("#currentPageInput").val(this.currentPage)
        } else {
          this.currentPage = inputPageValue;
        }
        this.getTrainingList()
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
        var getdata = "searchstr=" + this.Searchval
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
