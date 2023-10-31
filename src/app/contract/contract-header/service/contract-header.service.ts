import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ContractHeaderService {
  private baseUrl = 'http://127.0.0.1:8000';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer Token',
      'HeaderUsername': localStorage.getItem('username')  || '{}',
      'HeaderID': localStorage.getItem('userID')  || '{}',
      'UserToken': localStorage.getItem('token')  || '{}'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  createContractHeader(contractHeader: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/contract/createContractHeader', contractHeader, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', contractHeader))
      );
  }

  updateContractHeader(contractHeader: Object): Observable<Object>  {
    return this.http.post<Object>(this.baseUrl + '/api/contract/updateContractHeader', contractHeader, this.httpOptions)
      .pipe(
        catchError(this.handleError('Error Ketika Mendapatkan Data', contractHeader))
      );
  }

  getDaftarRole(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/role/getAllRole' , { params, headers: this.httpOptions['headers'] } );
  }
  
  deleteContractHeader(id: any) {
    return this.http.get(this.baseUrl + '/api/contract/deleteContractHeader?id=' + id, { headers: this.httpOptions['headers'], responseType: 'text' });
  }

  getAllContractHeader(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/contract/getAllContractHeader' , { headers: this.httpOptions['headers'] } );
  }
  
  getContractHeaderByParams(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/contract/getContractHeaderByParams?params=' + params , { headers: this.httpOptions['headers'] } );
  }
  
  getContractHeaderByID(id: any) {
    return this.http.get(this.baseUrl + '/api/contract/getContractHeaderByID?id=' + id, { headers: this.httpOptions['headers'] } );
  }
  






  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      // return of(result as T);
      return throwError(error);
    };
  }

 
}
