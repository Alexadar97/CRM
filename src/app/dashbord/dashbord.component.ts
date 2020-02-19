import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebserviceService } from '../api-services/webservice.service'
import { DatatransferService } from '../api-services/datatransfer.service'
import { UrlService } from '../api-services/url.service'
declare var $
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
 @Input() valueSidemenu

  UserName;
  btnname = "Save";
  myDateValue: Date;
  // private search = this.Url.appconstant + this.Url.SearchContactsApi;
  // private Geturl = this.Url.appconstant + this.Url.GetRetailLeadApi;
  // private GetBusinessurl = this.Url.appconstant + this.Url.GetBusinessApi;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router,private Formbuilder: FormBuilder) {
    // config.backdrop = 'static';

  }
  ngOnInit() {
    // localStorage.setItem("Lead-Management", null);
    var Userdetail = localStorage.getItem("Lead-Management");
  
    if(Userdetail === null){
      this.router.navigateByUrl('/login')
    }else{
      var jsonData = JSON.parse(Userdetail);

      this.UserName = jsonData['name'];
    }
    this.myDateValue = new Date();
    $('.addcontroler').mouseover(function() {
      $(".pluscross").toggleClass("crossplus")
      // $(".droped").toggleClass("dropdown-menu")
   });
   $('.addcontroler').mouseout(function() {
    $(".pluscross").toggleClass("crossplus")
    // $(".droped").toggleClass("dropdown-menu")
   });

  }
  // PlusClick(){
  //   $(".pluscross").toggleClass("crossplus")
  // }
  clickToggledeal() {
    $(".retail1").removeClass("addActive")
    $(".service1").removeClass("addActive")
    $(".business1").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".deal").addClass("addActive")
    $(".dash").removeClass("addActive")
  }
  clickToggleuser() {
    $(".retail1").removeClass("addActive")
    $(".service1").removeClass("addActive")
    $(".business1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").addClass("addActive")
    $(".master").removeClass("addActive")
    $(".dash").removeClass("addActive")
  }
  clickTogglemaster() {
    $(".retail1").removeClass("addActive")
    $(".service1").removeClass("addActive")
    $(".business1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".master").addClass("addActive")
    $(".dash").removeClass("addActive")
  }
  clickToggledash() {
    $(".retail1").removeClass("addActive")
    $(".service1").removeClass("addActive")
    $(".business1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".master").removeClass("addActive")
    $(".dash").addClass("addActive")
  }
  activeClass() {
    $(".retail1").addClass("addActive")
    $(".business1").removeClass("addActive")
    $(".service1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".master").removeClass("addActive")
    $(".dash").removeClass("addActive")
  }
  businessClass() {
    $(".retail1").removeClass("addActive")
    $(".business1").addClass("addActive")
    $(".service1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".master").removeClass("addActive")
    $(".dash").removeClass("addActive")
  }
  serviceActive() {
    $(".retail1").removeClass("addActive")
    $(".service1").addClass("addActive")
    $(".business1").removeClass("addActive")
    $(".deal").removeClass("addActive")
    $(".user").removeClass("addActive")
    $(".master").removeClass("addActive")
    $(".dash").removeClass("addActive")
  }

  notshow = false;
  hidedropdown() {
    this.notshow = true
  }
  logout() {
    localStorage.setItem("Lead-Management", null);
    this.router.navigateByUrl('/login')
  }

  isToggleOpen = false
  toggleAdd(){
    
    this.isToggleOpen = !this.isToggleOpen;
  }
  off(){
    this.isToggleOpen=false
  }
  ChangPassword(){
    $("#ChangePassword").modal("show")
  }
  submitPass(){
    $("#ChangePassword").modal("hide")
    $("#ConfrimChangePassword").modal("show")
  }
  loginnow() {

    $("#ConfrimChangePassword").modal("hide")
        this.router.navigateByUrl('/login')
      }
}
