import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../providers/team.service";
import {TeamDto} from "../../../providers/dto/team.dto";

@Component({
  selector: 'app-team-current',
  templateUrl: './team-current.component.html',
  styleUrls: ['./team-current.component.scss']
})
export class TeamCurrentComponent implements OnInit {

  teams: TeamDto[] | undefined;
  isLoading = false;

  constructor(public teamService: TeamService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.teamService.getMyTeams().subscribe((teams) => {
      this.teams = teams;
      this.isLoading = false;
    });
  }

  changeTeam(team: TeamDto) {
    this.teamService.currentTeam = team;
  }
}
