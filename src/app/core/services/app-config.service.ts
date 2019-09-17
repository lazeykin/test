import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppConfigService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private injector: Injector
  ) {}
  checkToken(): Promise<any> {
    const router = this.injector.get(Router);
    const token = this.authService.getCurrentUserToken("accesToken");
    let params = new HttpParams().set("query", token);
    return this.loadData("user/current", params)
      .pipe(tap())
      .toPromise()
      .then(
        (data: any) => {},
        err => {
          if (err.status === 401 || err.status === 403) {
            router.navigate([""]);
          }
        }
      );
  }
  loadData(path: string, params: HttpParams): Observable<any> {
    return this.http.get(`${path}`, { params });
  }
}
