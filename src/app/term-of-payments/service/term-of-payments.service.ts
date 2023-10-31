import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { GlobalComponent } from 'src/app/global/global.component';
@Injectable({
  providedIn: 'root'
})

export class TermOfPaymentsService {
  // private baseUrl = 'http://127.0.0.1:8000';
  private baseUrl = GlobalComponent.url;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer 4pb4tech',
      'HeaderUsername': localStorage.getItem('username')  || '{}',
      'HeaderID': localStorage.getItem('userID')  || '{}',
      'UserToken': localStorage.getItem('token')  || '{}'
    })
  };
  
  constructor(private http: HttpClient) { }

  createTermsOfPayment(termsofpayment: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/termsofpayment/createTermsOfPayment', termsofpayment, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', termsofpayment))
      );
  }

  updateTermsOfPayment(termsofpayment: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/termsofpayment/updateTermsOfPayment', termsofpayment, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', termsofpayment))
      );
  }

  deleteTermsOfPayment(id: any) {
    return this.http.get(this.baseUrl + '/api/termsofpayment/deleteTermsOfPayment?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllTermsOfPayment(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/termsofpayment/getAllTermsOfPayment' , { headers: this.httpOptions['headers'] } );
  }
  
  getTermsOfPaymentByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/termsofpayment/getTermsOfPaymentByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getTermsOfPaymentByID(id: any) {
    return this.http.get(this.baseUrl + '/api/termsofpayment/getTermsOfPaymentByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  







  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

}
