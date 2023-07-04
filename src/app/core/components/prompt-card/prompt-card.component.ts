import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PromptDto } from "../../../providers/dto/prompt.dto";
import { Router } from "@angular/router";
import { PromptsService } from '../../../providers/prompts.service';

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent implements OnInit {

  @Input() prompt: PromptDto | undefined;

  @Input() mode: 'gallery' | 'home' = 'gallery';

  @Input() isInList: boolean = false;

  @Output() deleted = new EventEmitter<PromptDto>();

  constructor(private router: Router, private readonly promptService: PromptsService) {
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
}
