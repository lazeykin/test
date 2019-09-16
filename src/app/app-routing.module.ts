import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { EditUserComponent } from "./edit-user/edit-user/edit-user.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { MapComponent } from "./dashboard/map/map.component";
import { ListComponent } from "./dashboard/list/list.component";
import { UserComponent } from "./user/user/user.component";
import { UserInfoComponent } from "./user-info/user-info/user-info.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "edit-user", component: EditUserComponent, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      { path: "map", component: MapComponent },
      { path: "list", component: ListComponent }
    ]
  },
  { path: "profile", component: UserComponent, canActivate: [AuthGuard] },
  { path: "user/:id", component: UserInfoComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
