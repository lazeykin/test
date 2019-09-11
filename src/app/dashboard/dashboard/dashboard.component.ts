import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {DataService} from '../../core/services/data.service';
import {IUserInfo} from '../../core/models/userInfo.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
   users: IUserInfo[] = [];
  constructor(private userSrvice: UserService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.getAllUser();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
    applyFilter(value) {
      console.log(value);
      this.userSrvice.getAllUsers({'perPage': 50, 'page': 13, 'searchString': value}, true).subscribe(response => {
            this.users = response;
            this.dataService.subject.next(this.users);
        });
    }
    getAllUser() {
    // todo: pagination
      this.userSrvice.getAllUsers({'perPage': 50, 'page': 13}).subscribe(response => {
        this.users = response;
        this.dataService.subject.next(this.users);
      });
    }
}
