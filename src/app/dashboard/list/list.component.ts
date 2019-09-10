import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(private userSrvice: UserService) { }

  ngOnInit() {

  }

}
