import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input() currentTeam: TeamDto | undefined;
  @Output() teamChanged = new EventEmitter<TeamDto>();

  constructor(public teamService: TeamService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.teamService.getMyTeams().subscribe((teams) => {
      this.teams = teams;
      const currentTeamId = localStorage.getItem('currentTeamId');
      if (currentTeamId) {
        const team = this.teams.find(item => item.id === currentTeamId);
        if (team) {
          this.changeTeam(team);
        }
      }

      if (!this.currentTeam) {
        this.changeTeam(this.teams[0]);
      }

      this.isLoading = false;
    });
  }

  changeTeam(team: TeamDto) {
    if (team) {
      this.teamChanged.emit(team);
      this.currentTeam = team;
      localStorage.setItem('currentTeamId', team.id);
    }
  }
}
