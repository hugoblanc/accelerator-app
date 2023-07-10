import { Component } from '@angular/core';
import {UserService} from "../../../providers/user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  constructor(public readonly userService: UserService) {}
}
