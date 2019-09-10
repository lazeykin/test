import {Component, Input, OnInit} from '@angular/core';
import {IUserInfo} from '../../core/models/userInfo.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {
  @Input() user: IUserInfo;

  constructor() { }

  ngOnInit() {
  }

}
