import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../providers/team.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TeamDto} from "../../../providers/dto/team.dto";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  searchTerm: string = '';

  members: any[] = [];

  team: TeamDto | undefined;

  isLoading: boolean = false;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const teamId = params.get('teamId');
      if (teamId) {
        this.teamService.getTeam(teamId).subscribe((team) => {
          this.team = team;
          this.getMembers();
        });
      }
    });
  }

  ngOnInit() {

  }

  getMembers() {
    if (this.team) {
      this.teamService.getTeamMembers(this.team.id).subscribe((members) => {
        this.members = members;
        this.isLoading = false;
      });
    } else { // if teamId is undefined, get all workspace members

    }
  }

}
