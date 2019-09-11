import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {IUser} from '../models/user.model';
import {ApiService} from './api.service';
import {ILocation} from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private http: HttpClient,
      private apiService: ApiService
  ) { }
    postFile(fileToUpload: File) {
        const formData = new FormData();
        formData.append('image', fileToUpload);
        return this.http
            .post(`${environment.api_url}/rest/v1/user/profile/image`, formData )
            .pipe(catchError(val => of(`I caught: ${val}`)));
    }
    updateUserInfo(data: IUser) {
        return this.apiService.put('/rest/v1/user/profile', data);

    }
    getCurrentUserInfo(query) {
        return this.apiService.get('/rest/v1/user/current', query);
    }
    getAllUsers(paramsObj, search?:boolean) {
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
        const path:string = (function () {
            if(search) {
                return '/rest/v1/user/search';
            }
            return '/rest/v1/user';
        })();
        return this.apiService.get( path, params).pipe(map(data => data.result));
    }
    getUserByID(id: string) {
        return this.apiService.get(`/rest/v1/user/${id}`);
    }

    public getPosition(): Observable<Position> {
        return Observable.create(
            (observer) => {
                navigator.geolocation.watchPosition((pos: Position) => {
                    observer.next(pos);
                }),
                    () => {
                        console.log('Position is not available');
                    },
                    {
                        enableHighAccuracy: true
                    };
            });
    }
    setUserCurrentGeoLocation(data: ILocation): Observable<any> {
        return this.apiService.put('/rest/v1/user/location', data);
    }
}
