import {Component, Input, OnInit} from '@angular/core';
import {PromptDto} from "../../../providers/dto/prompt.dto";
import {Router} from "@angular/router";
import {PromptsService} from "../../../providers/prompts.service";
import {TeamService} from "../../../providers/team.service";
import {TeamDto} from "../../../providers/dto/team.dto";

@Component({
  selector: 'app-team-prompts',
  templateUrl: './team-prompts.component.html',
  styleUrls: ['./team-prompts.component.scss']
})
export class TeamPromptsComponent implements OnInit {

  prompts: PromptDto[] | undefined;

  isLoading = false;

  @Input() set currentTeam(team: TeamDto) {
    this.getPrompts(team);
  }

  constructor(private router: Router,
              private teamService: TeamService,
              private promptsService: PromptsService) {
  }

  ngOnInit() {
  }

  goToPrompt(prompt: PromptDto) {
    this.router.navigate(['/prompts', prompt.id]).then();
  }

  getPrompts(team: TeamDto) {
    // this.promptsService.getTeamPrompts(this.teamService.currentTeam.id).subscribe((prompts) => {
    //   this.prompts = prompts;
    // });
    this.isLoading = true;
    this.promptsService.getMyPrompts().subscribe((prompts) => {
      this.prompts = prompts;
      this.isLoading = false;
    });
  }

}
