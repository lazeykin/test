import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";

import { catchError } from "rxjs/operators";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, { params })
      .pipe(catchError(val => of(`I caught: ${val}` )));
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http
      .put(`${path}`, body)
      .pipe(catchError(val => of(`I caught: ${val}`)));
  }

  post(path: string, body: any = {}): Observable<any> {
    return this.http
      .post(`${path}`, body)
      .pipe(catchError(val => of(`I caught: ${val}`)));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${path}`)
      .pipe(catchError(val => of(`I caught: ${val}`)));
  }
  getInit(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, { params });
  }
}
