import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PromptsService} from "../providers/prompts.service";
import {Observable} from "rxjs";
import {PromptDto} from "../providers/dto/prompt.dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prompts$!: Observable<PromptDto[]>;

  userPromptIdsList: string[] = [];

  promptSelected!: PromptDto;

  constructor(private router: Router,
              private readonly promptsService: PromptsService) {
    if (!localStorage.getItem('onboarding')) {
      this.router.navigate(['/welcome']).then();
    } else {
      // Get prompts list
      this.userPromptIdsList = JSON.parse(localStorage.getItem('promptList') || '[]');
    }
  }

  ngOnInit() {
    this.getPrompts();
  }

  getPrompts() {
    this.prompts$ = this.promptsService.getPromptByIds(this.userPromptIdsList);
  }

  selectPrompt(prompt: PromptDto) {
    this.promptSelected = prompt;
  }

  removeFromList(prompt: PromptDto) {
    var userList: string[] = JSON.parse(localStorage.getItem('promptList') || '[]');
    if (userList && prompt) {
      const index = userList.findIndex((id) => id === prompt.id);
      if (index !== -1) {
        userList.splice(index, 1);
        this.prompts$.subscribe(prompts => {
          const indexObs = prompts.findIndex((entity) => prompt.id === entity.id);
          prompts.splice(indexObs, 1);
        });
        localStorage.setItem('promptList', JSON.stringify(userList));
      }
    }
  }
}

