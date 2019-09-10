import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {IToken} from '../models/token.model';
import {environment} from '../../../environments/environment';

const STORAGE_KEY_AUTH_USER = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;

    constructor(
        private http: HttpClient,
        private  apiService: ApiService
    ) {
    }

    login(token): Observable<IToken> {
        return this.apiService
            .post(
                `/rest/v1/user/login/facebook`,
                {token: token}
            );
    }

    saveCurrentUser(token: string) {
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(token));
    }
    getCurrentUserToken(): string {
        try {
            this.token = JSON.parse(localStorage.getItem(STORAGE_KEY_AUTH_USER));
            if (this.token !== null && this.token !== undefined) {
                return this.token;
            }

        } catch (e) {
            console.log('Could not read user info from local storage');
            console.error(e);
            localStorage.removeItem(STORAGE_KEY_AUTH_USER);
        }
    }

    isLogged(): boolean {
        const authUser = this.getCurrentUserToken();
        return authUser !== null && authUser !== undefined;
    }
    saveAccesToken(token: string) {
        localStorage.setItem('accesToken', JSON.stringify(token));
    }
    getCurrentAccesToken(): string {
        try {
            const token = JSON.parse(localStorage.getItem('accesToken'));
            if (this.token !== null && this.token !== undefined) {
                return this.token;
            }

        } catch (e) {
            console.log('Could not read user info from local storage');
            console.error(e);
            localStorage.removeItem('accesToken');
        }
    }

}
