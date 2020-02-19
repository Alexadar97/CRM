
import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
import { BehaviorSubject } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { DatatransferService } from '../api-services/datatransfer.service';


@Injectable()
export class WebserviceService {

  token: any;
  constructor(private http: Http, private getdata: DatatransferService) {
    this.token = this.getCookie('cookies');
  }

  method(url, data, method): Observable<any> {
    if (method === 'post') {
      //this.spinner.show();
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', this.token);
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
         // this.spinner.hide();
        });
    }
    if (method === 'downloadfilejsonpostRL') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // headers.append('Authorization', token);
      return this.http.post(url, data, {responseType: ResponseContentType.Blob, headers: headers })
    
      .map(res => {
          return {
              filename:"Retail_Lead_Details.xlsx",
              data: res.blob()
          };
      })
          .catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {
              }
          })
          .finally(() => {
          });
    }
    if (method === 'downloadfilejsonpostRC') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // headers.append('Authorization', token);
      return this.http.post(url, data, {responseType: ResponseContentType.Blob, headers: headers })
    
      .map(res => {
          return {
              filename:"Retail_Contact_Details.xlsx",
              data: res.blob()
          };
      })
          .catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {
              }
          })
          .finally(() => {
          });
    }
    if (method === 'downloadfilejsonpostBL') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // headers.append('Authorization', token);
      return this.http.post(url, data, {responseType: ResponseContentType.Blob, headers: headers })
    
      .map(res => {
          return {
              filename:"Corporate_Lead_Details.xlsx",
              data: res.blob()
          };
      })
          .catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {
              }
          })
          .finally(() => {
          });
    }
    if (method === 'downloadfilejsonpostBC') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // headers.append('Authorization', token);
      return this.http.post(url, data, {responseType: ResponseContentType.Blob, headers: headers })
    
      .map(res => {
          return {
              filename:"Corporate_Contact_Details.xlsx",
              data: res.blob()
          };
      })
          .catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {
              }
          })
          .finally(() => {
          });
    }
    if (method === 'postlogin') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response);
    }
    if (method === 'postduriCat') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
        });
    }
    if (method === 'JWTExcelISPRDump') {
      // this.spinner.show();
      const headers = new Headers();
      headers.append('Authorization', this.token);
      return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
          .map(res => {
             
              return {
                  filename: 'Retail_Lead_Contact.xlsx',
                  data: res.blob()
              };
          })
          .catch((error: any) => {
              // this.spinner.hide();
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {
              }
          })
          .finally(() => {
              // this.spinner.hide();
          });
  }
    if (method === 'postexam') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', this.token);
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
        });
    }
    if (method === 'posthome') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
        });
    }
    if (method === 'postDuration') {
      //this.spinner.show();
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => (response))
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
        //  this.spinner.hide();
        
        });
    }
    if (method === 'get') {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', this.token);
      return this.http.get(url, { headers: headers })
          .map((response: Response) => response.json())
          .catch((error: any) => {
              if (error.status === 500) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 400) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 409) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 406) {
                  return Observable.throw(new Error(error.status));
              }
              else if (error.status === 403) {


              }
          });
  }
    if (method === 'file') {
      //this.spinner.show();
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', this.token);
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {
          if (error.status === 500) {
            this.getdata.showNotification('bottom', 'right', ' Something went wrong,try again later !!', "danger");
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
          }
          else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
          }
        })
        .finally(() => {
         // this.spinner.hide();
        });
    }
    if (method === 'downloadfile') {
        const headers = new Headers();
        headers.append('Authorization', this.token);
        return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
            .map(res => {
                return {
                    filename: data,
                    data: res.blob()
                };
            })
            .catch((error: any) => {
                if (error.status === 500) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 400) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 406) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 403) {
                }
            })
            .finally(() => {
            });
    }
    
  }
  postFile(url,data){
    var token = this.getCookie('disc-cookies');
    let headers = new Headers();
  
    headers.append('Accept', 'application/json');

    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: any) => {

            if (error.status === 500) {
                return Observable.throw(new Error(error.status));
            }
            else if (error.status === 400) {
                return Observable.throw(new Error(error.status));
            }
            else if (error.status === 409) {
                return Observable.throw(new Error(error.status));
            }
            else if (error.status === 406) {
                return Observable.throw(new Error(error.status));
            }
            else if (error.status === 403) {
                localStorage.removeItem('disc-portal-session');
                // this.router.navigateByUrl('/login');
                // this.deleteCookie('disc-cookies');
            }
        })
        .finally(() => {

        });
  }


  getCookie(cname) {
    var name = cname + "=";
    var cArr = window.document.cookie.split(';');
    for (var i = 0; i < cArr.length; i++) {
      var c = cArr[i].trim();
      if (c.indexOf(name) == 0)
        return c.substring(name.length, c.length);
    }
    return "";
  }
  getToken() {
    this.token = this.getCookie('cookies');
  }


}
