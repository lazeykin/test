import { Component, OnInit } from "@angular/core";
import { IUserInfo } from "../../core/models/userInfo.model";
import { UserService } from "../../core/services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.sass"]
})
export class UserInfoComponent implements OnInit {
  user: IUserInfo;
  userId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.userService.getUserByID(this.userId).subscribe(response => {
      this.user = response;
    });
  }
}
