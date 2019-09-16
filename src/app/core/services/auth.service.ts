import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import {map} from 'rxjs/operators';

const storageKeyAuthUser = "currentUser";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  login(token): Observable<any> {
    return this.apiService.post(`user/login/facebook`, { token: token }).pipe(map(data => data.result.token));
  }

  saveCurrentUser(token: string) {
    localStorage.setItem(storageKeyAuthUser, JSON.stringify(token));
  }

  getCurrentUserToken(key): string {
    try {
      this.token = JSON.parse(localStorage.getItem(key));
      if (this.token !== null && this.token !== undefined) {
        return this.token;
      }
    } catch (e) {
      console.log("Could not read user info from local storage");
      console.error(e);
      localStorage.removeItem(key);
    }
  }

  isLogged(): boolean {
    const authUser = this.getCurrentUserToken(storageKeyAuthUser);
    return authUser !== null && authUser !== undefined;
  }

  saveAccesToken(token: string) {
    localStorage.setItem("accesToken", JSON.stringify(token));
  }
}
