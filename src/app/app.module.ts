///<reference path="../../node_modules/@angular/common/http/src/interceptor.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ApiService} from './core/services/api.service';
import {AuthService} from './core/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './core/interceptors/jwt.interceptor';
import { EditUserComponent } from './edit-user/edit-user/edit-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './core/services/user.service';
import {AuthGuard} from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MapComponent } from './dashboard/map/map.component';
import { ListComponent } from './dashboard/list/list.component';
import { UserComponent } from './user/user/user.component';
import { UserViewComponent } from './shared/user-view/user-view.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        EditUserComponent,
        DashboardComponent,
        MapComponent,
        ListComponent,
        UserComponent,
        UserViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ApiService,
        AuthService,
        UserService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
