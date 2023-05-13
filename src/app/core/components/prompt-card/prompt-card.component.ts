import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PromptDto} from "../../../providers/dto/prompt.dto";

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.component.html',
  styleUrls: ['./prompt-card.component.scss']
})
export class PromptCardComponent {

  @Input() prompt: PromptDto | undefined;

  @Input() mode: 'gallery' | 'home' = 'gallery';

  @Input() isInList: boolean = false;

  @Output() addedToList = new EventEmitter<PromptDto>();

  constructor() {

  }

  addToList() {
    this.addedToList.emit(this.prompt);
  }
}
