import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PromptsService} from "../../../providers/prompts.service";
import {PromptDto} from "../../../providers/dto/prompt.dto";

@Component({
  selector: 'app-user-prompts-list',
  templateUrl: './user-prompts-list.component.html',
  styleUrls: ['./user-prompts-list.component.scss']
})
export class UserPromptsListComponent implements OnInit {

  prompts: PromptDto[] = [];

  constructor(private router: Router,
    private readonly promptsService: PromptsService) {
  }

  getPrompts() {
    this.promptsService.getMyPrompts().subscribe((prompts) => this.getPromptsSuccess(prompts));
  }

  ngOnInit() {
    this.getPrompts();
  }

  getPromptsSuccess(prompts: PromptDto[]) {
    this.prompts = prompts;
  }

  goToPrompt(prompt: PromptDto) {
    this.router.navigate(['/prompts', prompt.id]).then();
  }

}
