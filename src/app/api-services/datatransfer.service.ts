import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
declare var $: any;
@Injectable()
export class DatatransferService {
  // QA URL
  // appconstant="http://139.59.75.83:9999/LeadGenerationTool/"

  // Local URL
  // appconstant="http://172.30.1.11:8080/LeadGenerationTool/"

  //Testing URL
  // appconstant = "http://139.59.75.83:9999/LeadGenerationTool/"

  sanitizer
  constructor(private sn: DomSanitizer) {
    this.sanitizer = sn
  }
  public session: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  public userimagesrc: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  getsession(value) {
    this.session.next(value);
  }
  showNotification(from, align, msg, type) {

    $.notify({
      icon: 'notifications',
      message: msg

    }, {
      type: type,
      timer: 2000,
      placement: {
        from: from,
        align: align
      }
    });
  }

  changeimage(image) {
    this.userimagesrc.next(image);

  }
  checkFormat(msg) {
    if (msg != "" && msg != null) {
      return this.sanitizer.bypassSecurityTrustHtml("<span style='color:#000 !important;font-size:15px' >" + msg + "</span>")
    }

    else {
      return this.sanitizer.bypassSecurityTrustHtml("<span style='color:#bbbbbb !important;font-size:14px' >- NA -</span>")
    }

  }
 

   
  
}
