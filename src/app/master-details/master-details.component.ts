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
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css']
})
export class MasterDetailsComponent implements OnInit {
  CategoryForm: FormGroup;
  LevelForm: FormGroup;
  ClientForm: FormGroup;
  ServiceForm: FormGroup
  p2 = 1
  private Saveurl = this.Url.appconstant + this.Url.CategorySaveApi;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private Updateurl = this.Url.appconstant + this.Url.CategoryUpdateApi;
  private clientSaveurl = this.Url.appconstant + this.Url.clientSaveApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private clientUpdateurl = this.Url.appconstant + this.Url.clientUpdateApi;
  private LevelSaveurl = this.Url.appconstant + this.Url.LevelSaveApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private LevelUpdateurl = this.Url.appconstant + this.Url.LevelUpdateApi;
  private ServiceProviderSaveurl = this.Url.appconstant + this.Url.ServiceProviderSaveApi;
  private ServiceProviderUpdateurl = this.Url.appconstant + this.Url.ServiceProviderUpdateApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  private CatPageurl = this.Url.appconstant + this.Url.CatPaginationApi;
  private LevelPageurl = this.Url.appconstant + this.Url.LevelPaginationApi;
  private ClientPageurl = this.Url.appconstant + this.Url.ClientPaginationApi;
  private servicePageurl = this.Url.appconstant + this.Url.ServicePaginationApi;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router, private Formbuilder: FormBuilder) {
    this.CategoryForm = this.Formbuilder.group({
      "_id": [""],
      "name": [null, Validators.compose([Validators.required])],
    });
    this.LevelForm = this.Formbuilder.group({
      "_id": [""],
      "name": [null, Validators.compose([Validators.required])],
    });
    this.ClientForm = this.Formbuilder.group({
      "_id": [""],
      "name": [null, Validators.compose([Validators.required])],
    });
    this.ServiceForm = this.Formbuilder.group({
      "_id": [""],
      "name": [null, Validators.compose([Validators.required])],
    });
  }
  btnname
  btnnameser
  btnnamecli
  btnnamelev
  ngOnInit() {
  
    this.getClientList()
    this.showClientAdd = true
    setTimeout(() => {
      $('.nav-tabs a:first').tab('show')
    }, 100)
    this.btnname = "Save";
    this.btnnameser = "Save";
    this.btnnamecli = "Save";
    this.btnnamelev = "Save";

  }
  name
  ClientModal() {
    this.name = "Add Client"
    $("#ClientModals").modal("show")
    this.btnnamecli = "Save";
    this.ClientForm.reset()
  }
  serviceModal() {
    this.name = "Add Service Provider"
    $("#ServiceProvider").modal("show")
    this.btnnameser = "Save";
    this.ServiceForm.reset()
  }
  CategoryModal() {
    this.name = "Add Category"
    $("#Category").modal("show")
    this.btnname = "Save";
    this.CategoryForm.reset()
  }
  levelModal() {
    this.name = "Add Level"
    $("#level").modal("show")
    this.btnnamelev = "Save";
    this.LevelForm.reset()
  }


  CategoryUpdate(id, name) {
    this.name = "Edit Category"
    var getform = this.CategoryForm.value;
    getform._id = id;
    getform.name = name
    this.CategoryForm.patchValue(getform);
    $("#Category").modal("show")
    this.btnname = "Update"
  }
  submitCategory() {
    
    if (this.btnname == 'Save') {
      var Category = this.CategoryForm.value
      var nameLength = Category.name.replace(/ /g, "").length
      if (Category.name == null|| nameLength == 0 || nameLength == undefined || Category.name == "") {
        
        // $("#Category").modal("show")
        $.notify("Category cannot be empty.", "error");

      }
      
      else if (nameLength != 0) {

        var getform = "catDetails=" + JSON.stringify(Category);
        return this.makeapi.method(this.Saveurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getTrCateList();
              $("#Category").modal("hide")
              $.notify(" Category added successfully.", "success");
            }
            else if (data.isexists == true) {
              $("#Category").modal("show")
              $.notify("Category already exists.", "warn");
            }
            else if (data.status == "failure") {
              $.notify("Update failed", "warn");
            }
            else {
              $.notify("Category cannot be empty.", "error");
              $("#Category").modal("show")
            }
          },
            Error => {
              // $.notify("Category cannot be empty.", "error");
            });
      }
    }
    else {
      let getdata = this.CategoryForm.value
      var nameLength = Category.name.replace(/ /g, "").length
      if (Category.name == null|| nameLength == 0 || nameLength == undefined || Category.name == ""){

        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Category cannot be empty", "error");
        // $("#Category").modal("show")
      }
      else if(nameLength !=0) {
      
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "catDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.Updateurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getTrCateList();
              $("#Category").modal("hide")
              $.notify(" Category updated successfully!!!", "success");
            }
            else if (data.isexists == true) {
              $("#Category").modal("show")
              $.notify("Category already exists.", "warn");
            }
            else {
              $.notify("Category cannot be empty", "error");
              // $("#Category").modal("show")
            }
          },
            Error => {
              // $.notify("Category cannot be empty", "error");
            });
      }

    }

  }
  CategoryList
  getTrCateList() {
    var getdata =  "page=" +this.currentPage + "&searchstr=" + ""
    return this.makeapi.method(this.Listurl, getdata, "post").subscribe(data => {
      this.CategoryList = data
      //console.log(this.lead_list)
      this.PaginationCount1()
    },
      Error => {
      }
    );
  }


  LevelUpdate(id, name) {
    this.name = "Edit Level"
    var getform = this.LevelForm.value;
    getform._id = id;
    getform.name = name
    this.LevelForm.patchValue(getform);
    $("#level").modal("show")
    this.btnnamelev = "Update"
  }
  submitLevel() {
    if (this.btnnamelev == 'Save') {
      let getdata = this.LevelForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if  (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == "") {
        $("#level").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Level cannot be empty.", "error");
      }
      else if(nameLength !=0) {
      
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "levelDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.LevelSaveurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getLevelList();
              $("#level").modal("hide")
              $.notify(" Level updated successfully!!!", "success");
            }
            else if (data.status == "failure") {
              $.notify("Update failed", "warn");
            }
            else if (data.isexists == true) {
              $("#level").modal("show")
              $.notify("Level already exists.", "warn");
            }
            else {
              $.notify("Level cannot be empty.", "error");
              $("#level").modal("show")
            }
          },
            Error => {
              // $.notify("Level cannot be empty.", "error");
            });
      }
    }
    else {
      let getdata = this.LevelForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if  (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == ""){
        $("#level").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Level cannot be empty.", "error");
      }
      else if(nameLength != 0) {
      
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "levelDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.LevelUpdateurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getLevelList();
              $("#level").modal("hide")
              $.notify(" Level updated successfully!!!", "success");
            }
            else if (data.isexists == true) {
              $("#level").modal("hide")
              $.notify("Level already exists.", "warn");
            }
            else {
              $.notify("Level cannot be empty.", "error");
              $("#level").modal("hide")
            }
          },
            Error => {
              // $.notify("Level cannot be empty.", "error");
            });
      }

    }

  }
  LevelList
  getLevelList() {
    var getdata =  "page=" +this.currentPagelevel + "&searchstr=" + ""
    return this.makeapi.method(this.LevelListurl, getdata, "post").subscribe(data => {
      this.LevelList = data
      //console.log(this.lead_list)
      this.PaginationCount2()
    },
      Error => {
      }
    );
  }
  ClientUpdate(id, name) {
    this.name = "Edit Client"
    var getform = this.ClientForm.value;
    getform._id = id;
    getform.name = name
    this.ClientForm.patchValue(getform);
    $("#ClientModals").modal("show")
    this.btnnamecli = "Update"
  }
  submitClient() {
    if (this.btnnamecli == 'Save') {
      let getdata = this.ClientForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == "") {
        $("#ClientModals").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Client cannot be empty.", "error");
      }
      else if(nameLength != 0){
      
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "clientDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.clientSaveurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getClientList();
              $("#ClientModals").modal("hide")
              $.notify("Client added successfully!!!", "success");
            }
            else if (data.isexists == true) {
              $("#ClientModals").modal("show")
              $.notify("Client already exists.", "warn");
            }
            else if (data.status == "failure") {
              $.notify("Update failed", "warn");
            }
            else {
              $.notify("Client cannot be empty.", "error");
              $("#ClientModals").modal("show")
            }
          },
            Error => {
              // $.notify("Client cannot be empty.", "error");
            });
      }
    }
    else {
      let getdata = this.ClientForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == "") {
        $("#ClientModals").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Client cannot be empty.", "error");
      }
      else if(nameLength !=0) {
      
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "clientDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.clientUpdateurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getClientList();
              $("#ClientModals").modal("hide")
              $.notify("Client updated successfully!!!", "success");
            } else if (data.isexists == true) {
              $("#ClientModals").modal("hide")
              $.notify("Client already exists.", "warn");
            }
            else {
              $.notify("Client cannot be empty.", "error");
              $("#ClientModals").modal("hide")
            }
          },
            Error => {
              // $.notify("Client cannot be empty.", "error");
            });
      }

    }

  }
  ClientList
  getClientList() {
    var getdata =  "page=" +this.currentPagecli + "&searchstr=" + ""
    return this.makeapi.method(this.clientListurl, getdata, "post").subscribe(data => {
      this.ClientList = data
      this.PaginationCount3()
      //console.log(this.lead_list)
    },
      Error => {
      }
    );
  }
  ClientService(id, name) {
    this.name = "Edit Service Provider"
    var getform = this.ServiceForm.value;
    getform._id = id;
    getform.name = name
    this.ServiceForm.patchValue(getform);
    $("#ServiceProvider").modal("show")
    this.btnnameser = "Update"
  }
  submitService() {
    if (this.btnnameser == 'Save') {
      let getdata = this.ServiceForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if  (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == "") {
        $("#ServiceProvider").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Service Provider cannot be empty.", "error");
     
      }
      else if(nameLength !=0){
  
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "servproviderDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.ServiceProviderSaveurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getServiceProviderList();
              $("#ServiceProvider").modal("hide")
              $.notify("Service Provider added successfully!!!", "success");
            }
            else if (data.isexists == true) {
              $("#ServiceProvider").modal("show")
              $.notify("Service Provider already exists.", "warn");
            }
            else if (data.status == "failure") {
              $.notify("Update failed", "warn");
            }
            else {
              $.notify("Service Provider cannot be empty.", "error");
              $("#ServiceProvider").modal("show")
            }
          },
            Error => {
              // $.notify("Service Provider cannot be empty.", "error");
            });
      }
    }
    else {
      let getdata = this.ServiceForm.value
      var nameLength = getdata.name.replace(/ /g, "").length
      if  (getdata.name == null|| nameLength == 0 || nameLength == undefined || getdata.name == "") {
        $("#ServiceProvider").modal("show")
        // this.markFormGroupTouched(this.trainingCateForm);
        $.notify("Service Provider cannot be empty.", "error");
    
      }
      else if (nameLength !=0){
        
        // getdata.trainingcatname = encodeURIComponent(getdata.trainingcatname)
        var getform = "servproviderDetails=" + JSON.stringify(getdata);
        return this.makeapi.method(this.ServiceProviderUpdateurl, getform, "post")
          .subscribe(data => {
            if (data.status == 'success') {
              this.getServiceProviderList();
              $("#ServiceProvider").modal("hide")
              $.notify("Service Provider updated successfully!!!", "success");
            }
            else if (data.isexists == true) {
              $("#ServiceProvider").modal("hide")
              $.notify("Service Provider already exists.", "warn");
            }
            else {
              $.notify("Service Provider cannot be empty.", "error");
              $("#ServiceProvider").modal("hide")
            }
          },
            Error => {
              // $.notify("Service Provider cannot be empty.", "error");
            });
      }

    }

  }
  ServiceList
  getServiceProviderList() {
    var getdata =  "page=" +this.currentPageser + "&searchstr=" + ""
    return this.makeapi.method(this.ServiceProviderListurl, getdata, "post").subscribe(data => {
      this.ServiceList = data
      //console.log(this.lead_list)
      this.PaginationCount()
    },
      Error => {
      }
    );
  }
  keyAlphavalue(event: any) {
    const pattern = /^[A-Za-z\s]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  showClientAdd = false
  ShowLevelAdd = false
  ShowCateAdd = false
  ServiceAdd = false
  showCliadd() {
    this.showClientAdd = true
    this.ShowLevelAdd = false
    this.ShowCateAdd = false
    this.ServiceAdd = false
    this.getClientList()
  }
  showLeveladd() {
    this.ShowLevelAdd = true
    this.showClientAdd = false
    this.ShowCateAdd = false
    this.ServiceAdd = false
    this.getLevelList()
  }
  showCateadd() {
    this.ShowCateAdd = true
    this.showClientAdd = false
    this.ShowLevelAdd = false
    this.ServiceAdd = false
    this.getTrCateList()
  }
  showServiadd() {
    this.ServiceAdd = true
    this.ShowCateAdd = false
    this.showClientAdd = false
    this.ShowLevelAdd = false
    this.getServiceProviderList()
  }
  currentPage = 1;
  totalPages
  paginatePartList1(page) {
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
    this.getTrCateList()
  }
  searchPage1() {
    var inputPageValue = parseInt($("#currentPageInputcat").val())
    if (this.totalPages < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInputcat").val(this.currentPage)
    } else {
      this.currentPage = inputPageValue;
    }
    this.getTrCateList()
  }
  totalPartCount: any;
  PaginationCount1() {

    return this.makeapi.method(this.CatPageurl, "", "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCount = totalcount;

        this.totalPages = Math.ceil(this.totalPartCount / 10);



      },
        Error => {
        });
  }
  currentPagelevel = 1;
  totalPageslevel
  paginatePartList2(page) {
    if (page == 'prev' && this.currentPagelevel > 1) {
      if (page == 'prev') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPagelevel = this.currentPagelevel - 1
    }
    else {
      if (page == 'next') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPagelevel = this.currentPagelevel + 1

    }
    this.getLevelList()
  }
  searchPage2() {
    var inputPageValue = parseInt($("#currentPageInputtra").val())
    if (this.totalPageslevel < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInputtra").val(this.currentPagelevel)
    } else {
      this.currentPagelevel = inputPageValue;
    }
    this.getLevelList()
  }
  totalPartCountlev: any;
  PaginationCount2() {

    return this.makeapi.method(this.LevelPageurl, "", "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCountlev = totalcount;

        this.totalPageslevel = Math.ceil(this.totalPartCountlev / 10);



      },
        Error => {
        });
  }
  currentPagecli = 1;
  totalPagescli
  paginatePartList3(page) {
    if (page == 'prev' && this.currentPagecli > 1) {
      if (page == 'prev') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPagecli = this.currentPagecli - 1
    }
    else {
      if (page == 'next') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPagecli = this.currentPagecli + 1

    }
    this.getClientList()
  }
  searchPage3() {
    var inputPageValue = parseInt($("#currentPageInputcli").val())
    if (this.totalPagescli < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInputcli").val(this.currentPagecli)
    } else {
      this.currentPagecli = inputPageValue;
    }
    this.getClientList()
  }
  totalPartCountcli: any;
  PaginationCount3() {

    return this.makeapi.method(this.ClientPageurl, "", "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCountcli = totalcount;

        this.totalPagescli = Math.ceil(this.totalPartCountcli / 10);

      },
        Error => {
        });
  }
  currentPageser = 1;
  totalPagesser
  paginatePartList(page) {
    if (page == 'prev' && this.currentPageser > 1) {
      if (page == 'prev') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPageser = this.currentPageser - 1
    }
    else {
      if (page == 'next') {
        // this.loading = true;
      }
      else {
        // this.loading = false;
      }
      this.currentPageser = this.currentPageser + 1

    }
    this.getServiceProviderList()
  }
  searchPage() {
    var inputPageValue = parseInt($("#currentPageInputser").val())
    if (this.totalPagesser < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInputser").val(this.currentPageser)
    } else {
      this.currentPageser = inputPageValue;
    }
    this.getServiceProviderList()
  }
  totalPartCountser: any;
  PaginationCount() {

    return this.makeapi.method(this.servicePageurl, "", "post")
      .subscribe(data => {

        var totalcount = data['pageCount'];
        this.totalPartCountser = totalcount;

        this.totalPagesser = Math.ceil(this.totalPartCountser / 10);


      },
        Error => {
        });
  }
}
