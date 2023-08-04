import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PromptsService} from "../providers/prompts.service";
import {PromptDto} from "../providers/dto/prompt.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../providers/user.service";
import {ConfirmDialogComponent} from "../core/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private dialog: MatDialog,
              private snackBarService: MatSnackBar,
              public userService: UserService,
              private readonly promptsService: PromptsService) {
  }

  ngOnInit() {
  }

  delete(prompt: PromptDto) {
    this.dialog.open(ConfirmDialogComponent,
      {
        width: '400px',
        height: '200px',
      }).afterClosed().subscribe((result) => this.onConfirmDialogClosed(result, prompt));
  }

  onConfirmDialogClosed(result: boolean, prompt: PromptDto) {
    if (result) {
      this.promptsService.deletePrompt(prompt.id).subscribe(() => this.deleteSuccess(prompt));
    }
  }

  deleteSuccess(prompt: PromptDto) {
    this.snackBarService.open('Prompt deleted', 'OK', {duration: 2000});
    this.userService.promptList = this.userService.promptList.filter((p) => p.id !== prompt.id);
  }
}

