import {Component, OnInit} from '@angular/core';
import {UserService} from "../providers/user.service";
import {TeamDto} from "../providers/dto/team.dto";
import {TeamService} from "../providers/team.service";
import {WorkspaceService} from "../providers/workspace.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentTeam : TeamDto | undefined;

  constructor(public readonly userService: UserService,
              public workspaceService: WorkspaceService) {

  }

  ngOnInit() {
  }
}
