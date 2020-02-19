import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { WebserviceService } from '../api-services/webservice.service'
import { Router } from '@angular/router';
import { DatatransferService } from '../api-services/datatransfer.service'
import { UrlService } from '../api-services/url.service'
declare var $
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errormsg: any;
  LoginForm: FormGroup;
  ChangePass:FormGroup
  finalappcode: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9,/]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  private loginApi = this.Url.appconstant + this.Url.login;
 
  constructor(private Formbuilder: FormBuilder, private Url: UrlService,  private router: Router, private makeapi: WebserviceService, private http: Http, private getdata: DatatransferService, ) {
    this.LoginForm = Formbuilder.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });
    this.ChangePass = Formbuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
     
    });
  }

  ngOnInit() {
  }
  login() {
    if (this.LoginForm.invalid) {
  
    }
    else {
      var reqdata = "loginDetails=" + JSON.stringify(this.LoginForm.value);
      return this.makeapi.method(this.loginApi, reqdata, "postlogin")
        .subscribe(response => {
          this.setCookie('cookies', response.headers.get('token'), 1)
          this.makeapi.getToken()
          var data = response.json();
          if (data.message == "success") {

            localStorage.setItem("Lead-Management", JSON.stringify(data));

            this.router.navigateByUrl('/dashboard/lead-dashboard');
          }
          else {
            this.errormsg = "Invalid Email or Password";
          }

        },
          Error => {
          });
    }
  }
  type = "password";
  openeye = true
  openpass() {
    this.openeye = !this.openeye
    if (this.type == "password") {
      this.type = "text";
    }
    else {
      this.type = "password";
    }

  }
  Forgot(){
    this.ChangePass.reset()
    $("#Forgot").modal("show")
  }
  submitPassword(){
    if (this.ChangePass.invalid) {
      $.notify("Enter a valid Email", "error");
      return false;
    }
    else {
    $("#Forgot").modal("hide")
    this.ChangePass.reset()
    $("#ConfrimChangePasswords").modal("show")
    }
  }
  loginnow(){
    $("#ConfrimChangePasswords").modal("hide")
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    for (let i in formGroup.controls)
      formGroup.controls[i].markAsTouched();
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 1000 * 60 * 60 * 24));
    var expires = "expires=" + d.toUTCString();
    window.document.cookie = cname + "=" + cvalue + "; " + expires;
  }
}
