import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
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
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  private GetDashboardurl = this.Url.appconstant + this.Url.DashboardAPI;
  private GetDashboardTopUserurl = this.Url.appconstant + this.Url.DashboardTopUserAPI;
  private GetDashboardTopTrainurl = this.Url.appconstant + this.Url.DashboardTopTrainingAPI;
  private GetDashboardCerturl = this.Url.appconstant + this.Url.DashboardCertAPI;
  private GetDealTrendurl = this.Url.appconstant + this.Url.DealTrend;
  private GetLeadTrendurl = this.Url.appconstant + this.Url.LeadTrend;
  constructor(private makeapi: WebserviceService, private http: Http, private Url: UrlService, private router: Router) { }
  UserID
  ngOnInit() {
    this.tab = "monthlyTrain"
    this.tabCerti = "monthlyCerti"
    this.tabUser = "monthlyUser"
    this.tabSales = "WeeklySales"
    var Userdetail = localStorage.getItem("Lead-Management");
    var jsonData = JSON.parse(Userdetail);

    this.UserID = jsonData['userid'];
    
    this.DashBoard()
    this.TopUserDashBoard()
    this.DashBoardTopTrain()
    this.DashBoardTopCert()
    // this.pieChart()
    this.DashBoardDealTrend()
    this.DashBoardLeadTrend()
  }
  CardDatas
  loading = false
  Activities
  DashBoard() {
    this.loading = true
    var reqdata = "id=" + this.UserID
    return this.makeapi.method(this.GetDashboardurl, reqdata, "post").subscribe(data => {
      this.loading = false
      this.CardDatas = data
      this.Activities = data['activities']
    },
      Error => {
      }
    );
  }
  DealTrend
  DoubleAxisChart
  DashBoardDealTrend() {
    this.loading = true
    var reqdata = "id=" + this.UserID
    return this.makeapi.method(this.GetDealTrendurl, reqdata, "post").subscribe(data => {
      this.loading = false
      this.DealTrend = data
      var GetData = this.DealTrend
      var getdatadeal0 = GetData[0].deals
      var getdatadeal1 = GetData[1].deals
      var getdatadeal2 = GetData[2].deals
      var getdatadeal3 = GetData[3].deals
      var getdatadeal4 = GetData[4].deals
      var getdatadeal5 = GetData[5].deals
      var getdatadeal6 = GetData[6].deals
      var getdataworth0 = GetData[0].worth
      var getdataworth1 = GetData[1].worth
      var getdataworth2 = GetData[2].worth
      var getdataworth3 = GetData[3].worth
      var getdataworth4 = GetData[4].worth
      var getdataworth5 = GetData[5].worth
      var getdataworth6 = GetData[6].worth
      var getdataDate0 = GetData[0].dateval
      var getdataDate1 = GetData[1].dateval
      var getdataDate2 = GetData[2].dateval
      var getdataDate3 = GetData[3].dateval
      var getdataDate4 = GetData[4].dateval
      var getdataDate5 = GetData[5].dateval
      var getdataDate6 = GetData[6].dateval
    

      this.DoubleAxisChart = new Chart({
        chart: {
          height: 300,
          zoomType: 'xy',


        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: [{
          categories: [getdataDate0, getdataDate1, getdataDate2, getdataDate3, getdataDate4, getdataDate5,
            getdataDate6,],
          crosshair: true
        }],
        yAxis: [{ // Primary yAxis
          labels: {
            format: '',

          },
          title: {
            text: '',

          }
        }, { // Secondary yAxis
          title: {
            text: '',

          },
          labels: {
            format: '',

          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          x: 120,
          verticalAlign: 'top',
          y: 100,
          floating: true,

        },
        series: [{
          name: 'Won Deals Count',
          type: 'column',
          yAxis: 1,
          data: [getdatadeal0, getdatadeal1, getdatadeal2, getdatadeal3, getdatadeal4, getdatadeal5, getdatadeal6],
          color: "#ff856ae3",

        }, {
          name: 'Won Deals Worth',
          type: 'spline',
          data: [getdataworth0, getdataworth1, getdataworth2, getdataworth3, getdataworth4, getdataworth5, getdataworth6],
          color: "#57a5f0"
        }]
      })

    },
      Error => {
      }
    );
  }
  LeadTrend
  pieChartArr
  DashBoardLeadTrend() {
    this.loading = true
    return this.makeapi.method(this.GetLeadTrendurl, "", "post").subscribe(data => {
      this.loading = false
      this.LeadTrend = data
      this.pieChartArr = []
      var pieChartColor = ["#3B70FE","#FE467C","#00DA99","#059EFE","#FEB200","#7fc314"]
      this.LeadTrend.map((trend,index)=>{
        
        this.pieChartArr.push({
          name:trend.type,
          color: pieChartColor[index],
          y:trend.count
        })
      })

      this.PieChart = new Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          height: 300,
        },
        title: {
          text: ''
        },
        // tooltip: {
        //  pointFormat: '{series.name}: <b>{point.percentage}</b>'
        // },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            // colors: pieColors,
            dataLabels: {
              enabled: true,
              // format: '<b>{point.name}</b><br>{point.data}',
              distance: -50,
              // filter: {
              //     property: 'percentage',
              //     operator: '>',
              //     value: 4
              // }
            }
          }
        },
        series: [{
          name: '',
          type: 'pie',
          data: this.pieChartArr
        }]
      })

     



    },
      Error => {
      }
    );
  }
  TopUserData
  firstusername
  Secondusername
  FirstuserValue
  SeconduserValue
  ThirduserValue
  Forthusername
  Fifthusername
  fifthuserValue
  ForthuserValue
  Thirdusername
  userData = []
  TopUserDashBoard() {
    this.loading = true
    var reqdata = "id=" + this.UserID + "&type=1"
    return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
      this.loading = false
      this.TopUserData = data

     


      for (var i = 0; i < this.TopUserData.length; i++) {
       
        var topUser = this.TopUserData[i]
        var positionVal = topUser.position;
        var tmpArr = [];
        for(var i2=0;i2<5;i2++){
          if(i2 == (positionVal-1)){
            tmpArr.push(topUser.value)
          }else{
            tmpArr.push(0)
          }
        }
      
        
        this.performerChartSeriesData.push(topUser.username)
        
        this.performerChartData.push({
          type:'bar',
          data:tmpArr,
          color:"#3568C1"
        })
        
      
      }

      this.BarChart()

    },
      Error => {
      }
    );
  }
  TopTrainData
  DashBoardTopTrain() {
    this.loading = true
    var reqdata = "id=" + this.UserID + "&type=1"
    return this.makeapi.method(this.GetDashboardTopTrainurl, reqdata, "post").subscribe(data => {
      this.loading = false
      this.TopTrainData = data
    },
      Error => {
      }
    );
  }
  TopCertData
  DashBoardTopCert() {
    this.loading = true
    var reqdata = "id=" + this.UserID + "&type=1"
    return this.makeapi.method(this.GetDashboardCerturl, reqdata, "post").subscribe(data => {
      this.loading = false
      this.TopCertData = data
    },
      Error => {
      }
    );
  }

  BarCharts: any
  performerChartSeriesData = []
  performerChartData = []
  BarChart() {
    this.BarCharts = new Chart({
      chart: {
        type: 'bar',
        height: 330,
      },
      title: {
        text: ''
      },
      xAxis: {
        categories:this.performerChartSeriesData 
      
      },
      yAxis: {
        // tickInterval: 1,
        min: 0,
        
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{series.percentage:.1f}%</b>'
      },
      series: this.performerChartData
      
    
    })
  }
  PieChart: any

  tab: any
  markTab(type, $event) {
    this.tab = type;
    $(".tab").removeClass('tab_selected');
    $($event.target).addClass('tab_selected');
    if (this.tab == "monthlyTrain") {
      var reqdata = "id=" + this.UserID + "&type=1"
      return this.makeapi.method(this.GetDashboardTopTrainurl, reqdata, "post").subscribe(data => {
        this.TopTrainData = data
      },
        Error => {
        }
      );
    }
    else if (this.tab == "quaterlyTrain") {
      var reqdata = "id=" + this.UserID + "&type=2"
      return this.makeapi.method(this.GetDashboardTopTrainurl, reqdata, "post").subscribe(data => {
        this.TopTrainData = data
      },
        Error => {
        }
      );
    }
    else {
      var reqdata = "id=" + this.UserID + "&type=3"
      return this.makeapi.method(this.GetDashboardTopTrainurl, reqdata, "post").subscribe(data => {
        this.TopTrainData = data
      },
        Error => {
        }
      );
    }

  }
  tabCerti
  tabCertfi(type, $event) {
    this.tabCerti = type;
    $(".tab").removeClass('tab_selecteds');
    $($event.target).addClass('tab_selecteds');
    if (this.tabCerti == "monthlyCerti") {
      var reqdata = "id=" + this.UserID + "&type=1"
      return this.makeapi.method(this.GetDashboardCerturl, reqdata, "post").subscribe(data => {
        this.TopCertData = data
      },
        Error => {
        }
      );
    }
    else if (this.tabCerti == "quaterlyCerti") {
      var reqdata = "id=" + this.UserID + "&type=2"
      return this.makeapi.method(this.GetDashboardCerturl, reqdata, "post").subscribe(data => {
        this.TopCertData = data
      },
        Error => {
        }
      );
    }
    else {
      var reqdata = "id=" + this.UserID + "&type=3"
      return this.makeapi.method(this.GetDashboardCerturl, reqdata, "post").subscribe(data => {
        this.TopCertData = data
      },
        Error => {
        }
      );
    }

  }
  tabUser
  markTabUser(type, $event) {
    this.tabUser = type;
    $(".tab").removeClass('tab_selectedsuser');
    $($event.target).addClass('tab_selectedsuser');
    if (this.tabUser == "monthlyUser") {
      var reqdata = "id=" + this.UserID + "&type=1"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }
    else if (this.tabUser == "quaterlyUser") {
      var reqdata = "id=" + this.UserID + "&type=2"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }
    else {
      var reqdata = "id=" + this.UserID + "&type=3"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }

  }
  tabSales
  markTabSales(type, $event) {
    this.tabSales = type;
    $(".tab").removeClass('tab_selectedssales');
    $($event.target).addClass('tab_selectedssales');
    if (this.tabSales == "WeeklySales") {
      var reqdata = "id=" + this.UserID + "&type=1"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }
    else if (this.tabSales == "MonthlySales") {
      var reqdata = "id=" + this.UserID + "&type=2"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }
    else if (this.tabSales == 'quaterlySales') {
      var reqdata = "id=" + this.UserID + "&type=3"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }
    else {
      var reqdata = "id=" + this.UserID + "&type=4"
      return this.makeapi.method(this.GetDashboardTopUserurl, reqdata, "post").subscribe(data => {
        this.TopUserData = data
      },
        Error => {
        }
      );
    }

  }
}
