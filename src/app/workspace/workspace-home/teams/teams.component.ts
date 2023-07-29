import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../providers/team.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  searchTerm: string = '';

  teams: any[] = [];
  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.getWorkspaceTeams();
  }

  private getWorkspaceTeams() {
    return this.teamService.getWorkspaceTeams()?.subscribe(teams => {
      this.teams = teams;
    })
  }
}
