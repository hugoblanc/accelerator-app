import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromptDto } from "../../../providers/dto/prompt.dto";
import { Router } from "@angular/router";
import { PromptsService } from '../../../providers/prompts.service';
import {UserService} from "../../../providers/user.service";
import {getFlagByLanguage} from "../../../providers/dto/languages";

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent implements OnInit {
  edit(arg0: PromptDto) {
    throw new Error('Method not implemented.');
  }

  @Input() prompt: PromptDto | undefined;

  @Input() mode: 'gallery' | 'home' = 'gallery';

  @Input() isInList: boolean = false;

  @Output() deleted = new EventEmitter<PromptDto>();

  constructor(private router: Router,
              public userService: UserService,
              private readonly promptService: PromptsService) {
  }

  use(prompt: PromptDto) {
    this.router.navigate(['/prompts/' + prompt.id]).then();
  }

  fork(prompt: PromptDto) {
    this.promptService.forkPrompt(prompt?.id).subscribe((forkedPrompt: any) => {
      this.router.navigate(['/prompts/' + forkedPrompt.id]).then();
    });
  }

  ngOnInit(): void {
    if (this.mode === 'home') {
      this.isInList = true;
    }
  }

  delete() {
    this.deleted.emit(this.prompt);
  }

  getFlag(): string | undefined {
    if (this.prompt) {
      return getFlagByLanguage(this.prompt.lang);
    }
    return undefined;
  }
}
