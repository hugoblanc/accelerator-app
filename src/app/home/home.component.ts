import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PromptsService } from "../providers/prompts.service";
import { Observable } from "rxjs";
import { PromptDto } from "../providers/dto/prompt.dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prompts: PromptDto[] = [];

  constructor(private router: Router,
    private snackBarService: MatSnackBar,
    private readonly promptsService: PromptsService) {
    if (!localStorage.getItem('onboarding')) {
      this.router.navigate(['/welcome']).then();
    }
  }

  ngOnInit() {
    this.getPrompts();
  }

  getPrompts() {
    this.promptsService.getMyPrompts().subscribe((prompts) => this.getPromptsSuccess(prompts));
  }

  getPromptsSuccess(prompts: PromptDto[]) {
    this.prompts = prompts;
  }

  delete(prompt: PromptDto) {
    this.promptsService.deletePrompt(prompt.id).subscribe(() => this.deleteSuccess(prompt));
  }

  deleteSuccess(prompt: PromptDto) {
    this.snackBarService.open('Prompt deleted', 'OK', {duration: 3000});
    this.prompts = this.prompts.filter((p) => p.id !== prompt.id);
  }
}

