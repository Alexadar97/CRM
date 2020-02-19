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
  selector: 'app-business-contact-information',
  templateUrl: './business-contact-information.component.html',
  styleUrls: ['./business-contact-information.component.css']
})
export class BusinessContactInformationComponent implements OnInit {
  businessleadcontactform: FormGroup
  ActivityForm: FormGroup
  ServiceForm: FormGroup
  private Geturl = this.Url.appconstant + this.Url.GetBusinessApi;
  private Getupdateurl = this.Url.appconstant + this.Url.updateBusinessContactApi;
  private Activityurl = this.Url.appconstant + this.Url.ActivityBusinessApi;
  private DealSaveurl = this.Url.appconstant + this.Url.DealSaveApi;
  private ListCerturl = this.Url.appconstant + this.Url.ListgetAllCertificationsApi;
  private ListTrainurl = this.Url.appconstant + this.Url.ListgetAlltrainingsApi;
  private DealGeturl = this.Url.appconstant + this.Url.DealGetApi;
  ds;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /[0-9]/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  contactnmber = /^[0-9\-+()\d\s]+$/
  constructor(private makeapi: WebserviceService, private data: DatatransferService, private Formbuilder: FormBuilder, private http: Http, private Url: UrlService, private router: Router) {
    this.ds = data
    this.businessleadcontactform = this.Formbuilder.group({

      "companyname": [null, Validators.compose([Validators.required])],
      "companyemailid": [null, Validators.compose([Validators.required])],
      "gst": "",
      "doorno": "",
      "state": "",
      "country": "",
      "city": "",
      "leadtype": "",
      "leadname": "",
      "street": "",
      "pincode": "",
      "contactpersons": this.Formbuilder.array([this.projectformvalue()]),
    });
    this.ActivityForm = this.Formbuilder.group({

      "type": [null, Validators.compose([Validators.required])],
      "notes": [null, Validators.compose([Validators.required])],

    });
    this.ServiceForm = this.Formbuilder.group({

      "servicetype": ["", Validators.compose([Validators.required])],
      "name": ["", Validators.compose([Validators.required])],
      "price": ["", Validators.compose([Validators.required])],
      "date": ["", Validators.compose([Validators.required])]

    });
  }
  ViewListDate
  idData
  ActivityData
  username
  contactpersonsVal
  Address
  ServiceList
  DataRetails
  showDeals = false
  ngOnInit() {
    this.tab = "basic"
    var editdata = localStorage.getItem('Viewdata');
    this.ViewListDate = JSON.parse(editdata);
    this.idData = this.ViewListDate['_id']
    this.DataRetails = this.ViewListDate
    this.ActivityData = this.ViewListDate['activity']
    this.contactpersonsVal = this.ViewListDate['contactpersons']
    this.Address = this.ViewListDate['doorno'] + " " + this.ViewListDate['street'] + " " + this.ViewListDate['state'] + " " + this.ViewListDate['city'] + " " + this.ViewListDate['country'] + " " + this.ViewListDate['pincode']

    var Userdetail = localStorage.getItem("Lead-Management");
    var jsonData = JSON.parse(Userdetail);
    this.username = jsonData.name
    this.showDealDeatils = this.ViewListDate['services']
    this.ServiceList = this.ViewListDate['services']
    if (this.ViewListDate['services']) {
      this.showDeals = true
    } else {
      this.showDeals = false
    }
  }
  contactpersons: FormArray;
  partViewPage: any;
  get projectformdetailes() { return <FormArray>this.businessleadcontactform.get('contactpersons') }
  addRow(): void {
    this.contactpersons = this.businessleadcontactform.get('contactpersons') as FormArray;
    this.contactpersons.push(this.projectformvalue());
  }

