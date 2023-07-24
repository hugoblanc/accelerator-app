import {Component, OnInit} from '@angular/core';
import {UserService} from "../providers/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public readonly userService: UserService) {
  }
  ngOnInit() {
  }
}
