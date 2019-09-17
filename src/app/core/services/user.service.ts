import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { IUser } from "../models/user.model";
import { ApiService } from "./api.service";
import { ILocation } from "../models/location.model";
import { IUserInfo } from "../models/userInfo.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  postFile(fileToUpload: File) {
    const formData = new FormData();
    formData.append("image", fileToUpload);
    return this.http
      .post(`${environment.apiUrl}user/profile/image`, formData)
      .pipe(catchError(val => of(`I caught: ${val}`)));
  }

  updateUserInfo(data: IUser): Observable<any> {
    return this.apiService.put("user/profile", data);
  }

  getCurrentUserInfo(query): Observable<any> {
    return this.apiService.get("user/current", query).pipe(map(data => data.result));
  }
  getAllUsers(paramsObj, search?: boolean): Observable<IUserInfo[]> {
    let params = new HttpParams();
    if (paramsObj !== null && paramsObj !== undefined) {
      // we were given filtering criteria, build the query string
      Object.keys(paramsObj)
        .sort()
        .forEach(key => {
          const value = paramsObj[key];
          if (value !== null) {
            params = params.set(key, value.toString());
          }
        });
    }
    const path: string = (function() {
      if (search) {
        return "user/search";
      }
      return "user";
    })();
    return this.apiService.get(path, params).pipe(map(data => data.result));
  }

  getUserByID(id: string): Observable<IUserInfo> {
    return this.apiService.get(`user/${id}`).pipe(map(data => data.result));
  }

  getPosition(): Observable<Position> {
    return Observable.create(observer => {
      navigator.geolocation.watchPosition((pos: Position) => {
        observer.next(pos);
      }),
        () => {
          console.log("Position is not available");
        },
        {
          enableHighAccuracy: true
        };
    });
  }

  setUserCurrentGeoLocation(data: ILocation): Observable<any> {
    return this.apiService.put("user/location", data);
  }
}
