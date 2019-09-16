import { BrowserModule } from "@angular/platform-browser";
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ApiService } from "./core/services/api.service";
import { AuthService } from "./core/services/auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { EditUserComponent } from "./edit-user/edit-user/edit-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./core/services/user.service";
import { AuthGuard } from "./core/guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { MapComponent } from "./dashboard/map/map.component";
import { ListComponent } from "./dashboard/list/list.component";
import { UserComponent } from "./user/user/user.component";
import { UserViewComponent } from "./shared/user-view/user-view.component";
import { DataService } from "./core/services/data.service";
import { UserInfoComponent } from "./user-info/user-info/user-info.component";
import { AgmCoreModule } from "@agm/core";
import {ApiPrefixInterceptor} from './core/interceptors/api.interceptor';
import {AppConfigService} from './core/services/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditUserComponent,
    DashboardComponent,
    MapComponent,
    ListComponent,
    UserComponent,
    UserViewComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: ""
    })
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    AuthGuard,
    AppConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    { provide: APP_INITIALIZER,
      useFactory: (configService: AppConfigService) =>
        () => configService.loadConfigurationData(),
      deps: [AppConfigService],
      multi: true },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
