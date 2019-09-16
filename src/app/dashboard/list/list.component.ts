import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { DataService } from "../../core/services/data.service";
import { IUserInfo } from "../../core/models/userInfo.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.sass"]
})
export class ListComponent implements OnInit {
  users: IUserInfo[] = [];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.userArray.subscribe(data => {
      this.users = data;
    });
  }
  onGoToUser(id) {
    this.router.navigate(["../../user/", id]);
  }
}
