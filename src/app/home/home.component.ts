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
}
