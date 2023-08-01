import {Component, OnInit} from '@angular/core';
import {TeamDto} from "../../../providers/dto/team.dto";
import {TeamService} from "../../../providers/team.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PromptsService} from "../../../providers/prompts.service";
import {PromptDto} from "../../../providers/dto/prompt.dto";

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent implements OnInit {
  searchTerm: string = '';

  prompts: PromptDto[] = [];
  team: TeamDto | undefined;

  isLoading: boolean = false;

  constructor(private promptsService: PromptsService,
              private teamService: TeamService,
              private route: ActivatedRoute) {
    this.isLoading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const teamId = params.get('teamId');
      if (teamId) {
        this.teamService.getTeam(teamId).subscribe((team) => {
          this.team = team;
          this.getPrompts();
        });
      } else {
        this.getPrompts();
      }
    });
  }

  ngOnInit() {

  }

  getPrompts() {
    if (this.team) {
      this.promptsService.getTeamPrompts(this.team.id).subscribe((prompts) => {
        this.prompts = prompts;
        this.isLoading = false;
      });
    } else { // if teamId is undefined, get all workspace members
      // this.workspaceService.getMembers().subscribe((members) => {
      //   this.members = members;
      //   this.isLoading = false;
      // });
    }
  }
}
