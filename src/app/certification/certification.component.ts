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
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {
  p2 = 1
  private ListCerturl = this.Url.appconstant + this.Url.ListgetAllCertificationsApi;
  private Geturl = this.Url.appconstant + this.Url.GetCertificateApi;
  private SaveUpdateurl = this.Url.appconstant + this.Url.updategetAllCertificationsApi;
  private Listurl = this.Url.appconstant + this.Url.CategoryListApi;
  private clientListurl = this.Url.appconstant + this.Url.clientListApi;
  private LevelListurl = this.Url.appconstant + this.Url.LevelListApi;
  private ServiceProviderListurl = this.Url.appconstant + this.Url.ServiceProviderListApi;
  private Paginationurl = this.Url.appconstant + this.Url.CertiPaginationApi;
  CertificateForm: FormGroup
  constructor(private makeapi: WebserviceService, private data: DatatransferService, private Formbuilder: FormBuilder, private http: Http, private Url: UrlService, private router: Router) {
    // this.ds = data
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
  ngOnInit() {
    this.getCategoryList()
    $('[data-toggle="tooltip"]').tooltip();
    this.ServiceList = []
    this.ClientList = []
    this.LevelList = []
    this.CategoryList = []

  }
  CateList = []
  loading = false
  getCategoryList() {
    // this.loading = true
    var getdata =  "page=" +this.currentPage
    return this.makeapi.method(this.ListCerturl, getdata, "post").subscribe(data => {
      // this.loading = false
      this.CateList = data
      this.PaginationCount()
    },
      Error => {
      }
    );
  }
  ViewDetails(data) {
    localStorage.setItem("Viewdata", JSON.stringify(data));
    this.router.navigateByUrl('/dashboard/certificate-details')
  }
  Searchval
  SearchdataList(value) {
    this.Searchval = value
    let reqdata = "searchstr=" + value + "&page=" +this.currentPage
    return this.makeapi.method(this.ListCerturl, reqdata, "post").subscribe(data => {
      this.CateList = data
      if (this.CateList) {
        this.p2 = 1
      } else {

      }
      this.PaginationCountSearch()
    },
      Error => {
      }
    );
  }
  EditData
  idData
  Edit(data) {
    let reqdata = "id=" + data._id
    return this.makeapi.method(this.Geturl, reqdata, "post")
      .subscribe(data => {
        this.EditData = data
        $("#CertificateEditModal").modal("show")

        if (this.EditData['preferredamt'] != '') {
          $("#checked").prop("checked", true);
          this.preferredamount = true
        } else {
          $("#checked").prop("checked", false);
          this.preferredamount = false
        }
        this.CertificateForm.patchValue(this.EditData)
      },
        Error => {
        }
      );
  }
  preferredamount = false
  preferred(event) {
    if (event.target.checked == false) {
      this.preferredamount = false
    } else {
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
      getform.clientname = this.changevalcdd2
      getform.clientid = this.EditData.clientid
      getform.providername = this.changevalcdd
      getform.providerid = this.EditData.providerid
      getform.levelname = this.changevalcdd3
      getform.levelid = this.EditData.levelid
      getform.categoryname = this.changevalcdd4
      getform.categoryid = this.EditData.categoryid
      var reqdata = "updateCertificationDetails=" + JSON.stringify(getform);
      return this.makeapi.method(this.SaveUpdateurl, reqdata, "post")
        .subscribe(data => {
          if (data.status == 'success') {
            let reqdata = "id=" + data._id
            return this.makeapi.method(this.Geturl, reqdata, "post")
              .subscribe(data => {
                localStorage.setItem("Viewdata", JSON.stringify(data));
                $("#CertificateEditModal").modal("hide")
                this.router.navigateByUrl("/dashboard/certificate-details")
                // window.location.reload()
                $.notify("Certification updated successfully!!!", "success");
                //console.log(this.lead_list)
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
  changevalcdd
  Changeselect(val) {
    this.changevalcdd = val
    for (var i = 0; i < this.ServiceList.length; i++) {
      this.service = this.ServiceList[i]

      if (this.service.name == this.changevalcdd) {
        this.Serviceid = this.service._id
        this.ServiceName = this.service.name
        // $(".dataser").css({"display":"none"})
      }

      else {

      }
    }
    $("#servidcdd").val(this.changevalcdd)
    $("#selectioncdd").hide()
  }
  changevalcdd2
  Changeselect2(val) {
    this.changevalcdd2 = val
    for (var i = 0; i < this.ClientList.length; i++) {
      this.clientid = this.ClientList[i]
      this.clientMap[this.clientid.name] = this.clientid.id

      if (this.clientid.name == this.changevalcdd2) {
        this.Clientid = this.clientid._id
        this.ClientName = this.clientid.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidcdd2").val(this.changevalcdd2)
    $("#selectioncdd2").hide()
  }
  changevalcdd3
  Changeselect3(val) {
    this.changevalcdd3 = val
    for (var i = 0; i < this.LevelList.length; i++) {
      this.Level = this.LevelList[i]

      if (this.Level.name == this.changevalcdd3) {
        this.Levelid = this.Level._id
        this.LevelName = this.Level.name
        // $(".dataser").css({"display":"none"})
      }
    }
    $("#servidcdd3").val(this.changevalcdd3)
    $("#selectioncdd3").hide()
  }
  changevalcdd4
  Changeselect4(val) {
    this.changevalcdd4 = val
    for (var i = 0; i < this.CategoryList.length; i++) {
      this.Category = this.CategoryList[i]

      if (this.Category.name == this.changevalcdd4) {
        this.Categoryid = this.Category._id
        this.CategoryName = this.Category.name
        // $(".dataser").css({"display":"none"})
      }
    }

    $("#servidcdd4").val(this.changevalcdd4)
    $("#selectioncdd4").hide()
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
        $("#selectioncdd").slideDown();
        //console.log(this.lead_list)
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
        $("#selectioncdd2").slideDown();
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
        $("#selectioncdd3").slideDown();
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
        $("#selectioncdd4").slideDown();
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
  cancelModal() {
    this.CertificateForm.reset()
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
    this.getCategoryList()
  }
  searchPage() {
    var inputPageValue = parseInt($("#currentPageInput").val())
    if (this.totalPages < inputPageValue) {

      alert("Enter valid page number!");
      $("#currentPageInput").val(this.currentPage)
    } else {
      this.currentPage = inputPageValue;
    }
    this.getCategoryList()
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
