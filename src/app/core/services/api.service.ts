import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) {}

    private formatErrors(error: any) {
        return  throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { params })
            .pipe(catchError(error => {console.log(error)}));
    }

    put(path: string, body: any = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(error => {console.log(error)}));
    }

    post(path: string, body: any = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(error => {console.log(error)}));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(error => {console.log(error)}));
    }
}