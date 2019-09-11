import {Component, OnInit} from '@angular/core';
import {IaccesToken} from '../core/models/accesToken.model';
import {AuthService} from '../core/services/auth.service';
import {Observable, Subscription} from 'rxjs';
import {IToken} from '../core/models/token.model';
import {Router} from '@angular/router';

declare var FB: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    accessToken: string;
    tokenSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {

        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: '1637129439866047',
                cookie: true,
                xfbml: true,
                oauth: true,
                version: 'v4.0'
            });

            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    submitLogin() {
        FB.login((response) => {
            console.log('submitLogin', response);
            if (response.authResponse) {
                this.accessToken = response.authResponse.accessToken;
                this.authService.saveAccesToken(this.accessToken);
                this.tokenSubscription = this.authService.login(this.accessToken).subscribe((data: IToken) => {
                    console.log(data);
                    this.authService.saveCurrentUser(data.result.token);
                    this.router.navigate(['/edit-user']);
                })
            } else {
                console.log('User login failed');
            }
        });

    }

}
