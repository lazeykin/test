import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              ) { }
  loadConfigurationData(): Promise<any> {
    return this.userService.getCurrentUserInfoInit(this.authService.getCurrentUserToken('accesToken')).pipe(tap()).toPromise()
      .then((data: any) => {}, err => console.log(err));
  }
}
