import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

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
            .pipe(catchError(val => of(`I caught: ${val}`)));
    }

    put(path: string, body: any = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(val => of(`I caught: ${val}`)));
    }

    post(path: string, body: any = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            body
        ).pipe(catchError(val => of(`I caught: ${val}`)));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(val => of(`I caught: ${val}`)));
    }
}