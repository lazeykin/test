import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IUser} from '../models/user.model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private http: HttpClient,
      private apiService: ApiService
  ) { }
    postFile(fileToUpload: File): Observable<boolean> {
        const formData = new FormData();
        formData.append('image', fileToUpload);
        return this.http
            .post(`${environment.api_url}/rest/v1/user/profile/image`, formData )
            .pipe(catchError(error => {console.log(error)}));
    }
    updateUserInfo(data: IUser) {
        return this.apiService.put('/rest/v1/user/profile', data);

    }
    getCurrentUserInfo(query) {
        return this.apiService.get('/rest/v1/user/current', query);
    }
    getAllUsers(limit, paramsObj) {
        if (paramsObj !== null && paramsObj !== undefined) {
            // we were given filtering criteria, build the query string
            var params = new HttpParams();
            Object.keys(paramsObj).sort().forEach(key => {
                const value = paramsObj[key];
                if (value !== null) {
                    params = params.set(key, value.toString());
                }
            });
        }
        return this.apiService.get('/rest/v1/user', params);
    }
}
