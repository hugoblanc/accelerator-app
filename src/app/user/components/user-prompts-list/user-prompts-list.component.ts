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

  userPromptIdsList: string[] = [];
  constructor(private router: Router,
    private readonly promptsService: PromptsService) {
    this.userPromptIdsList = JSON.parse(localStorage.getItem('promptList') || '[]');
  }

  getPrompts() {
    this.promptsService.getPromptByIds(this.userPromptIdsList).subscribe((prompts) => this.getPromptsSuccess(prompts));
  }

  ngOnInit() {
    this.getPrompts();
  }

  getPromptsSuccess(prompts: PromptDto[]) {
    this.prompts = prompts;
    console.log(this.prompts);
  }

  goToPrompt(prompt: PromptDto) {
    this.router.navigate(['/prompts', prompt.id]).then();
  }

}
