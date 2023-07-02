import { Component } from '@angular/core';
import {UserService} from "../../../providers/user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private readonly userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
