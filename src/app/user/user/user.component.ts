import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {IUserInfo} from '../../core/models/userInfo.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  user: IUserInfo
  constructor(
      private userService: UserService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.getCurrentUser()
  }
  getCurrentUser() {
    this.userService.getCurrentUserInfo(this.authService.getCurrentAccesToken()).subscribe((value: IUserInfo) => {
      console.log(value);
      this.user = value;
    });
  }

}