  deleteRow(rowNumber) {
    // this.rowData.splice(rowNumber, 1);
    this.contactpersons = this.businessleadcontactform.get('contactpersons') as FormArray;
    this.contactpersons.removeAt(rowNumber);
  }
  projectformvalue(): FormGroup {
    return this.Formbuilder.group({
      "_id": "",
      "cpname": "",
      "cpemail": ["", Validators.compose([Validators.pattern(this.emailvalidation)])],
      "cpphone": "",
      "cpalternumber": "",
      "countryphcode": "",
      "altercountryphcode": ""
    });
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
  CreateDeal() {
    $("#LeadDealModal").modal("show")
  }
  lead_list
  DataId
  ShowLeadName
  Edit() {
    let reqdata = "id=" + this.idData
    return this.makeapi.method(this.Geturl, reqdata, "post")
      .subscribe(data => {
        this.DataId = data['_id']
        this.ShowLeadName = data['leadtype']
        $("#RetailleadEditModal").modal("show")
        if (this.ShowLeadName != "") {
          this.employeename1 = true
        }
        else {
          this.employeename1 = false
        }
        $("#BusinessLeadEditModal").modal("show")
        this.businessleadcontactform.patchValue(data)
      },
        Error => {
        }
      );
  }
  employeename = false;
  employeename1 = false
  valueid
  ChangeLeadType(value) {
    this.valueid = value
    if (value == 'External Referral' || value == 'Cold Call' || value == 'Advertisement' || value == 'Social Media' || value == 'Employee Referral' || value == 'others') {
      this.employeename1 = true;
      this.employeename = false;
    }
    else {
      this.employeename = false;
      this.employeename1 = false;
    }

  }
  submitBusiness() {
    if (this.businessleadcontactform.invalid) {
      $.notify("Please fill all mandatory fields", "error");
      return false;
    }
    else {

      var getdata = this.businessleadcontactform.value
      for (var i = 0; i < getdata.contactpersons.length; i++) {
        var dataArr = getdata.contactpersons[i]
        if (dataArr['cpname'] == null) {
          dataArr['cpname'] = "";
        }
        if (dataArr.cpemail == null) {
          dataArr.cpemail = "";
        }
        if (dataArr.cpphone == null) {
          dataArr.cpphone = "";
        }
        
        if (dataArr.cpalternumber == null) {
          dataArr.cpalternumber = "";
        }
       
        if (dataArr._id == null) {
          dataArr._id = "";
        }
       
        if (dataArr.altercountryphcode == null) {
          dataArr.altercountryphcode = "";
        }
        
        if (dataArr.countryphcode == null) {
          dataArr.countryphcode = "";
        }
        
      }

      if (getdata.gst == null) {
        getdata.gst = "";
      }
      if (getdata.pincode == null) {
        getdata.pincode = "";
      }
      if (getdata.doorno == null) {
        getdata.doorno = "";
      }
      if (getdata.state == null) {
        getdata.state = "";
      }
      if (getdata.country == null) {
        getdata.country = "";
      }
      if (getdata.street == null) {
        getdata.street = "";
      }
      if (getdata.city == null) {
        getdata.city = "";
      }
      if (getdata.leadtype == null) {
        getdata.leadtype = "";
      }
      if (getdata.leadname == null) {
        getdata.leadname = "";
      }

      getdata.contactpersons.altercountryphcode = encodeURIComponent(getdata.contactpersons.altercountryphcode)
      getdata.contactpersons.countryphcode = encodeURIComponent(getdata.contactpersons.countryphcode)
      getdata._id = this.DataId
      getdata.type = "contact"
      var reqdata = "updateDetails=" + JSON.stringify(getdata);

      return this.makeapi.method(this.Getupdateurl, reqdata, "post")
        .subscribe(data => {
          if (data.isexists == true) {
            $.notify("Contact already exists", "warn");
          }
          else if (data.isexists == "phone") {
            $.notify("Phone Number already exists", "warn");
          }
          else if (data.isexists == "email") {
            $.notify("Email already exists", "warn");
          }
          else if (data.status == "failure" && data == {}) {
            $.notify("Update failed", "warn");
          }
          else {
            this.businessleadcontactform.reset()
            $("#BusinessLeadEditModal").modal("hide")
            reqdata = "id=" + data.businessID
            return this.makeapi.method(this.Geturl, reqdata, "post")
              .subscribe(data => {
                localStorage.setItem("Viewdata", JSON.stringify(data));

                this.router.navigateByUrl("/dashboard/Business-contact-information")
                window.location.reload()
                $.notify("Lead updated successfully", "success");
              },
                Error => {
                }
              );
          }

          // return data;
        },
          Error => {
            $.notify("Please fill all mandatory fields", "error");
          }
        );



    }
  }
  certificate = false
  training = false
  ServiceType
  selectService(value) {
    this.ServiceType = value
    if (value == "Certification") {
      this.certificate = true
      this.training = false
    }
    else {
      this.certificate = false
      this.training = true
    }
  }
  CateList = []
  certificateSearch(value) {
    let reqdata = "searchstr=" + value
    return this.makeapi.method(this.ListCerturl, reqdata, "post").subscribe(data => {
      this.CateList = data;
      for (var i = 0; i < data.length; i++) {
        if (value == data[i].name) {
          this.DataID = data[i]._id
          var getdata = this.ServiceForm.value
          getdata.price = data[i].price
          this.ServiceForm.patchValue(getdata)
        }

      }

    },
      Error => {
      }
    );
  }
  TrainList = []
  DataID
  TrainingSearch(value) {
    let reqdata = "searchstr=" + value
    return this.makeapi.method(this.ListTrainurl, reqdata, "post").subscribe(data => {
      this.TrainList = data;
      for (var i = 0; i < data.length; i++) {
        if (value == data[i].name) {
          this.DataID = data[i]._id
          var getdata = this.ServiceForm.value
          getdata.price = data[i].price
          this.ServiceForm.patchValue(getdata)
        }

      }
    },
      Error => {
      }
    );
  }
  ServicesData = []
  AddserviceDeal() {
    if (this.ServiceForm.invalid) {
      $.notify("Service Form is required", "error");
    } else {
      var getdata = this.ServiceForm.value
      getdata.date = $("#DateSelect").val()
      var ListDataJson = { "serviceid": this.DataID, "servicetype": getdata.servicetype, "name": getdata.name, "price": getdata.price, "date": getdata.date }
      this.ServicesData.push(ListDataJson)
      this.ServiceForm.reset()
    }


  }
  notevalData
  notesValue(value) {
    this.notevalData = value
  }
  showDealDeatils = false
  submitDeal() {
    if (this.notevalData == undefined) {
      $.notify("Deal not created", "error");
    }
    else {
      var cust = "services:" + JSON.stringify(this.ServicesData) + "," + 'notes:"' + this.notevalData + '",custid:"' + this.DataRetails._id + '",custtype:"' + this.DataRetails.type + '",custname:"' + this.DataRetails.firstname + '",custphone:"' + this.DataRetails.phonenumber + '",custemail:"' + this.DataRetails.email + '"';
      // var getdata = "dealDeatils="+ JSON.stringify("services=" + this.ServicesData , "notes" : this.notevalData + { "custid": this.DataRetail._id, "custname": this.DataRetail.firstname, "custphone": this.DataRetail.phonenumber, "custemail": this.DataRetail.email })
      var getdata = "dealDetails={" + cust + "}"
      //var getdata = "dealDetails="+cust

      return this.makeapi.method(this.DealSaveurl, getdata, "post")
        .subscribe(data => {

          if (data.status == 'success') {
            let reqdata = "id=" + data._id
            return this.makeapi.method(this.DealGeturl, reqdata, "post")
              .subscribe(data => {
                localStorage.setItem("Viewdata", JSON.stringify(data));
                $("#LeadDealModal").modal("hide")
                this.showDealDeatils = true
                this.router.navigateByUrl("/dashboard/deals-information")
                $.notify("Deal added successfully!!!", "success");
              },
                Error => {
                }
              );

          }
          else {
            $.notify("Please fill all mandatory fields", "error");
          }

        },
          Error => {
          }
        );

    }
  }
  keyAlpha(event: any) {
    const pattern = /[0-9]/;
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
          if (data.status == "success") {
            this.ActivityForm.reset()
            $("#ActivityModal").modal("hide")
            window.location.reload()
            $.notify("Activity added successfully", "success");
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
  countriesArray = [{ "code": "+7 840", "name": "Abkhazia" }, { "code": "+93", "name": "Afghanistan" }, { "code": "+355", "name": "Albania" }, { "code": "+213", "name": "Algeria" }, { "code": "+1 684", "name": "American Samoa" }, { "code": "+376", "name": "Andorra" }, { "code": "+244", "name": "Angola" }, { "code": "+1 264", "name": "Anguilla" }, { "code": "+1 268", "name": "Antigua and Barbuda" }, { "code": "+54", "name": "Argentina" }, { "code": "+374", "name": "Armenia" }, { "code": "+297", "name": "Aruba" }, { "code": "+247", "name": "Ascension" }, { "code": "+61", "name": "Australia" }, { "code": "+672", "name": "Australian External Territories" }, { "code": "+43", "name": "Austria" }, { "code": "+994", "name": "Azerbaijan" }, { "code": "+1 242", "name": "Bahamas" }, { "code": "+973", "name": "Bahrain" }, { "code": "+880", "name": "Bangladesh" }, { "code": "+1 246", "name": "Barbados" }, { "code": "+1 268", "name": "Barbuda" }, { "code": "+375", "name": "Belarus" }, { "code": "+32", "name": "Belgium" }, { "code": "+501", "name": "Belize" }, { "code": "+229", "name": "Benin" }, { "code": "+1 441", "name": "Bermuda" }, { "code": "+975", "name": "Bhutan" }, { "code": "+591", "name": "Bolivia" }, { "code": "+387", "name": "Bosnia and Herzegovina" }, { "code": "+267", "name": "Botswana" }, { "code": "+55", "name": "Brazil" }, { "code": "+246", "name": "British Indian Ocean Territory" }, { "code": "+1 284", "name": "British Virgin Islands" }, { "code": "+673", "name": "Brunei" }, { "code": "+359", "name": "Bulgaria" }, { "code": "+226", "name": "Burkina Faso" }, { "code": "+257", "name": "Burundi" }, { "code": "+855", "name": "Cambodia" }, { "code": "+237", "name": "Cameroon" }, { "code": "+1", "name": "Canada" }, { "code": "+238", "name": "Cape Verde" }, { "code": "+ 345", "name": "Cayman Islands" }, { "code": "+236", "name": "Central African Republic" }, { "code": "+235", "name": "Chad" }, { "code": "+56", "name": "Chile" }, { "code": "+86", "name": "China" }, { "code": "+61", "name": "Christmas Island" }, { "code": "+61", "name": "Cocos-Keeling Islands" }, { "code": "+57", "name": "Colombia" }, { "code": "+269", "name": "Comoros" }, { "code": "+242", "name": "Congo" }, { "code": "+243", "name": "Congo, Dem. Rep. of (Zaire)" }, { "code": "+682", "name": "Cook Islands" }, { "code": "+506", "name": "Costa Rica" }, { "code": "+385", "name": "Croatia" }, { "code": "+53", "name": "Cuba" }, { "code": "+599", "name": "Curacao" }, { "code": "+537", "name": "Cyprus" }, { "code": "+420", "name": "Czech Republic" }, { "code": "+45", "name": "Denmark" }, { "code": "+246", "name": "Diego Garcia" }, { "code": "+253", "name": "Djibouti" }, { "code": "+1 767", "name": "Dominica" }, { "code": "+1 809", "name": "Dominican Republic" }, { "code": "+670", "name": "East Timor" }, { "code": "+56", "name": "Easter Island" }, { "code": "+593", "name": "Ecuador" }, { "code": "+20", "name": "Egypt" }, { "code": "+503", "name": "El Salvador" }, { "code": "+240", "name": "Equatorial Guinea" }, { "code": "+291", "name": "Eritrea" }, { "code": "+372", "name": "Estonia" }, { "code": "+251", "name": "Ethiopia" }, { "code": "+500", "name": "Falkland Islands" }, { "code": "+298", "name": "Faroe Islands" }, { "code": "+679", "name": "Fiji" }, { "code": "+358", "name": "Finland" }, { "code": "+33", "name": "France" }, { "code": "+596", "name": "French Antilles" }, { "code": "+594", "name": "French Guiana" }, { "code": "+689", "name": "French Polynesia" }, { "code": "+241", "name": "Gabon" }, { "code": "+220", "name": "Gambia" }, { "code": "+995", "name": "Georgia" }, { "code": "+49", "name": "Germany" }, { "code": "+233", "name": "Ghana" }, { "code": "+350", "name": "Gibraltar" }, { "code": "+30", "name": "Greece" }, { "code": "+299", "name": "Greenland" }, { "code": "+1 473", "name": "Grenada" }, { "code": "+590", "name": "Guadeloupe" }, { "code": "+1 671", "name": "Guam" }, { "code": "+502", "name": "Guatemala" }, { "code": "+224", "name": "Guinea" }, { "code": "+245", "name": "Guinea-Bissau" }, { "code": "+595", "name": "Guyana" }, { "code": "+509", "name": "Haiti" }, { "code": "+504", "name": "Honduras" }, { "code": "+852", "name": "Hong Kong SAR China" }, { "code": "+36", "name": "Hungary" }, { "code": "+354", "name": "Iceland" }, { "code": "+91", "name": "India" }, { "code": "+62", "name": "Indonesia" }, { "code": "+98", "name": "Iran" }, { "code": "+964", "name": "Iraq" }, { "code": "+353", "name": "Ireland" }, { "code": "+972", "name": "Israel" }, { "code": "+39", "name": "Italy" }, { "code": "+225", "name": "Ivory Coast" }, { "code": "+1 876", "name": "Jamaica" }, { "code": "+81", "name": "Japan" }, { "code": "+962", "name": "Jordan" }, { "code": "+7 7", "name": "Kazakhstan" }, { "code": "+254", "name": "Kenya" }, { "code": "+686", "name": "Kiribati" }, { "code": "+965", "name": "Kuwait" }, { "code": "+996", "name": "Kyrgyzstan" }, { "code": "+856", "name": "Laos" }, { "code": "+371", "name": "Latvia" }, { "code": "+961", "name": "Lebanon" }, { "code": "+266", "name": "Lesotho" }, { "code": "+231", "name": "Liberia" }, { "code": "+218", "name": "Libya" }, { "code": "+423", "name": "Liechtenstein" }, { "code": "+370", "name": "Lithuania" }, { "code": "+352", "name": "Luxembourg" }, { "code": "+853", "name": "Macau SAR China" }, { "code": "+389", "name": "Macedonia" }, { "code": "+261", "name": "Madagascar" }, { "code": "+265", "name": "Malawi" }, { "code": "+60", "name": "Malaysia" }, { "code": "+960", "name": "Maldives" }, { "code": "+223", "name": "Mali" }, { "code": "+356", "name": "Malta" }, { "code": "+692", "name": "Marshall Islands" }, { "code": "+596", "name": "Martinique" }, { "code": "+222", "name": "Mauritania" }, { "code": "+230", "name": "Mauritius" }, { "code": "+262", "name": "Mayotte" }, { "code": "+52", "name": "Mexico" }, { "code": "+691", "name": "Micronesia" }, { "code": "+1 808", "name": "Midway Island" }, { "code": "+373", "name": "Moldova" }, { "code": "+377", "name": "Monaco" }, { "code": "+976", "name": "Mongolia" }, { "code": "+382", "name": "Montenegro" }, { "code": "+1664", "name": "Montserrat" }, { "code": "+212", "name": "Morocco" }, { "code": "+95", "name": "Myanmar" }, { "code": "+264", "name": "Namibia" }, { "code": "+674", "name": "Nauru" }, { "code": "+977", "name": "Nepal" }, { "code": "+31", "name": "Netherlands" }, { "code": "+599", "name": "Netherlands Antilles" }, { "code": "+1 869", "name": "Nevis" }, { "code": "+687", "name": "New Caledonia" }, { "code": "+64", "name": "New Zealand" }, { "code": "+505", "name": "Nicaragua" }, { "code": "+227", "name": "Niger" }, { "code": "+234", "name": "Nigeria" }, { "code": "+683", "name": "Niue" }, { "code": "+672", "name": "Norfolk Island" }, { "code": "+850", "name": "North Korea" }, { "code": "+1 670", "name": "Northern Mariana Islands" }, { "code": "+47", "name": "Norway" }, { "code": "+968", "name": "Oman" }, { "code": "+92", "name": "Pakistan" }, { "code": "+680", "name": "Palau" }, { "code": "+970", "name": "Palestinian Territory" }, { "code": "+507", "name": "Panama" }, { "code": "+675", "name": "Papua New Guinea" }, { "code": "+595", "name": "Paraguay" }, { "code": "+51", "name": "Peru" }, { "code": "+63", "name": "Philippines" }, { "code": "+48", "name": "Poland" }, { "code": "+351", "name": "Portugal" }, { "code": "+1 787", "name": "Puerto Rico" }, { "code": "+974", "name": "Qatar" }, { "code": "+262", "name": "Reunion" }, { "code": "+40", "name": "Romania" }, { "code": "+7", "name": "Russia" }, { "code": "+250", "name": "Rwanda" }, { "code": "+685", "name": "Samoa" }, { "code": "+378", "name": "San Marino" }, { "code": "+966", "name": "Saudi Arabia" }, { "code": "+221", "name": "Senegal" }, { "code": "+381", "name": "Serbia" }, { "code": "+248", "name": "Seychelles" }, { "code": "+232", "name": "Sierra Leone" }, { "code": "+65", "name": "Singapore" }, { "code": "+421", "name": "Slovakia" }, { "code": "+386", "name": "Slovenia" }, { "code": "+677", "name": "Solomon Islands" }, { "code": "+27", "name": "South Africa" }, { "code": "+500", "name": "South Georgia and the South Sandwich Islands" }, { "code": "+82", "name": "South Korea" }, { "code": "+34", "name": "Spain" }, { "code": "+94", "name": "Sri Lanka" }, { "code": "+249", "name": "Sudan" }, { "code": "+597", "name": "Suriname" }, { "code": "+268", "name": "Swaziland" }, { "code": "+46", "name": "Sweden" }, { "code": "+41", "name": "Switzerland" }, { "code": "+963", "name": "Syria" }, { "code": "+886", "name": "Taiwan" }, { "code": "+992", "name": "Tajikistan" }, { "code": "+255", "name": "Tanzania" }, { "code": "+66", "name": "Thailand" }, { "code": "+670", "name": "Timor Leste" }, { "code": "+228", "name": "Togo" }, { "code": "+690", "name": "Tokelau" }, { "code": "+676", "name": "Tonga" }, { "code": "+1 868", "name": "Trinidad and Tobago" }, { "code": "+216", "name": "Tunisia" }, { "code": "+90", "name": "Turkey" }, { "code": "+993", "name": "Turkmenistan" }, { "code": "+1 649", "name": "Turks and Caicos Islands" }, { "code": "+688", "name": "Tuvalu" }, { "code": "+1 340", "name": "U.S. Virgin Islands" }, { "code": "+256", "name": "Uganda" }, { "code": "+380", "name": "Ukraine" }, { "code": "+971", "name": "United Arab Emirates" }, { "code": "+44", "name": "United Kingdom" }, { "code": "+1", "name": "United States" }, { "code": "+598", "name": "Uruguay" }, { "code": "+998", "name": "Uzbekistan" }, { "code": "+678", "name": "Vanuatu" }, { "code": "+58", "name": "Venezuela" }, { "code": "+84", "name": "Vietnam" }, { "code": "+1 808", "name": "Wake Island" }, { "code": "+681", "name": "Wallis and Futuna" }, { "code": "+967", "name": "Yemen" }, { "code": "+260", "name": "Zambia" }, { "code": "+255", "name": "Zanzibar" }, { "code": "+263", "name": "Zimbabwe" }]
}
