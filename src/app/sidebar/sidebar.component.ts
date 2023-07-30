import {Component, OnInit} from '@angular/core';
import {UserService} from "../providers/user.service";
import {TeamDto} from "../providers/dto/team.dto";
import {TeamService} from "../providers/team.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentTeam : TeamDto | undefined;

  constructor(public readonly userService: UserService, private teamService: TeamService ) {
    const currentTeamId = localStorage.getItem('currentTeamId');
    if (currentTeamId) {
      this.teamService.getTeam(currentTeamId).subscribe((team) => {
        this.currentTeam = team;
      });
    }
  }

  ngOnInit() {
  }
}
