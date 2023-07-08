import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PromptsService } from "../providers/prompts.service";
import { Observable } from "rxjs";
import { PromptDto } from "../providers/dto/prompt.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../providers/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private snackBarService: MatSnackBar,
    public userService: UserService,
    private readonly promptsService: PromptsService) {
    if (!localStorage.getItem('onboarding')) {
      this.router.navigate(['/welcome']).then();
    }
  }

  ngOnInit() {
  }

  delete(prompt: PromptDto) {
    this.promptsService.deletePrompt(prompt.id).subscribe(() => this.deleteSuccess(prompt));
  }

  deleteSuccess(prompt: PromptDto) {
    this.snackBarService.open('Prompt deleted', 'OK', {duration: 2000});
    this.userService.promptList = this.userService.promptList.filter((p) => p.id !== prompt.id);
  }
}

